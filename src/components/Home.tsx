import React, { useCallback, useEffect, useState } from 'react';
import { Table as ApplicationsTable } from "./Table";
import ApplicationsAPI from "../api/factories/applications-api";
import { Layout } from "./Layout";
import { Candidate, SortKeys, SortOrder } from "../types/types";
import { Pagination } from "./Pagination";
import { FiltersEnum, Sort } from "../enums/enums";
import { useSearchParams } from "react-router-dom";
import { TableFilters } from "./TableFilters";
import { ErrorPage } from "./ErrorPage";

const MAX_ITEMS_PER_PAGE = 15;

const tableColumns: { label: string, key: SortKeys, sortable: boolean }[] = [
    { label: "Name", key: "name", sortable: false },
    { label: "Email", key: "email", sortable: false },
    { label: "Age", key: "birth_date", sortable: false },
    { label: "Years of Experience", key: "year_of_experience", sortable: true },
    { label: "Position applied", key: "position_applied", sortable: true },
    { label: "Applied", key: "application_date", sortable: true },
    { label: "Status", key: "status", sortable: false },
];

export function Home() {
    const [allCandidates, setAllCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [sortKey, setSortKey] = useState<SortKeys>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>(Sort.Ascending);
    const [searchParams, setSearchParams] = useSearchParams();

    const [filteredStatus, setFilteredStatus] = useState<string | undefined>();
    const [filteredPosition, setFilteredPosition] = useState<string | undefined>();
    const [filteredName, setFilteredName] = useState<string | undefined>();
    const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);

            const response = await ApplicationsAPI.getAllCandidates();

            if (response?.data) {
                let data = response.data;
                setAllCandidates(data);
                setFilteredCandidates(data);
            } else if (response?.error) {
                setHasError(true);
            }

            setIsLoading(false);
        };

        fetchCandidates();
    }, []);


    useEffect(() => {
        // Obtain sort query parameters
        const sortKeyOnQuery = searchParams.get("sortKey");
        const sortOrderOnQuery = searchParams.get("sortOrder");

        // Obtain filter query parameters
        const filterNameOnQuery = searchParams.get(FiltersEnum.Name);
        const filterPositionOnQuery = searchParams.get(FiltersEnum.Position);
        const filterStatusOnQuery = searchParams.get(FiltersEnum.Status);

        // If sort search parameters are already defined on URL, initialize its state
        if (sortKeyOnQuery) {
            // Assign type to string
            const sortByKey = (sortKeyOnQuery as SortKeys);
            const sortByOrder = (sortOrderOnQuery as SortOrder);
            setSortOrder(sortByOrder);
            setSortKey(sortByKey);
        }

        // If filter search parameters are already defined on URL, initialize its state
        if (filterNameOnQuery) {
            setFilteredName(filterNameOnQuery);
        }

        if (filterPositionOnQuery) {
            setFilteredPosition(filterPositionOnQuery);
        }

        if (filterStatusOnQuery) {
            setFilteredStatus(filterStatusOnQuery);
        }

    }, [searchParams]);

    useEffect(() => {
        let filteredData = allCandidates;

        // Filter data
        if (filteredStatus) {
            filteredData = filteredData.filter((item) => item.status === filteredStatus);
        }
        if (filteredPosition) {
            filteredData = filteredData.filter((item) => item.position_applied.toLowerCase() === filteredPosition);
        }
        if (filteredName) {
            filteredData = filteredData.filter((item) => item.name.toLowerCase().includes(filteredName.toLowerCase()));
        }

        setFilteredCandidates(filteredData);
    }, [filteredStatus, filteredPosition, filteredName])

    const sortData = (data: Candidate[], sortByKey: SortKeys, sortByOrder: SortOrder) => {
        if (!sortByKey || !data) {
            return data;
        }

        // Sort by any column in the table
        const dataSorted = data.sort((a, b) => {
            return a[sortByKey] < b[sortByKey] ? 1 : -1;
        })

        if (sortByOrder === Sort.Descending) {
            dataSorted.reverse();
        }

        return dataSorted;
    }

    // Sortable function
    // If we pass the same properties we want to memorize and do a quick return the result of the sorting function
    const sortedData = useCallback(
        () => {
            return filteredCandidates ? sortData(filteredCandidates, sortKey, sortOrder) : null;
        },
        [filteredCandidates, sortKey, sortOrder]
    );

    const handleChangeSort = (key: SortKeys) => {
        const order = sortOrder === Sort.Ascending ? Sort.Descending : Sort.Ascending;

        // Save sort selected
        setSortOrder(order);
        setSortKey(key);

        // Save sort details on search query parameters
        searchParams.set('sortKey', key);
        searchParams.set('sortOrder', order);
        setSearchParams(searchParams);
    }

    // Pagination: Get current candidates
    const candidatesPerPage = MAX_ITEMS_PER_PAGE;
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const dataSorted = sortedData();
    const currentCandidates = dataSorted ? dataSorted.slice(indexOfFirstCandidate, indexOfLastCandidate) : [];

    // Method to change the current page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    // Render pagination numbers
    const renderPagination = () => {
        return (
            <Pagination
                candidatesPerPage={candidatesPerPage}
                totalCandidates={filteredCandidates?.length}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        );
    }

    const changeFilter = (filter: FiltersEnum, value: string | undefined) => {
        if (filter === FiltersEnum.Status) {
            setFilteredStatus(value);
        }
        if (filter === FiltersEnum.Position) {
            setFilteredPosition(value);
        }
        if (filter === FiltersEnum.Name) {
            setFilteredName(value);
        }
    }

    const renderFilters = () => {
        return (
            <TableFilters
                candidates={allCandidates}
                changeFilter={changeFilter}
                filteredStatus={filteredStatus}
                filteredPosition={filteredPosition}
                filteredName={filteredName}
            />
        )
    }

    const renderBody = () => {
        return (
            <>
                {renderFilters()}
                <ApplicationsTable
                    columns={tableColumns}
                    candidates={currentCandidates}
                    sortKey={sortKey}
                    handleChangeSort={handleChangeSort}
                />
                {renderPagination()}
            </>
        )
    }

    return (
        <Layout isLoading={isLoading}>
            {hasError ? <ErrorPage /> : renderBody()}
        </Layout>
    )
}


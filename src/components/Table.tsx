import React, { useCallback, useEffect, useState } from 'react';
import { css } from "@emotion/css";
import { Row } from "./Row";
import { TableHeader } from "./TableHeader";
import { Pagination } from "./Pagination";
import { Candidate, Column, SortKeys, SortOrder } from "../types/types";
import { useSearchParams } from "react-router-dom";
import { FiltersEnum, Sort } from "../enums/enums";
import { Filter } from "./Filter";

const MAX_ITEMS_PER_PAGE = 15;

type TableProps = {
    candidates: Candidate[];
    columns: Column[];
}

export function Table({ columns, candidates }: TableProps) {
    const [allCandidates, setAllCandidates] = useState<Candidate[]>(candidates);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [sortKey, setSortKey] = useState<SortKeys>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>(Sort.Ascending);
    const [searchParams, setSearchParams] = useSearchParams();

    const [filteredStatus, setFilteredStatus] = useState<string | undefined>();
    const [filteredPosition, setFilteredPosition] = useState<string | undefined>();
    const [filteredName, setFilteredName] = useState<string | null>();


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
        let filteredData = candidates;

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

        setAllCandidates(filteredData);
    }, [filteredStatus, filteredPosition, filteredName, candidates])


    const sortData = (data: Candidate[], sortByKey: SortKeys, sortByOrder: SortOrder) => {
        if (!sortByKey) {
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
            return sortData(allCandidates, sortKey, sortOrder);
        },
        [allCandidates, sortKey, sortOrder]
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
    const currentCandidates = sortedData().slice(indexOfFirstCandidate, indexOfLastCandidate);

    // Method to change the current page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const renderTableHeader = () => {
        return (
            <TableHeader
                columns={columns}
                sortKey={sortKey}
                handleChangeSort={handleChangeSort}
            />
        )
    }

    const renderTableBody = () => {
        if (!allCandidates) {
            return null;
        }

        if (allCandidates.length === 0) {
            return (
                <span>No data to display</span>
            );
        }

        return (
            <div className={tableBodyStyle}>
                {currentCandidates?.map((candidate, index) => (
                    <Row key={index} candidate={candidate} />
                ))}
            </div>
        )

    }

    const clearFilter = (filter: FiltersEnum) => {
        searchParams.delete(filter);
        setSearchParams(searchParams);

        if (FiltersEnum.Status) {
            setFilteredStatus(undefined);
        }
        if (FiltersEnum.Position) {
            setFilteredPosition(undefined);
        }
        if (FiltersEnum.Name) {
            setFilteredName(undefined);
        }
    }

    const handleFilterChange = (value: string, filter: FiltersEnum) => {
        // Save filter selected and add it to search query parameters
        switch (filter) {
            case (FiltersEnum.Status):
                setFilteredStatus(value);
                searchParams.set(FiltersEnum.Status, value);
                setSearchParams(searchParams);
                break;
            case (FiltersEnum.Position):
                setFilteredPosition(value);
                searchParams.set(FiltersEnum.Position, value);
                setSearchParams(searchParams);
                break;
            case (FiltersEnum.Name):
                setFilteredName(value);
                searchParams.set(FiltersEnum.Name, value);
                setSearchParams(searchParams);
                break;
        }
    }

    const renderFilters = () => {
        // use Set to remove duplicated, and convert to an array
        const allPositions = new Set(allCandidates.map(candidate => candidate.position_applied));
        const allPositionsArray = Array.from(allPositions);

        const allPositionsOptions = allPositionsArray.map(position => {
            return {
                label: position,
                value: position.toLowerCase()
            }
        });

        const allStatus = new Set(allCandidates.map(candidate => candidate.status));
        const allStatusArray = Array.from(allStatus);

        const allStatusOptions = allStatusArray.map(status => {
            return {
                label: status,
                value: status.toLowerCase()
            }
        });

        return (
            <div className={filtersStyle}>
                <input type="text" className={inputStyle} placeholder="Search by name..."
                       onChange={(e) => handleFilterChange(e.target.value, FiltersEnum.Name)}></input>
                <Filter
                    label="Status"
                    filterValue={filteredStatus}
                    handleOnChange={(value: string) => handleFilterChange(value, FiltersEnum.Status)}
                    options={allStatusOptions}
                    clearFilter={() => clearFilter(FiltersEnum.Status)}
                />
                <Filter
                    label="Position"
                    filterValue={filteredPosition}
                    handleOnChange={(value: string) => handleFilterChange(value, FiltersEnum.Position)}
                    options={allPositionsOptions}
                    clearFilter={() => clearFilter(FiltersEnum.Position)}
                />
            </div>
        )
    }

    return (
        <div className={tableStyle}>
            {renderFilters()}
            {renderTableHeader()}
            {renderTableBody()}
            <Pagination
                candidatesPerPage={candidatesPerPage}
                totalCandidates={allCandidates.length}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}

const tableStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const tableBodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0 1px;
  justify-content: flex-start;
  align-items: stretch;
`;

const filtersStyle = css`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const inputStyle = css`
  width: 250px;
  border: 2px solid rgb(144, 202, 249);
  border-radius: 5px;
  height: 20px;
`;



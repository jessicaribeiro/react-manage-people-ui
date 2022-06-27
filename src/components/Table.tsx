import React, { useState, useCallback } from 'react';
import { css } from "@emotion/css";
import Row from "./Row";
import { TableHeader } from "./TableHeader";
import { Pagination } from "./Pagination";
import { Candidate, Column, SortKeys, SortOrder } from "./types";

const MAX_ITEMS_PER_PAGE = 10;

type TableProps = {
    candidates: Candidate[];
    columns: Column[];
}

export function Table({ columns, candidates }: TableProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortKey, setSortKey] = useState<SortKeys>('id');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

    const sortData = (data: Candidate[], sortByKey: SortKeys, reverseSort: boolean) => {
        if (!sortByKey) {
            return data;
        }

        // Sort by any column in the table
        const dataSorted = data.sort((a, b) => {
            return a[sortByKey] > b[sortByKey] ? 1 : -1;
        })

        if (reverseSort) {
            dataSorted.reverse();
        }

        return dataSorted;

    }

    // Sortable function
    // If we pass the same properties we want to memorize and do a quick return the result of the sorting function
    const sortedData = useCallback(
        () => {
            const reverseSort = sortOrder === 'desc';

            return candidates ? sortData(candidates, sortKey, reverseSort) : [];
        },
        [candidates, sortKey, sortOrder]
    );


    const handleChangeSort = (key: SortKeys) => {
        setSortKey(key);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
            <TableHeader columns={columns} sortOrder={sortOrder} sortKey={sortKey} handleChangeSort={handleChangeSort}/>
        )
    }

    const renderTableBody = () => {
        if(!candidates) {
            return null;
        }

        if (candidates.length === 0) {
            return (
                <span>No data to display</span>
            );
        }


        return (
            <div className={tableBodyStyle}>
                {currentCandidates?.map((candidate) => (
                    <Row candidate={candidate} />
                ))}
            </div>
        )

    }

    return (
        <div className={tableStyle}>
            {renderTableHeader()}
            {renderTableBody()}
            <Pagination
                candidatesPerPage={candidatesPerPage}
                totalCandidates={candidates.length}
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
  padding: 0 2px;
  justify-content: flex-start;
  align-items: stretch;
`;



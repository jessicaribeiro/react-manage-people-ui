import React, { useState } from 'react';
import { css } from "@emotion/css";
import Row from "./Row";
import Cell from "./Cell";
import { Candidate } from '../api/types';
import { TableHeader } from "./TableHeader";
import { Pagination } from "./Pagination";

const MAX_ITEMS_PER_PAGE = 10;

type TableProps = {
    candidates: Candidate[];
}

export function Table({ candidates }: TableProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    if (!candidates) {
        return null;
    }

    // Pagination: Get current candidates
    const candidatesPerPage = MAX_ITEMS_PER_PAGE;
    const indexOfLastCandidate = currentPage * candidatesPerPage;
    const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
    const currentCandidates = candidates ? candidates.slice(indexOfFirstCandidate, indexOfLastCandidate) : [];

    // Method to change the current page
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const renderTableHeader = () => {
        return (
            <TableHeader>
                <Cell>Name</Cell>
                <Cell>Email</Cell>
                <Cell>Age</Cell>
                <Cell>Years of Experience</Cell>
                <Cell>Position applied</Cell>
                <Cell>Applied</Cell>
                <Cell>Status</Cell>
            </TableHeader>
        )
    }

    const renderTableBody = () => {

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



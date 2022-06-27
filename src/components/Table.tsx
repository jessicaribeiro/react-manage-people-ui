import React from 'react';
import { css } from "@emotion/css";
import Row from "./Row";
import Cell from "./Cell";
import { Candidate } from '../api/types';
import { TableHeader } from "./TableHeader";
import { CircularProgress } from "@mui/material";

type TableProps = {
    candidates: Candidate[];
    isLoading: boolean;
}

export function Table({ candidates, isLoading }: TableProps) {

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
        if (isLoading) {
            return (
                <div className={loadingStyle}>
                    <CircularProgress />
                </div>
            );
        }

        if (candidates.length === 0) {
            return (
                <span>No data to display</span>
            );
        }

        return (
            <div className={tableBodyStyle}>
                {candidates?.map((candidate) => (
                    <Row candidate={candidate} />
                ))}
            </div>
        )

    }

    return (
        <div className={tableStyle}>
            {renderTableHeader()}
            {renderTableBody()}
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
  flex: 1 1 auto;
  overflow-x: auto;
  padding: 0 5px;
  justify-content: flex-start;
  align-items: stretch;
`;

const loadingStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;


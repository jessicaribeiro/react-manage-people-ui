import React from 'react';
import { css } from "@emotion/css";
import { Row } from "./Row";
import { TableHeader } from "./TableHeader";
import { Candidate, Column, SortKeys } from "../types/types";

type TableProps = {
    candidates: Candidate[];
    columns: Column[];
    sortKey: SortKeys;
    handleChangeSort: (key: SortKeys) => void;
}

export function Table({ columns, candidates, sortKey, handleChangeSort }: TableProps) {
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
        if (!candidates) {
            return null;
        }

        if (candidates.length === 0) {
            return (
                <span className={emptyStateStyle}>There is no available data to display</span>
            );
        }

        return (
            <div className={tableBodyStyle} data-testid="table-candidates">
                {candidates?.map((candidate, index) => (
                    <Row key={index} candidate={candidate} />
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
  width: 96vw;
  margin-bottom: 40px;
`;

const tableBodyStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0 1px;
  justify-content: flex-start;
  align-items: stretch;
`;

const emptyStateStyle = css`
  margin-top: 20px;
  align-self: center;
`;




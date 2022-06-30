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
                <tbody>
                <tr>
                    <td>
                        <span className={emptyStateStyle}>There is no available data to display</span>
                    </td>
                </tr>
                </tbody>
            );
        }

        return (
            <tbody className={tableBodyStyle} data-testid="table-candidates">
            {candidates?.map((candidate, index) => (
                <Row key={index} candidate={candidate} />
            ))}
            </tbody>
        )

    }

    return (
        <table className={tableStyle}>
            {renderTableHeader()}
            {renderTableBody()}
        </table>
    );
}

const tableStyle = css`
  position: relative;
  width: 96vw;
  margin-bottom: 40px;
  border-spacing: 0;
  border-collapse: collapse;
`;

const tableBodyStyle = css`
  padding: 0 1px;
`;

const emptyStateStyle = css`
  margin-top: 20px;
  align-self: center;
`;




import React from 'react';
import { css } from "@emotion/css";
import { Column, SortKeys } from '../types/types';
import { Cell } from "./Cell";

type TableHeaderProps = {
    columns: Column[];
    sortKey: SortKeys;
    handleChangeSort: (key: SortKeys) => void;
}

export function TableHeader({ columns, handleChangeSort }: TableHeaderProps) {
    return (
        <thead className={tableHeaderStyle}>
        <tr className={tableHeaderRowCellStyle}>
            {columns.map((column, index) => {
                return (
                    <Cell
                        key={index}
                        isHeader={true}
                        value={column.label}
                        sortable={column.sortable}
                        handleChangeSort={handleChangeSort}
                        columnKey={column.key}
                    />
                )
            })}
        </tr>
        </thead>
    )
}

const tableHeaderStyle = css`
  height: 46px;
  color: black;
  border-bottom: 1px solid #ccc;
  padding: 0 5px;
  font-size: 12px;
  font-weight: bold;
`;

const tableHeaderRowCellStyle = css`
  text-transform: uppercase;
  text-align: left;
`;

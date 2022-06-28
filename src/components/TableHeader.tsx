import React  from 'react';
import { css } from "@emotion/css";
import { Column, SortKeys, SortOrder } from './types';
import Cell from "./Cell";
import { SortButton } from "./SortButton";

type TableHeaderProps = {
    columns: Column[];
    sortKey: SortKeys;
    handleChangeSort: (key: SortKeys) => void;
}

export function TableHeader({ columns, sortKey, handleChangeSort }: TableHeaderProps) {
    return (
        <div className={tableHeaderStyle}>
            <div className={tableHeaderRowStyle}>
                {columns.map((column) => {
                    return (
                        <div className={tableHeaderRowCellStyle}>
                            <Cell>{column.label}</Cell>
                            {column.sortable && (
                                <SortButton
                                    sortKey={sortKey}
                                    columnKey={column.key}
                                    handleChangeSort={handleChangeSort}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

const tableHeaderStyle = css`
  display: flex;
  flex: 0 0 auto;
  height: 46px;
  color: black;
  border-bottom: 1px solid #ccc;
  padding: 0 5px;
  font-size: 12px;
`;

const tableHeaderRowStyle = css`
  display: flex;
  flex: 1 1 auto;
  text-transform: uppercase;
  align-items: center;
  justify-content: space-between;
`;

const tableHeaderRowCellStyle = css`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  flex: 1 1 40%;
`;

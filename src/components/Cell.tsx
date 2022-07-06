import React from 'react';
import { css, cx } from "@emotion/css";
import moment from "moment";
import { SortButton } from "./SortButton";
import { SortKeys } from '../types/types';

type CellProps = {
    columnId?: string;
    value: string | number;
    sortable?: boolean;
    handleChangeSort?: (key: SortKeys) => void;
    columnKey?: SortKeys;
    isHeader: boolean;
}

export function Cell({ columnId, value, sortable, handleChangeSort, columnKey, isHeader }: CellProps) {

    let cellValue = value;
    let className;
    // Convert date given to years using moment
    if (columnId === "birth_date") {
        cellValue = moment().diff(value, 'years', false);
    }

    // Format date to day/month/year
    if (columnId === "application_date") {
        cellValue = moment(value).format('DD/MM/YYYY');
    }

    if (columnId === "status") {
        className = capitalizeStyle;
        cellValue = value;
    }



    if (isHeader) {
        return (
            <th>
                <div className={sortableStyle}>
                    {sortable && handleChangeSort && columnKey && (
                        <SortButton
                            columnKey={columnKey}
                            handleChangeSort={handleChangeSort}
                        />
                    )}
                    {cellValue}
                </div>
            </th>
        )
    }

    return (
        <td className={cx(cellStyle, className)} data-testid={`col-${columnId}`}>
            {cellValue}
        </td>
    );
}

const cellStyle = css`
  text-align: left;
  height: 46px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const capitalizeStyle = css`
  text-transform: capitalize;
`;


const sortableStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

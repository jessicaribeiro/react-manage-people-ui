import React from 'react';
import { css, cx } from "@emotion/css";
import moment from "moment";

type CellProps = {
    columnId?: string;
    value: string | number;
}

export function Cell({ columnId, value }: CellProps) {

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

    return (
        <div className={cx(cellStyle, className)} data-testid={`col-${columnId}`}>
            {cellValue}
        </div>
    );
}

const cellStyle = css`
  display: flex;
  height: 46px;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex: 1 1 40%;
`;

const capitalizeStyle = css`
  text-transform: capitalize;
`;

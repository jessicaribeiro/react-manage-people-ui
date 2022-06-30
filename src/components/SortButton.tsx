import React from 'react';
import { SortKeys } from "../types/types";
import SortIcon from '@mui/icons-material/Sort';
import { css } from "@emotion/css";

type SortButtonProps = {
    columnKey: SortKeys,
    handleChangeSort: (key: SortKeys) => void;
}

export function SortButton({ columnKey, handleChangeSort }: SortButtonProps) {
    const sortIcon = <SortIcon fontSize="small"/>;

    return (
        <button
            onClick={() => handleChangeSort(columnKey)}
            className={buttonStyle}
            data-testid={`sort-by-${columnKey}`}
        >
            {sortIcon}
        </button>
    );
}

const buttonStyle = css`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

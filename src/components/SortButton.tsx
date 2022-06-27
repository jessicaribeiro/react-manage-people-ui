import React from 'react';
import { SortKeys, SortOrder } from "./types";
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { css } from "@emotion/css";

type SortButtonProps = {
    sortOrder: SortOrder,
    sortKey: SortKeys,
    columnKey: SortKeys,
    handleChangeSort: (key: SortKeys) => void;
}

export function SortButton({ sortKey, sortOrder, columnKey, handleChangeSort }: SortButtonProps) {

    const sortIcon = (sortOrder === "desc" && sortKey === columnKey) ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon />;

    return (
        <button
            onClick={() => handleChangeSort(columnKey)}
            className={buttonStyle}
        >
            {sortIcon}
        </button>
    );
}

const buttonStyle = css`
  background-color: transparent;
  border: none;
  margin: 0;
  cursor: pointer;
`;

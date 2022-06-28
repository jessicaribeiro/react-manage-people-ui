import React from 'react';
import { FilterType } from "./types";
import { css } from "@emotion/css";

type DropdownProps = {
    label: string;
    options: FilterType[];
    value: string | undefined;
    handleOnChange: (value: string) => void;
    clearFilter: () => void;
}

export function Dropdown({ label, options, value, handleOnChange, clearFilter }: DropdownProps) {

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        handleOnChange(event.target.value);
    }

    return (
        <div className={dropdownStyle}>
            <select value={value} onChange={onChange} className={selectStyle}>
                <option selected={value === undefined} disabled>{label}</option>
                {options.map((option: FilterType) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <button onClick={clearFilter} className={buttonStyle}>x</button>
        </div>
    )
}

const dropdownStyle = css`
  display: flex;
`;

const selectStyle = css`
  width: 150px;
  border: 2px solid rgb(144, 202, 249);
  border-right: none;

  &:hover {
    cursor: pointer;
  }
`;

const buttonStyle = css`
  border: 2px solid rgb(144, 202, 249);
  background-color: transparent;
  border-left: none;
  padding-left: 10px;
  padding-right: 10px;
  color: gray;

  &:hover {
    cursor: pointer;
    background-color: rgb(110, 159, 196);
    color: white;
  }
`;

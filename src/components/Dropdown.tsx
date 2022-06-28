import React from 'react';
import { FilterType } from "../types/types";
import { css } from "@emotion/css";

type DropdownProps = {
    label: string;
    options: FilterType[];
    value: string;
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
                <option value="default" disabled>{label}</option>
                {options.map((option: FilterType, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
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
  outline: none;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
  }
`;

const buttonStyle = css`
  border: 2px solid rgb(144, 202, 249);
  background-color: transparent;
  padding-left: 10px;
  padding-right: 10px;
  color: gray;
  border-radius: 2px;

  &:hover {
    cursor: pointer;
    background-color: rgb(110, 159, 196);
    color: white;
  }
`;

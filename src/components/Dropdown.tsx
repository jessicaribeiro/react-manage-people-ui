import React from 'react';
import { FilterType } from "./types";

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
        <label>
            <select value={value} onChange={onChange}>
                <option selected={value === undefined} disabled>{label}</option>
                {options.map((option: FilterType) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
            <button onClick={clearFilter}>X</button>
        </label>
    )
}

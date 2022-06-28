import React from 'react';
import { Dropdown } from "./Dropdown";
import { FilterType } from '../types/types';

type FilterProps = {
    label: string;
    filterValue: string | undefined;
    handleOnChange: (value: string) => void;
    options: FilterType[];
    clearFilter: () => void;
}

export function Filter({ label, filterValue, handleOnChange, options, clearFilter }: FilterProps) {
    const value = filterValue === undefined ? "default" : filterValue;

    return (
        <Dropdown
            label={label}
            options={options}
            value={value}
            handleOnChange={handleOnChange}
            clearFilter={clearFilter}
        />
    )
}

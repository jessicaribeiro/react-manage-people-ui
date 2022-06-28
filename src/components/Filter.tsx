import React from 'react';
import { Dropdown } from "./Dropdown";
import { FilterType } from './types';

type FilterProps = {
    label: string;
    filterValue: string | undefined;
    handleOnChange: (value: string) => void;
    options: FilterType[];
    clearFilter: () => void;
}

export function Filter({ label, filterValue, handleOnChange, options, clearFilter }: FilterProps) {
    return (
        <Dropdown
            label={label}
            options={options}
            value={filterValue}
            handleOnChange={handleOnChange}
            clearFilter={clearFilter}
        />
    )
}

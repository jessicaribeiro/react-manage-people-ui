import React from 'react';
import { FiltersEnum } from "../enums/enums";
import { Candidate } from '../types/types';
import { Filter } from "./Filter";
import { css } from "@emotion/css";
import { useSearchParams } from "react-router-dom";

type TableFiltersProps = {
    candidates: Candidate[];
    changeFilter: (filter: FiltersEnum, value: string | undefined) => void;
    filteredStatus: string | undefined;
    filteredPosition: string | undefined;
    filteredName: string | undefined;
}

export function TableFilters({
    candidates,
    changeFilter,
    filteredStatus,
    filteredPosition,
    filteredName
}: TableFiltersProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    if (!candidates) {
        return null;
    }

    // use Set to remove duplicated, and convert to an array
    const allPositions = new Set(candidates.map(candidate => candidate.position_applied));
    const allPositionsArray = Array.from(allPositions);

    const allPositionsOptions = allPositionsArray.map(position => {
        return {
            label: position,
            value: position.toLowerCase()
        }
    });

    const allStatus = new Set(candidates.map(candidate => candidate.status));
    const allStatusArray = Array.from(allStatus);

    const allStatusOptions = allStatusArray.map(status => {
        return {
            label: status.charAt(0).toUpperCase() + status.slice(1),
            value: status.toLowerCase()
        }
    });


    const clearFilter = (filter: FiltersEnum) => {
        searchParams.delete(filter);
        setSearchParams(searchParams);
        changeFilter(filter, undefined);
    }

    const handleFilterChange = (value: string, filter: FiltersEnum) => {
        // Save filter selected and add it to search query parameters
        changeFilter(filter, value);
        searchParams.set(filter, value);
        setSearchParams(searchParams);
    }

    return (
        <div className={filtersStyle}>
            <input
                type="text"
                className={inputStyle}
                placeholder="Search by name..."
                value={filteredName}
                onChange={(e) => handleFilterChange(e.target.value, FiltersEnum.Name)}
                data-testid="filter-by-name"
            />
            <Filter
                label="Status"
                filterValue={filteredStatus}
                handleOnChange={(value: string) => handleFilterChange(value, FiltersEnum.Status)}
                options={allStatusOptions}
                clearFilter={() => clearFilter(FiltersEnum.Status)}
                id="status"
            />
            <Filter
                label="Position"
                filterValue={filteredPosition}
                handleOnChange={(value: string) => handleFilterChange(value, FiltersEnum.Position)}
                options={allPositionsOptions}
                clearFilter={() => clearFilter(FiltersEnum.Position)}
                id="position"
            />
        </div>
    )
}

const filtersStyle = css`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const inputStyle = css`
  width: 250px;
  border: 2px solid rgb(144, 202, 249);
  border-radius: 5px;
  height: 20px;
`;

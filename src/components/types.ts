import { Sort } from "./enums";

export type Candidate = {
    id: number;
    name: string;
    email: string;
    birth_date: string;
    year_of_experience: number;
    position_applied: string;
    application_date: string;
    status: string;
}

export type Column = {
    label: string;
    key: SortKeys;
    sortable: boolean;
}

export type FilterType = {
    label: string;
    value: string;
}

export type SortKeys = keyof Candidate;

export type SortOrder = Sort.Ascending | Sort.Descending;

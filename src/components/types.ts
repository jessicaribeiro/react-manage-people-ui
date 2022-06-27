import { Status } from "./enums";

export type Candidate = {
    id: number;
    name: string;
    email: string;
    birth_date: string;
    year_of_experience: number;
    position_applied: string;
    application_date: string;
    status: Status;
}

export type Column = {
    label: string;
    key: SortKeys;
    sortable: boolean;
}

export type SortKeys = keyof Candidate;

export type SortOrder = 'asc' | 'desc';

import { Status } from "./enums";

export type Candidate = {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    yearOfExperience: number;
    positionApplied: string;
    applicationDate: string;
    status: Status;
}

export type CandidatesResponse = {
    success: boolean;
    data: Candidate[];
}

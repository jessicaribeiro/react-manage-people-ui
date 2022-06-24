export type Candidate = {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    yearOfExperience: string;
    positionApplied: string;
    applicationDate: string;
    status: string;
}

export type CandidatesResponse = {
    success: boolean;
    data: Candidate[];
}

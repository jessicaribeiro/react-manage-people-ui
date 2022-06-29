import { Candidate } from "../types/types";

export type CandidatesResponse = {
    success: boolean;
    data: Candidate[];
    error: string;
}

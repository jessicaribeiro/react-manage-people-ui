import apiClient from '../api';
import { CandidatesResponse } from "../types";

// Get data from api
const getAllCandidates = async () => {
    const response = await apiClient.get<CandidatesResponse>('/api/v1/candidates', {
        params: {
            limit: 10,
        }
    });

    return response.data;
};

const ApplicationsAPI = {
    getAllCandidates,
};

export default ApplicationsAPI;

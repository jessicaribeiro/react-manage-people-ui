import apiClient from '../api';
import { CandidatesResponse } from "../types";

// Get data from api
const getAll = async () => {
    const response = await apiClient.get<CandidatesResponse>('/candidates');
    return response.data;
};

const ApplicationsAPI = {
    getAll,
};

export default ApplicationsAPI;

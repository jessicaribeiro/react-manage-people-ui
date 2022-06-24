import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create request handler
const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.params = {
        ...config.params,
    };
    return config;
};

// Create response handler
const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

// Create error handlers
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

// Configure the request and response interceptors from Axios
export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

// First create a new Axios instance with a custom config.
// The timeout is set to 10s.
// If the request takes longer then the request will be aborted.
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: {
        'Content-type': 'application/json',
    },
    timeout: 10000,
});

const apiClient = setupInterceptorsTo(instance);

export default apiClient;

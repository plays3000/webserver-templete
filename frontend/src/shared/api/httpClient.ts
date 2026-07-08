import axios, { type InternalAxiosRequestConfig} from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let accessTokenGetter: (() => string | null) | null = null;

export function setAccessTokenGetter(getter: () => string | null){
    accessTokenGetter = getter;
}

export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = accessTokenGetter?.();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
});
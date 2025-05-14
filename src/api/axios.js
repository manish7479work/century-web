import axios from 'axios';
import { AUTH } from '../constants';

const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL, // Store this in .env
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request Interceptor (e.g., attach token)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(AUTH.BEARER_TOKEN); // or use a context/store
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // You can handle 401, 403, 500, etc. globally here
        if (error.response?.status === 401) {
            window.location.href = '/login'; // simple full-page redirect
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

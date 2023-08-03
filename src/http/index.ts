import axios from 'axios'
import { AuthResponse } from '../models/response/AuthResponse'

export const API_URL = `http://localhost:5066`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        try {
            originalRequest._isRetry = true;
            const response = await axios.get<AuthResponse>(`${API_URL}/account/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.tokens.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }
    throw error;
})

export default $api;
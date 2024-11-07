
import axios from 'axios';
import { getToken } from '../../utils/utils';

const url = process.env.REACT_APP_URL;

const api = axios.create({
    baseURL: url,
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;  
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            localStorage.removeItem('role');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;
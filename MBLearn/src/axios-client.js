import axios from 'axios';
import { Navigate } from 'react-router-dom';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});


axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ACCESS_TOKEN');

        // User Inactivity handling
        const lastActivity = parseInt(localStorage.getItem('LAST_ACTIVITY'), 10);
        const inactivityTime = 5 * 60 * 60 * 1000; // 5 hours

        if (lastActivity && Date.now() - lastActivity > inactivityTime) {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('LAST_ACTIVITY');
            return Promise.reject(new Error('User is inactive'));
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            localStorage.setItem('LAST_ACTIVITY', Date.now()); // Update activity timestamp
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    }, (error) => {
        // Do something with response error
        const {response} = error;

        return Promise.reject(error)
    });




export default axiosClient;

export const uploadPhoto = axios.create({
    baseURL: "https://api.cloudinary.com/v1_1/ddqp4u84v",
})



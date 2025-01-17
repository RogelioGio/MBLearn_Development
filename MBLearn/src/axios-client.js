import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const token = localStorage.getItem('ACCESS_TOKEN');
        config.headers.Authorization=`Bearer ${token}`;
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        // Do something with response data
        return response;
    }, (error) => {
        // Do something with response error
        const {response} = error;

        if(response.status===401){
            localStorage.removeItem('ACCESS_TOKEN');
            window.location.href = '/login';
        }

        return Promise.reject(error)
    });

export default axiosClient;

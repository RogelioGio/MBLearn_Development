import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const token = localStorage.getItem('ACCESS_TOKEN');

        //User Inactivity handling
        const lastActivity = localStorage.getItem('LAST_ACTIVITY');
        const inactivityTime = 10*1000;

        if(lastActivity && Date.now() - lastActivity > inactivityTime){
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('LAST_ACTIVITY');
            return Promise.reject(new Error('User is inactive'));
        }

        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }

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
        }

        return Promise.reject(error)
    });


    //Function to check user inactivity


export default axiosClient;

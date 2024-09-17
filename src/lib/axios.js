import axios from "axios";
import isLogged from "./isLogged";


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
})


axiosInstance.interceptors.request.use(
    async (config) => {
        const logged = await isLogged();  
        if (logged && logged.token) {
            config.headers['Authorization'] = `Bearer ${logged.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



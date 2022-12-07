import axios from 'axios';
import {environment} from "../environment";
import getCookie from "./getCookie";

const instance = axios.create({
    baseURL: environment.baseApiURL,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getCookie('token')}`
    return config;
});

export default instance;

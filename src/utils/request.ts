import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig } from 'axios';

const request = axios.create({
    timeout: 25000,
});

request.interceptors.request.use((config: AxiosRequestConfig) => {
    return config
}, (err: any) => err);

request.interceptors.response.use((response: AxiosResponse) => {
    const result = response.data;
    const code = result.code;

    if (code !== 1) {
        return Promise.reject(result)
    }
    return result
}, (err) => err);

export default request

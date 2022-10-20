import axios, {AxiosInstance} from "axios";

const isDev = process.env.NODE_ENV === 'development';

const myAxios: AxiosInstance = axios.create({
    // baseURL: isDev ? 'http://localhost:8080/api' : '线上地址',
    baseURL: isDev ? 'http://localhost:8080/api' : 'https://findguys-backend-13503-5-1314499537.sh.run.tcloudbase.com/api',
});

myAxios.defaults.withCredentials = true; // 配置为true

// Add a request interceptor
myAxios.interceptors.request.use(function (config) {
    console.log('我要发请求啦', config)
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
myAxios.interceptors.response.use(function (response) {
    console.log('我收到你的响应啦', response)
    // 未登录则跳转到登录页
    if (response?.data?.code === 40100) {
        // https://findguys-frontend.vercel.app/user/login?redirect=https://findguys-frontend.vercel.app/user
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default myAxios;

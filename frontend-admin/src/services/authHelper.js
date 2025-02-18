import LocalStorageService from "./storage";
import { API_URL } from "../constants/config";
import { setAuthenticated } from "../store/slices/authSlice";
import { getStore } from "../middleware";
import axios from "axios";

// Khai báo createServiceNoToken trước
const createServiceNoToken = (baseURL) => {
    const instance = axios.create(baseConfig(baseURL));
    instance.interceptors.request.use(config => {
        return config;
    });
    return instance;
};

// Config cơ bản
const baseConfig = (
    baseURL,
    contentType = 'application/json',
    headers = {}
) => {
    return {
        baseURL: baseURL + '/api',
        headers: {
            'Accept-Language': 'en-US',
            'Content-Type': contentType || 'application/json',
            ...headers
        },
    };
};

// Sử dụng createServiceNoToken
const instanceNoToken = createServiceNoToken(API_URL);

// Định nghĩa hàm refreshToken
const refreshToken = async (refresh_token) => {
    const url = '/auth/refresh';
    return instanceNoToken.post(url, { refresh_token });
};

// Định nghĩa hàm logout
const logout = () => {
    const store = getStore();
    const dispatch = store.dispatch;

    LocalStorageService.removeItem(LocalStorageService.OAUTH_TOKEN);
    LocalStorageService.removeItem(LocalStorageService.REFRESH_TOKEN);

    dispatch(setAuthenticated(false));
    window.location.href = '/';
};

// Export AuthHelper
const AuthHeaper = {
    refreshToken, 
    logout,
}

export default AuthHeaper;

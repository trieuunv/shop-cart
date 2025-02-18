import axios from "axios";
import { API_URL } from "../../constants/config";

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

const login = (data) => {
    const url = '/auth/login';
    return instanceNoToken.post(url, data);
}

const register = async (data) => {
    try {
        const response = await instanceNoToken.post('/auth/register', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to register');
    }
}

const checkUsername = async(data) => {
    try {
        const response = await instanceNoToken.post('/auth/username/check', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to checkUsername');
    }
}

const AuthService = {
    login,
    register,
    checkUsername
}

export default AuthService;
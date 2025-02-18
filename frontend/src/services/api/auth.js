import { API_URL } from "../../constants/config";
import { createServiceNoToken } from "./axios";

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

const refreshToken = async (refresh_token) => {
    const url = '/auth/refresh';
    return instanceNoToken.post(url, { refresh_token });
};

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
    checkUsername,
    refreshToken
}

export default AuthService;
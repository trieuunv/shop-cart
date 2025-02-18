import axios from "axios";
import { LocalStorageService } from "..";
import AuthHeaper from "../authHelper";

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
}

const interceptAuth = (config) => {
    const instance = axios.create(config);

    instance.interceptors.request.use(async (cf) => {
        const token = LocalStorageService.get(LocalStorageService.OAUTH_TOKEN);

        if (token && cf.headers) {
            cf.headers['Authorization'] = 'Bearer ' + token;
        }

        return cf;
    });

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response?.status === 401) {
                try {   
                    return await getNewToken(error, AuthHeaper.logout);
                } catch (retryError) {
                    return Promise.reject(retryError);
                }
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

const getNewToken = async (error, logout) => {
    const refreshToken = LocalStorageService.get(LocalStorageService.REFRESH_TOKEN);

    if (!refreshToken) {
        logout();
        return Promise.reject(new Error("No refresh token available"));
    }

    try {
        const { data } = await AuthHeaper.refreshToken(refreshToken);
        LocalStorageService.set(LocalStorageService.OAUTH_TOKEN, data.accessToken);
        
        error.config.headers['Authorization'] = 'Bearer ' + data.accessToken;

        return axios.request(error.config);
    } catch (error) {
        logout();
        return Promise.reject(new Error("Failed to refresh token, user logged out"));
    }
}

export const createService = (baseURL, contentType = 'application/json', headers = {}) => {
    return interceptAuth(baseConfig(baseURL, contentType, headers));
}

export const createServiceNoToken = (baseURL) => {
    const instance = axios.create(baseConfig(baseURL));
    instance.interceptors.request.use(config => {
        return config;
    });
    return instance;
}

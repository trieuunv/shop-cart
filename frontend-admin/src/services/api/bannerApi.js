import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);

export const fetchBanners = async() => {
    try {
        const response = await apiService.get('/admin/banners');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch banners');
    }
}

export const createBanner = async(data) => {
    try {
        const response = await apiService.post('/admin/banners/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create banner');
    }
} 

export const updateBanners = async (data) => {
    try {
        const response = await apiService.post('/admin/banners/update', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Failed to create banner');
    }
}


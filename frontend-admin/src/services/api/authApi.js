import { API_URL } from "../../constants/config";
import { createServiceNoToken } from "./axios";

const apiService = createServiceNoToken(API_URL);


export const login = async(data) => {
    try {
        const response = await apiService.post('/admin/login', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to login');
    }
}
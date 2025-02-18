import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);

export const fetchUsers = async() => {
    try {
        const response = await apiService.get('/admin/users');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
}
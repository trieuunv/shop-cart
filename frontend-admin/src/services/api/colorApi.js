import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);

export const fetchColors = async() => {
    try {
        const response = await apiService.get('/admin/colors');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch colors');
    }
}


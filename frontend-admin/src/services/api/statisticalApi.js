import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);

export const fetchStatisticalOrder = async(data) => {
    try {
        const response = await apiService.post('/admin/statisticals/order', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to statisticals orders');
    }
}


/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from "../../constants/config";
import { createServiceNoToken } from "./axios";

const apiService = createServiceNoToken(API_URL);

const fetchProducts = async(filter) => {
    try {
        const response = await apiService.get(`/products/category/${filter}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
}

const fetchProduct = async(productId) => {
    try {
        const response = await apiService.get(`/products/${ productId }`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
}

export default {
    fetchProducts,
    fetchProduct
}
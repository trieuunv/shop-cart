/* eslint-disable import/no-anonymous-default-export */
import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);

const fetchOrders = async() => {
    try {
        const response = await apiService.get('/orders');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
}

const fetchOrder = async(orderId) => {
    try {
        const response = await apiService.get(`/orders/${ orderId }`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
}

const createOrder = async(data) => {
    try {
        const response = await apiService.post('/orders/create', data);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create order');
    }
}

const fetchPayments = async(orderId) => {
    try {
        const response = await apiService.get(`/orders/${orderId}/payment`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch payments');
    }
}

const confirmPayment = async(orderId, data) => {
    try {
        const response = await apiService.post(`/orders/${orderId}/confirm-payment`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response?.data?.message || 'Failed to confirm payments');
    }
}

export default {
    fetchOrders,
    fetchOrder,
    createOrder,
    fetchPayments,
    confirmPayment
}

import { API_URL } from "../../constants/config";
import { createService } from "./axios";

const apiService = createService(API_URL);


export const fetchOrders = async() => {
    try {
        const response = await apiService.get('/admin/orders');

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch orders');
    }
}

export const fetchOrder = async(orderId) => {
    try {
        const response = await apiService.get(`/admin/orders/${orderId}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch order');
    }
}

export const confirmOrder = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/confirm`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to confirm order');
    }
}

export const processingOrder = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/processing`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to processing order');
    }
}

export const shipOrder = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/ship`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to ship order');
    }
}

export const deliveryOrder = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/delivery`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delivery order');
    }
}

export const cancelOrder = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/cancel`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to cancel order');
    }
}

export const rollBackOrder = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/rollback`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to rollback order');
    }
}

export const confirmPayment = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/confirm-payment`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to confirm payment');
    }
}

export const refusePayment = async(orderId) => {
    try {
        const response = await apiService.patch(`/admin/orders/${orderId}/refuse-payment`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to refuse payment');
    }
}
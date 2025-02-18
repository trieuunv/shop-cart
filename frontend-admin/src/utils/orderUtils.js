export const generateStatus = (order_status, shipping_status) => {
    return (order_status === 'pending')
        ? 'Đang xác nhận'
        : (order_status === 'completed' && shipping_status === 'in_transit')
        ? 'Đang giao hàng'
        : (order_status === 'completed' && shipping_status === 'delivered')
        ? 'Đã giao hàng'
        : (order_status === 'cancelled')
        ? 'Đã Hủy'
        : '';
}

export const getOrderStatus = (status) => {
    if (!status) {
        return 'Không xác định';
    }

    const statusMapping = {
        'confirmed_receipt': 'Hoàn thành',
        'delivered': 'Giao hàng thành công',
        'shipped': 'Đang Giao Hàng',
        'confirmed': 'Chờ Giao Hàng',
        'cancelled': 'Đã Hủy Đơn Hàng',
        'pending': 'Chờ Xác Nhận'
    };

    return statusMapping[status] || 'Không xác định';
}
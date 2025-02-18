import React, { useEffect, useState } from 'react';
import './styles.scss';
import { API_URL } from '../../../../../constants/config';
import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../../../../utils/priceUtils';
import { formatDate } from '../../../../../utils/dateUtils';
import Confirm from '../../../../../components/Confirm';
import { 
    fetchOrder, 
    confirmOrder, 
    processingOrder, 
    shipOrder, 
    deliveryOrder, 
    cancelOrder, 
    rollBackOrder, 
    confirmPayment, 
    refusePayment 
} from '../../../../../services/api/orderApi';

const generatePaymentStatus = (paymentStatus) => {
    switch (paymentStatus) {
        case 'pending':
            return 'Chưa thanh toán';
        case 'confirmed':
            return 'Đã xác nhận';
        case 'waiting_for_confirmation':
            return 'Đang chờ xác nhận';
        case 'refused':
            return 'Đã từ chối';
        default:
            return paymentStatus;
    }
}

const statusOrder = (status) => {
    if (!status) {
        return 'Không xác định';
    }

    const statusOrderMap = {
        'pending': 'Đơn hàng đã được đặt',
        'confirmed': 'Đơn hàng đã được xác nhận',
        'processed': 'Đơn hàng được xử lí',
        'shipped': 'Đơn hàng được gửi đi',
        'delivered': 'Đơn hàng được giao đến người mua',
        'cancelled': 'Đơn hàng đã bị hủy',
        'returned': 'Đơn hàng được trả',
    };

    return statusOrderMap[status] || 'Không xác định';
}

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const [confirm, setConfirm] = useState(false);

    console.log(order);

    useEffect(() => {
        const loadOrder = async() => {
            try {
                const { order } = await fetchOrder(id);

                setOrder(order);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadOrder();
    }, []);

    const handleConfirmOrder = async() => {
        // if not paymented => popup
        try {
            await confirmOrder(order.id);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }

    const handleProcessingOrder = async() => {
        // if not paymented => popup
        try {
            await processingOrder(order.id);
            navigate(0);
        } catch (error) {
            console.log(error);
        }
    }

    const handleStartShipping = async() => { 
        try { 
            await shipOrder(order.id);
            navigate(0);
        } catch (error) { 
            console.error('Failed to start shipping:', error); 
        } 
    };

    const handleCompleteShipping = async() => { 
        try { 
            await deliveryOrder(order.id);
            navigate(0);
        } catch (error) { 
            console.error('Failed to complete shipping:', error); 
        } 
    };

    const handleCancelOrder = async() => { 
        try { 
            await cancelOrder(order.id); 
            navigate(0);
        } catch (error) { 
            console.error('Failed to cancel order:', error); 
        } 
    };

    const handleRollBackOrder = async() => {
        try { 
            await rollBackOrder(order.id);

            navigate(0);
        } catch (error) { 
            console.error('Failed to revert status order:', error); 
        } 
    }

    const handleConfirmPayment = async() => {
        if (order && order.payment) {
            try {
                await confirmPayment(order.id);
    
                alert('Xác nhận thanh toán thành công.');
                navigate(0);
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    const handleRefusePayment = async() => {
        if (order && order.payment) {
            try {
                await refusePayment(order.id);
    
                alert('Từ chối thanh toán thành công.');
                navigate(0);
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
        );
    }

    if (!order) {
        return (
            <div>Đã xảy ra lỗi</div>
        );
    }

    const statusActions = {
        pending: { 
            buttonText: 'Xác nhận đơn hàng', 
            handler: handleConfirmOrder 
        },
        confirmed: { 
            buttonText: 'Xử lí đơn hàng', 
            handler: handleProcessingOrder 
        },
        processed: {
            buttonText: 'Bắt đầu giao hàng', 
            handler: handleStartShipping
        },
        shipped: {
            buttonText: 'Giao hàng thành công', 
            handler: handleCompleteShipping
        },
        delivered: { 
            buttonText: 'Đã giao hàng thành công', 
            handler: null 
        },
        cancelled: {
            buttonText: 'Đơn hàng đã bị hủy', 
            handler: null
        }
    };
        
    const currentAction = statusActions[order.status];
        
    <div className="order-actions">
        {currentAction && (
            <div className="order-btns">
                <button 
                    onClick={currentAction.handler} 
                    disabled={!currentAction.handler}
                >
                    {currentAction.buttonText}
                </button>
            </div>
        )}
    </div>

    return (
        <div className='order-wr'>
            <Confirm 
                isVisible={confirm} 
                onChange={(value) => setConfirm(value)} 
                text='Đơn hàng này chưa thanh toán, vẫn xác nhận?'
            />
            <div className="order-main-title">
                <span className='order-code'>Mã đơn hàng: <span>{order.code}</span></span>
                <span className='order-status-text'><span>{}</span></span>
            </div>

            <div className="order-contents">
                <div className="customer-infor">
                    <div className="field-title">
                        <span>Thông tin khách hàng</span>
                    </div>

                    <div className="field-content">
                        <span>Mã khách hàng: {order.user.code}</span>
                        <span>Họ và Tên: {order.user.name}</span>
                    </div>
                </div>

                <div className="address-infor">
                    <div className="field-title">
                        Địa chỉ
                    </div>

                    <div className="field-content">
                        <span className='customer-name'>{order.address.name}</span>
                        <div className="address">
                            <span className='address'>Địa chỉ: </span>
                            <span>{''}</span>
                        </div>

                        <div className="phone-number">
                            <span className='phone-number'>Điện thoại: </span>
                            <span>{order.address.phoneNumber}</span>
                        </div>
                    </div>
                </div>

                <div className="product-infor">
                    <div className="field-title">
                        Danh sách sản phẩm
                    </div>
                    <div className="field-content">
                        <div className="product-list">
                            {order.orderProducts.map((orderProduct, index) => (
                                <div className="product-item" key={index}>
                                    <div className="product-img">
                                        <img src={`${API_URL}/storage/${orderProduct.path}`} alt="" />
                                    </div>

                                    <div className="product-text">
                                        <div className="product-name">
                                            <span>{orderProduct.name}</span>
                                        </div>

                                        <div className="product-classify">
                                            <span>Phân Loại: Đen trắng</span>
                                        </div>

                                        <div className="product-total">
                                            x{orderProduct.quantity}
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        <div className="price-field">
                                            <span>
                                                {formatCurrency(orderProduct.quantity * orderProduct.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-total-amount">
                            <span>Tổng tiền</span>
                            <span>{formatCurrency(order.totalAmount)}</span>
                        </div>
                    </div>
                </div>

                <div className="order-infor">
                    <div className="field-title">
                        Thanh toán
                    </div>

                    <div className="field-content">
                        <div className="order-field">
                            <span>Phương thức thanh toán</span>
                            <span className='price'>{
                                order.payment.method === 'cash_on_delivery' 
                                ? 'Thanh toán bằng tiền mặt' 
                                : (order.payment.method === 'bank_transfer' 
                                ? 'Thanh toán qua tài khoản ngân hàng' 
                                : '')}
                            </span>
                        </div>

                        <div className="order-field">
                            <span>Trạng thái</span>
                            <span>{ generatePaymentStatus(order.payment.status) }</span>
                        </div>
                        
                        { order.payment.receiptUrl && 
                            <div className="order-field">
                                 <span>Ảnh</span>
                                <img src={`${API_URL}/storage/${order.payment.receiptUrl}`} alt="" /> 
                            </div>
                        }

                        <div className="order-field">
                            <span>Mã giao dịch</span>
                            <span>{order.payment.code}</span>
                        </div>

                        { order.payment.date && 
                            <div className="order-field">
                                <span>Ngày thanh toán</span>
                                <span>{order.payment.date}</span>
                            </div>
                        }

                        <div className="order-field">
                            <span></span>
                            <span>
                                <button className='payment-action confirm' onClick={handleConfirmPayment}>Xác nhận</button>
                                <button className='payment-action cancel' onClick={handleRefusePayment}>Từ chối</button>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="order-status">
                    <div className="field-title">
                        Trạng thái đơn hàng
                    </div>

                    <div className="field-content">
                        {order.history.map((status, index) => (
                            <div className="schedules-field" key={index}>
                                <span className='field-name'>
                                    {statusOrder(status.status)} {status.isRollback ? '(Roll Back)' : ''}
                                </span>

                                <span className='schedules-date'>
                                    <span>{formatDate(status.date)}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-actions">
                    {currentAction && (
                        <div className="order-btns">
                            <button 
                                onClick={currentAction.handler} 
                                disabled={!currentAction.handler}
                            >
                                {currentAction.buttonText}
                            </button>
                        </div>
                    )}

                    <div className="order-btns">
                        <button onClick={handleRollBackOrder}>Quay lại</button>
                        <button onClick={handleCancelOrder}>Hủy đơn hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
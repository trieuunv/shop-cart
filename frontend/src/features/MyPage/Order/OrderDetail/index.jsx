import React, { useEffect, useState } from 'react';
import './styles.scss';
import axios from 'axios';
import { API_URL } from '../../../../constants/config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../../../utils/priceUtils';
import { formatDate } from '../../../../utils/dateUtils';
import { getOrderStatus } from '../../../../utils/orderUtils';
import { OrderService } from '../../../../services';
import OrderHistory from '../../../../components/OrderHistory';

const getPaymentMethod = (method) => {
    if (!method) {
        return 'Không xác định';
    }

    const paymentMethodMap = {
        'cash_on_delivery': 'Thanh toán khi giao hàng',
        'bank_transfer': 'Thanh toán bằng tài khoản ngân hàng',
        'paypal': 'Paypal',
        'credit_card': 'Thanh toán bằng thẻ tín dụng'
    };

    return paymentMethodMap[method] || 'Không xác định';
}

const getPaymentStatus = (status) => {
    if (!status) {
        return 'Không xác định';
    }

    const paymentStatusMap = {
        'pending': 'Chưa thanh toán',
        'waiting_for_confirmation': 'Đang chờ xác nhận',
        'confirmed': 'Đã thanh toán',
        'failed': 'Thanh toán thất bại'
    };

    return paymentStatusMap[status] || 'Không xác định';
}

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const loadOrders = async() => {
            try {
                const { order } = await OrderService.fetchOrder(id);
                setOrder(order);
                console.log(order);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();
    }, []);

    const handleCancelOrder = async() => { 
        try { 
            const response = await axios.post(`${API_URL}/cancel-order`, { 
                order_id: order.id 
            }, { withCredentials: true }); 
            alert(response.data.message); 
            navigate(0);
        } catch (error) { 
            console.error('Failed to cancel order:', error); 
        } 
    };

    const handleConfirmedReceiptOrder = async() => {
        try { 
            const response = await axios.post(`${API_URL}/confirmed_receipt`, { 
                order_id: order.id 
            }, { withCredentials: true }); 
            alert(response.data.message); 

            navigate(0);
        } catch (error) { 
            console.error('Failed to complete shipping:', error); 
        }
    }

    if (!order) {
        return (
            <div>
                <span>Không Tìm Thấy Đơn Hàng</span>
            </div>
        );
    }
    
    return (
        <div className='order-container'>
            <div className="wrap">
                <div className="wide">
                    <div className="order-content">
                        <div className="order-box">
                            <div className="order-field">
                                <div className="field-header">
                                    <span>Chi Tiết Đơn Hàng</span>
                                </div>

                                <div className="field-contents">
                                    <span>Mã đơn hàng: {order.code}</span>
                                    <span>Trạng thái: {getOrderStatus(order.status)}</span>
                                    <span>Ngày đặt hàng: {formatDate(order.orderDate)}</span>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Thông Tin Vận Chuyển</span>
                                </div>

                                <div className="field-contents">
                                    <span className="customer-infor">
                                        <span>{order.address.name}</span>
                                        <span className="partition"></span>
                                        <span>{order.address.phoneNumber}</span>
                                    </span>

                                    <span className="address-content-infor">
                                        <span>{order.address.address}</span>
                                    </span>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Sản Phẩm</span>
                                </div>

                                <div className="field-contents">
                                    <div className="product-list">
                                        {order.products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-content">
                                                    <div className="product-image">
                                                        <img src={`${API_URL}/storage/${product.imageUrl}`} alt="" />
                                                    </div>

                                                    <div className="product-infor">
                                                        <span className="product-name">
                                                            {product.name}
                                                        </span>

                                                        <span className="product-classify">
                                                            Phân Loại: Đen xám, XL
                                                        </span>

                                                        <span className="product-total">
                                                            x{product.quantity}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="product-payment">
                                                    <span>{formatCurrency(product.quantity * product.price)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="total-amount">
                                        <div className="price-field">
                                            <span className='price-title'>Tổng tiền hàng</span>
                                            <span className='price-value'>{formatCurrency(order.totalAmount)}</span>
                                        </div>

                                        <div className="price-field">
                                            <span className='price-title'>Phí vận chuyển</span>
                                            <span className='price-value'>0</span>
                                        </div>

                                        <div className="price-field">
                                            <span className='price-title'>Mã giảm giá</span>
                                            <span className='price-value'>0</span>
                                        </div>

                                        <div className="price-field">
                                            <span className='price-title'>Thành tiền</span>
                                            <span className='price-value'>{formatCurrency(order.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Tiến Trình</span>
                                </div>

                                <div className="field-contents">
                                    <div className="order-progress">
                                        { order.status !== 'cancelled' ? 
                                            <div className="order-schedule">
                                                <OrderHistory history={order.history}/>
                                                <div className="order-action">
                                                    <div className="action-item">
                                                        <button
                                                            disabled={order.status !== 'delivered'}
                                                            onClick={handleConfirmedReceiptOrder}
                                                        >Đã Nhận Hàng</button>
                                                    </div>

                                                    <div className="action-item">
                                                        <button 
                                                            disabled={!['pending', 'confirmed'].includes(order.status)}
                                                            onClick={handleCancelOrder}
                                                        >
                                                            Hủy Đơn Hàng</button>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div className='cancelled-status'>
                                                <span className='cancelled-tile'>Đơn hàng đã được hủy</span>
                                                <span className='cancelled-date'>{order.cancelledDate}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="order-field">
                                <div className="field-header">
                                    <span>Thanh toán</span>
                                </div>

                                <div className="field-contents">
                                    <span>Tổng thanh toán: {formatCurrency(order.payment.totalAmount)}</span>
                                    <span>Phương thức thanh toán: {getPaymentMethod(order.payment.method)}</span>
                                    <span>Trạng thái: {getPaymentStatus(order.payment.status)}</span>
                                    {['pending', 'failed'].includes(order.payment.status) ?
                                        <div className="payment-btn">
                                            <Link 
                                                to={`/checkout/payment/${order.id}`}
                                            >
                                                Thanh toán
                                            </Link>
                                        </div> 
                                        : <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
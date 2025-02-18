import React, { useEffect, useState } from 'react';
import './styles.scss';

import axios from 'axios';
import { API_URL } from '../../../../constants/config';
import { formatCurrency } from '../../../../utils/priceUtils';
import { getOrderStatus } from '../../../../utils/orderUtils';
import { OrderService } from '../../../../services';

import { IconStarFourPointsSmall } from '../../../../components/icons/IconStarFourPointsSmall';
import { IconDotFill16 } from '../../../../components/icons/IconDotFill16';
import { ChevronRight } from '../../../../components/icons/ChevronRight';
import { Link } from 'react-router-dom';

const Purchases = () => {
    const [orders, setOrders] = useState([]);

    const [statusSelected, setStatusSelected] = useState('all');

    useEffect(() => {
        const loadOrders = async() => {
            try {
                const { orders } = await OrderService.fetchOrders();
                setOrders(orders);
                console.log(orders);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();
    }, []);

    const handleConfirmedReceiptOrder = async(orderId) => {
        try { 
            const response = await axios.post(`${API_URL}/confirmed_receipt`, { 
                order_id: orderId 
            }); 
            alert(response.data.message); 
            
            const updatedOrders = orders.map(order => {
                if (order.id === orderId) {
                    order.orderSchedule.status = 'confirmed_receipt'
                }
            });

            setOrders(updatedOrders);
        } catch (error) { 
            console.error('Failed to complete shipping:', error); 
        }
    }

    return (
        <div className='order-container'>
            <div className="order-container__title">
                Danh Sách Đơn Hàng
            </div>

            <div className="order-classify">
                <ul className="order-classify__list">
                    <li 
                        className={`${statusSelected === 'all' && 'active'}`}
                        onClick={() => setStatusSelected('all')}
                    >
                        <div className="order-classify-container">
                            <span>Tất cả</span>
                        </div>
                    </li>
                    <li 
                        className={`${statusSelected === 'pending' && 'active'}`}
                        onClick={() => setStatusSelected('pending')}
                    >
                        <div className="order-classify-container">
                            Chờ xác nhận
                        </div>
                    </li>
                    <li>
                        <div className="order-classify-container">
                            Tất cả
                        </div>
                    </li>
                </ul>
            </div>

            <div className="order-list">
                {orders && orders.map((order, index) => (
                    <div key={index} className="order-infor-item">
                        <div className="order-head">
                            <div className="order-head__status"> 
                                <span>
                                    { getOrderStatus(order.status) }
                                </span>
                            </div>

                            <Link 
                                to={''}
                                className='order-head__action'
                            >
                                <span>Chi tiết</span>
                                <ChevronRight width={'16px'} height={'16px'} />
                            </Link>
                        </div>

                        <div className="order-products-list">
                            {order.products.map((product, index) => (
                                <div key={index} className="order-product">
                                    <div className="order-product__infor">
                                        <div className="order-product__image">
                                            <img src={`${API_URL}/storage/${product.imageUrl}`} alt="" />
                                        </div>

                                        <div className="order-product__contents">
                                            <span className='order-product__contents-name'>{product.name}</span>
                                            <span className='order-product__contents-classify'>Phân loại: {}</span>
                                            <span className='order-product__contents-quantity'>x{product.quantity}</span>
                                        </div>  
                                    </div>

                                    <div className="order-product__payment">
                                        <div className="order-product__total-price">
                                            <span className='payment-value'>
                                                { formatCurrency(product.total) }    
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-total">
                            <span className='order-total__key'>Tổng cộng (1 sản phẩm): &#160; </span>
                            <span className='order-total__value'>
                                {formatCurrency(order.totalPrice)}
                            </span>
                        </div>

                        
                    </div>
                ))}
            </div>
        </div>
    );
}


export default Purchases;
import React, { useEffect, useState } from 'react';
import './styles.scss';

import Header from '../../../components/Header';
import { useForm, Controller } from 'react-hook-form';
import { API_URL } from '../../../constants/config';
import { useNavigate } from 'react-router-dom';
import { AddressService } from '../../../services';
import { CartService } from '../../../services';
import { OrderService } from '../../../services';

const Order = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState(null);
    const [total, setTotal] = useState(1);
    const [cart, setCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            paymentMethod: 'cash_on_delivery',
        },
    });

    const onSubmit = async(data) => {
        console.log(data);

        if (!data.paymentMethod) {
            alert('Chọn phương thức thanh toán.');
            return;
        }

        if (!address) {
            alert('Chưa có địa chỉ mặc định.');
            return;
        }

        try {
            const { order } = await OrderService.createOrder({ method: data.paymentMethod });
            
            if (data.paymentMethod === 'bank_transfer') {
                navigate(`/checkout/payment/${order.id}`);  
            } else {
                alert('Thanh toán thành công');
                navigate(`/order/detail/${order.id}`);  
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const loadAddressDefault = async() => {
            setLoading(true);
            try {
                const { address } = await AddressService.fetchDefaultAddress();
                setAddress(address);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadAddressDefault();
    }, []);

    useEffect(() => {
        const loadCart = async() => {
            setLoading(true);
            try {
                const { cart, products, totalPrice } = await CartService.fetchCart();
                setProducts(products);
                setCart(cart);
                setTotalPrice(totalPrice);
            } catch (error) {
                console.log(error.response);
            } finally {
                setLoading(false);
            }
        }

        loadCart();
    }, []);

    return (
        <div className="payment-list-container">
            <Header />
            <div className="wrap">
                <div className='wide'>
                    <div className="title">Thanh Toán</div>
                    <form className="payment-layout" onSubmit={handleSubmit(onSubmit)}>
                        <div className="payment-infor">
                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Địa Chỉ</span>
                                    <a href="">Thay đổi</a>
                                </div>

                                <div className="field-content">
                                    { address ? 
                                        <div className="transport">
                                            <div className="customer-infor">
                                                <p className='customer-name'>{ address.name }</p>
                                                <div className="partition">

                                                </div>
                                                <p className='customer-phone'>SĐT: { address.phoneNumber }</p>
                                            </div>

                                            <div className="address">
                                                <span>{`${address.address_detail}, ${address.ward_name}, ${address.district_name}, ${address.province_name}`}</span>
                                            </div>
                                        </div>
                                        : (!loading && <div>Chưa có địa chỉ</div>)
                                    }
                                </div>
                            </div>

                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Sản Phẩm</span>
                                </div>

                                <div className="field-content">
                                    <div className="product-list">
                                        { products && products.map((product, index) => (
                                            <div key={index} className="product-item">
                                                <div className="product-image">
                                                    <img src={`${API_URL}/storage/${product.imgPath}`} alt="" />
                                                </div>
    
                                                <div className="product-infor">
                                                    <div className="product-name">{ product.name }</div>
                                                    <div className="product-text">
                                                        <span>SL: { product.quantity }</span>
                                                        <span className='total-item'>
                                                            { product.totalPrice }
                                                            <span style={{textDecoration: 'underline'}}>đ</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="payment-field">
                                <div className="title-field">
                                    <span>Chọn Phương Thức Thanh Toán</span>
                                </div>

                                <div className="field-content flex-column">
                                    <div className="option-payment">
                                        <Controller 
                                            name='paymentMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        id='cash_on_delivery'
                                                        type="radio"
                                                        value={'cash_on_delivery'} 
                                                        {...field}
                                                        checked={field.value === 'cash_on_delivery'}
                                                        onChange={() => setValue('paymentMethod', 'cash_on_delivery')}
                                                    />
                                                    <span className='option-infor'>
                                                        <img src="/images/money.png" alt="" className='option-img' />
                                                        <label htmlFor="cash_on_delivery">Thanh toán bằng tiền mặt</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>

                                    <div className="option-payment">
                                        <Controller 
                                            name='paymentMethod'
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <input 
                                                        id='bank_transfer'
                                                        type="radio"
                                                        value={'bank_transfer'} 
                                                        {...field}
                                                        checked={field.value === 'bank_transfer'}
                                                        onChange={() => setValue('paymentMethod', 'bank_transfer')}
                                                    />
                                                    <span className='option-infor'>
                                                        <img src='/images/bank.png' alt='' className='option-img' />
                                                        <label htmlFor="bank_transfer">Thanh toán qua tài khoản ngân hàng</label>
                                                    </span>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="payment-last">
                                <div className="left-content">
                                    <textarea name="" id="" placeholder='Nhập ghi chú gửi đến cửa hàng'></textarea>
                                </div>

                                <div className="right-content">
                                    <div className="right-field">
                                        <span className="payment-title">Tổng tiền hàng</span>
                                        <span>{ totalPrice }<span className='unit'>đ</span></span>
                                    </div>
                                    <div className="right-field">
                                        <span className="payment-title">Phí tiền vận chuyển</span>
                                        <span>0<span className='unit'>đ</span></span>
                                    </div>
                                    <div className="right-field">
                                        <span className="payment-title">Tổng voucher giảm giá</span>
                                        <span>0<span className='unit'>đ</span></span>
                                    </div>

                                    <div className="right-field total">
                                        <span className="payment-title">Tổng tiền</span>
                                        <span className='payment-total'>{ totalPrice } <span className='unit'>đ</span></span>
                                    </div>

                                    <div className='btn-payment'>
                                        <button type='submit'>Mua Hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>  
            </div>
        </div>
    );
}

export default Order;
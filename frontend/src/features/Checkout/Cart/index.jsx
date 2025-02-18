import React, { useEffect, useState } from 'react';
import './styles.scss';
import '../../../styles/_container.scss';
import QuantitySelector from '../../../components/QuantitySelector';
import OptionSelector from '../../../components/OptionSelector';
import Trash from '../../../components/icons/Trash';
import { API_URL } from '../../../constants/config';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { CartService } from '../../../services';
import { formatCurrency } from '../../../utils/priceUtils';

import Close from '../../../components/icons/Close';

import { Home3 } from '../../../components/icons/Home';

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    console.log(cartProducts);

    useEffect(() => {
        const loadCart = async() => {
            try {
                const { cart, products, totalPrice } = await CartService.fetchCart();
                setCart(cart);
                setCartProducts(products);
                setTotalPrice(totalPrice);
            } catch (error) {
                console.log(error.response);
            }
        }

        loadCart();
    }, []);

    const hadleChangeTotal = async(cartProductId, newTotal) => {
        const cartProduct = cartProducts.find(p => p.id === cartProductId);
        if (cartProduct && cartProduct.quantity !== newTotal) {
            try {
                await CartService.updateCartProduct(cartProductId, { quantity: newTotal });
                
                const updatedProducts = cartProducts.map(cartProduct => 
                    cartProduct.id === cartProductId 
                    ? {...cartProduct, quantity: newTotal, totalPrice: cartProduct.price * newTotal }
                    : cartProduct
                );
    
                setCartProducts(updatedProducts);
    
                const newTotalPrice = updatedProducts.reduce((sum, cartProduct) => sum + cartProduct.totalPrice, 0); 
                setTotalPrice(newTotalPrice);
            } catch (error) {
                console.error("Failed to update quantity", error);
            }
        }
    };  

    const handleDeleteCartProduct = async(cartProductId) => {
        try {
            await CartService.deleteCartProduct(cartProductId);

            const updatedProducts = cartProducts.filter(cartProduct => cartProduct.id !== cartProductId);
            setCartProducts(updatedProducts);

            const newTotalPrice = updatedProducts.reduce((sum, cartProduct) => sum + cartProduct.totalPrice, 0);
            setTotalPrice(newTotalPrice);

            // dispatch(removeItem());
        } catch (error) {
            console.log(error);
        }
    }

    const [colorSelected, setColorSelected] = useState(0);

    const handleToggleColor = (value, option) => {
        setColorSelected(option.value);
    };

    const handleBuy = () => {
        if (cartProducts.length === 0 ) {
            alert('Bạn chưa có sản phẩm nào trong giỏ hàng');
            return;
        }

        navigate('/checkout/order');
    }

    return (
        <div className="cart">
            <div className="path">
                <ol>
                    <li>
                        <Home3 />
                        <span>Home</span>
                    </li>
                    <li>
                        Giỏ Hàng
                    </li>
                </ol>
            </div>

            <div className="checkout-step">
                <ol className='step'>
                    <li className='selected'>1. Giỏ Hàng</li>
                    <li>2. Xác Nhận Đặt Hàng</li>
                    <li>3. Hoàn Tất Đặt Hàng</li>
                </ol>
            </div>

            <div className="cart-container">
                <div className="cart-products">
                    
                </div>

                <div className="cart-total"></div>
            </div>            
            {cartProducts && cartProducts.map((cartProduct, index) => (
                <div 
                    key={index} 
                    className="cart-group-section"
                >
                    <div className="cart-group-section__content">
                        <div className="cart-product-infor-form">
                            <div className="product-infor-thumbnail">
                                <div className="product-infor-thumbnail__img">
                                    <img src={`${API_URL}/storage/${cartProduct.imgPath}`} alt="" />
                                </div>

                                <div className="product-infor-thumbnail__content">
                                    <div className="product-infor-detail">
                                        <h3 className="product-infor-detail__title">{cartProduct.name}</h3>
                                        <div className="product-infor-detail__option">

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => handleDeleteCartProduct(cartProduct.id)}
                                className='delete-product-item'
                            >
                                <Close />
                            </button>
                        </div>

                        <div className="cart-product-infor-price">
                            <QuantitySelector 
                                cartProductId={cartProduct.id}
                                value={cartProduct.quantity}
                                onChange={hadleChangeTotal}
                            />
                            <div className="cart-product-infor-price__price">
                                { formatCurrency(cartProduct.price) }
                            </div>
                        </div>

                        <div className="cart-prorduct-payment">
                            <div className="cart-prorduct-payment__totalprice">
                                { formatCurrency(cartProduct.totalPrice) }
                            </div>

                            <div className="cart-prorduct-payment__checkout">
                                <button>Mua</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {
                (!cart || !cartProducts || cartProducts.length === 0) &&
                <div className="p-item not-found">
                    <div className="notfound-img">
                        <img src="/images/no-results.png" alt="" />
                    </div>
                    <span>Chưa có sản phẩm</span>
                </div>
            }

            { 
                (cart && cartProducts && cartProducts.length > 0) &&
                <div className="cart-payment">
                    <div className="left-content">
                        <div className="discount-wr">
                            <input type="text" placeholder='Nhập mã giảm giá'/>
                            <button>Kiểm tra</button>
                        </div>
                    </div>

                    <div className="right-content">
                        <div className="price">
                            <span className='price-title'>Tổng tiền hàng</span>
                            <span>
                                {totalPrice}
                                <span style={{textDecoration: 'underline'}}>đ</span>
                            </span>
                        </div>

                        <div className="price">
                            <span className='price-title'>Mã giảm giá</span>
                            <span>
                                - 0
                                <span style={{textDecoration: 'underline'}}>đ</span>
                            </span>
                        </div>

                        <div className="total">
                            <span>Tổng tiền thanh toán</span>
                            <span className='total-value'>
                                { totalPrice }
                                <span style={{textDecoration: 'underline'}}> đ</span>
                            </span>
                        </div>

                        <div className='checkout'>
                            <button onClick={handleBuy}>Mua Hàng</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Cart;
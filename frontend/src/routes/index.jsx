import React from 'react';
import { useRoutes } from 'react-router-dom';
import { path } from './path';

import Login from '../features/Auth/Login';
import SignUp from '../features/Auth/SignUp';
import Main from '../features/Main';
import Profile from '../features/MyPage/Profile';
import Email from '../features/MyPage/Email';
import Address from '../features/MyPage/Address';
import Addresses from '../features/MyPage/Address/Addresses';
import AddressForm from '../features/MyPage/Address/AddressForm';
import Product from '../features/Product';
import Products from '../features/Product/Products';
import ProductDetail from '../features/Product/ProductDetail';
import Checkout from '../features/Checkout';
import CheckoutCart from '../features/Checkout/Cart';
import CheckoutOrder from '../features/Checkout/Order';
import CheckoutPayment from '../features/Checkout/Payment';
import Order from '../features/MyPage/Order';
import Orders from '../features/MyPage/Order/Orders';
import OrderDetail from '../features/MyPage/Order/OrderDetail';
import MyPage from '../features/MyPage';
import MyPageMain from '../features/MyPage/Main';

const Routes = () => {
    return useRoutes([
        {
            path: path.login,
            element: <Login />
        },
        {
            path: path.signUp,
            element: <SignUp />
        },
        {
            path: path.main,
            element: <Main />
        },
        {
            path: path.my,
            element: <MyPage />,
            children: [
                { index: true, element: <MyPageMain /> },
                { path: path.profile, element: <Profile /> },
                { path: path.email, element: <Email /> },
                // Name
                // Phone
                // Gender
                // ...
                { 
                    path: path.address, 
                    element: <Address />,
                    children: [
                        { index: true, element: <Addresses /> },
                        { path: path.addressCreate, element: <AddressForm /> },
                        { path: path.addressUpdate, element: <AddressForm /> }
                    ]
                },
                {
                    path: path.order,
                    element: <Order />,
                    children: [
                        { path: path.orderList, element: <Orders /> },
                        { path: path.orderDetail, element: <OrderDetail /> }
                    ]
                }
            ]
        },
        {
            path: path.product, 
            element: <Product />, 
            children: [
                { path: path.productList, element: <Products /> },
                { path: path.productDetai, element: <ProductDetail /> },
            ]
        },
        {
            path: path.checkout, 
            element: <Checkout />,
            children: [
                { path: path.checkoutCart, element: <CheckoutCart /> },
                { path: path.checkoutOrder, element: <CheckoutOrder /> },
                { path: path.checkoutPayment, element: <CheckoutPayment /> }
            ]
        },
    ]);
};

export default Routes;
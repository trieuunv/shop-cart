import React from 'react';
import { useRoutes } from 'react-router-dom';

import { path } from './path';
import Login from '../features/Admin/Login';
import Main from '../features/Main';
import Customers from '../features/Main/Customers';
import Dashboard from '../features/Main/Dashboard';
import Banner from '../features/Main/Banner';
import Order from '../features/Main/Order';
import Orders from '../features/Main/Order/Orders';
import AdminOrderDetail from '../features/Main/Order/OrderDetail';
import AdminProduct from '../features/Main/Product';
import AdminProducts from '../features/Main/Product/Products';
import AdminProductForm from '../features/Main/Product/ProductForm';
import AdminCategory from '../features/Main/Category';
import AdminCategories from '../features/Main/Category/Categories';
import AdminCategoryForm from '../features/Main/Category/CategoryForm';
import AdminPayment from '../features/Main/Payment';
import AdminPayments from '../features/Main/Payment/Payments';
import Statistical from '../features/Main/Statistical';
import AdminPaymentDetail from '../features/Main/Payment/PaymentDetail';

const Routes = () => {
    return useRoutes([
        {
            path: path.admin,
            element: <Admin />,
            children: [
                { path: path.login, element: <AdminLogin /> },
                { 
                    path: path.adMain, 
                    element: <AdminMain />,
                    children: [
                        { path: path.adCustomers, element: <Customers /> },
                        { 
                            path: path.adDashboard, 
                            element: <Dashboard />,
                        },
                        { path: path.adBanner, element: <AdminBanner /> },
                        { 
                            path: path.adOrder, 
                            element: <AdminOrder />, 
                            children: [
                                { path: path.adOrders, element: <AdminOrders /> },
                                { path: path.adOrderDetail, element: <AdminOrderDetail /> }
                            ]
                        },
                        {
                            path: path.adProduct, 
                            element: <AdminProduct />,
                            children: [
                                { path: path.adProducts, element: <AdminProducts /> },
                                { path: path.adProductCreate, element: <AdminProductForm /> },
                                { path: path.adProductEdit, element: <AdminProductForm /> },
                            ] 
                        },
                        {
                            path: path.adCategory,
                            element: <AdminCategory />,
                            children: [
                                { path: path.adCategories, element: <AdminCategories /> },
                                { path: path.adCategoryCreate, element: <AdminCategoryForm /> },
                            ]
                        },
                        {
                            path: path.adPayment, element: <AdminPayment />, 
                            children: [
                                { path: path.adPayments, element: <AdminPayments /> },
                                { path: path.adPaymentEdit, element: <AdminPaymentDetail /> }
                            ]
                        },
                        { path: path.adStatistical, element: <Statistical /> }
                    ]
                }
            ]
        },
    ]);
};

export default Routes;
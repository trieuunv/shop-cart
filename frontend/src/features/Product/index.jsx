import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from '../../components/Header';

const Product = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default Product;
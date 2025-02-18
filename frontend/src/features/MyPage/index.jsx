import React from 'react';
import './styles.scss';
import '../../styles/_layout.scss';
import '../../styles/_container.scss';

import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const MyPage = () => {
    return (
        <div className="my-page">
            <Header />
            <div className="my-wrapper">
                <div className="my-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MyPage;
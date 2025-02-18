import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

import User from '../../../components/icons/User';
import { IconList } from '../../../components/icons/IconList';
import { IconLocationPin } from '../../../components/icons/IconLocationPin';

const Main = () => {
    return (
        <div className='main-container'>
            <ul className="main-menu-list">
                <li className="main-menu-item">
                    <Link to={'/my/profile'} >
                        <User className="main-menu-item__icon" />
                        Thông Tin Tài Khoản
                    </Link>
                </li>

                <li className="main-menu-item">
                    <Link to={''} >
                        <IconLocationPin className="main-menu-item__icon" />
                        Địa Chỉ
                    </Link>
                </li>

                <li className="main-menu-item">
                    <Link to={''} >
                        <IconList className="main-menu-item__icon" />
                        Đơn Hàng
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Main;
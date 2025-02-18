import React, { useEffect, useState } from 'react';
import './styles.scss';

import User from '../icons/User';
import Shop from '../icons/Shop';
import Search from '../icons/Search';
import MenuIcon from '../icons/Menu';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/ModalContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../constants/config';
import { setAuthenticated } from '../../store/slices/authSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userMenu, setUserMenu] = useState(false);
    const count = useSelector((state) => state.cart.totalItems);
    const authenticated = useSelector((state) => state.auth.authenticated);

    const { openModal } = useModal();

    const userDropdown = classNames({
        'user-dropdown': true,
        'show': userMenu ? true : false
    });

    const handleOpenSearch = () => {
        openModal('loginModal');
    }

    const handleClickAccount = (e) => {
        if (authenticated) {
            navigate('/account/profile');
        } else {
            e.preventDefault();
            openModal('loginModal');
        }
    }

    const handleLogout = async(e) => {
        e.preventDefault();

        try {
            await axios.post(`${API_URL}/logout`, {}, {
                withCredentials: true
            });

            dispatch(setAuthenticated(false));

            window.location.href = '/';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='header'>
            <div className="top-banner">

            </div>

            <div className='wide'>
                <div className='header-wr'>
                    <div className='logo'>
                        <a href="/">
                            <img src="/images/logo.png" alt="" />
                        </a>
                    </div>

                    <div className="category">
                        <ul className="category-list">
                            <li className='category-item'>
                                <a href="/product/all">Tất Cả</a>
                            </li>

                            <li className='category-item'>
                                <a href="/product/new">Mới</a>
                            </li>

                            <li className='category-item'>
                                <a href="/product/trousers">Quần</a>
                            </li>

                            <li className='category-item'>
                                <a href="/product/shirt">Áo nam</a>
                            </li>
                        </ul>
                    </div>

                    <div className='header-gnb'>
                        <ul>
                            <li className='gnb-item menu'>
                                <a href="">
                                    <MenuIcon className='icon'/>
                                </a>
                            </li>

                            <li 
                                className='gnb-item'
                                onMouseEnter={() => setUserMenu(true)}
                                onMouseLeave={() => setUserMenu(false)}
                            >
                                <Link to={authenticated ? '/account/profile' : '/user/login'} onClick={handleClickAccount}>
                                    <User className='icon'/>
                                </Link>

                                <ul className={userDropdown}>
                                    <ul>
                                        <li>
                                            <a href={authenticated ? '/account/profile' : '/user/login'} onClick={handleClickAccount} >Tài khoản</a>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <a href={authenticated ? '/order' : '/user/login'} onClick={handleClickAccount} >Đơn mua</a>
                                        </li>
                                    </ul>
                                    { authenticated && 
                                        <ul>
                                            <li>
                                                <Link to="/" onClick={handleLogout}>Đăng xuất</Link>
                                            </li>
                                        </ul> 
                                    }
                                </ul>
                            </li>

                            <li className='gnb-item'>
                                <a href="/checkout/cart">
                                    <Shop className='icon'/>
                                    <span className='basket-count'>{count}</span>
                                </a>
                            </li>

                            <li className='gnb-item'>
                                <a href="#n" onClick={handleOpenSearch}>
                                    <Search className='icon'/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
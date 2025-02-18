import React from 'react';
import './styles.scss';
import Dashboard from '../../../components/icons/Dashboard';
import Shop from '../../../components/icons/Shop';
import Group from '../../../components/icons/Group';
import { Link, Outlet } from 'react-router-dom';
import ProductIcon from '../../../components/icons/Product';
import IconCategory from '../../../components/icons/Category';
import Payment from '../../../components/icons/Payment';
import BubbleChart from '../../../components/icons/BubbleChart';

const AdminMain = () => {

    return (
        <div className='admin'>
            <div className="admin-wr">
                <div className="ad-sidebar">
                    <div className="sb-logo">
                        <img src="/images/logo.png" alt="" />
                    </div>

                    <div className="sb-menu">
                        <div className="menu-list">
                            <Link  
                                className="menu-item"
                                to='dashboard'
                            >
                                <div className="item-icon">
                                    <Dashboard />
                                </div>

                                <div className="item-name">
                                    Bảng điều khiển
                                </div>
                            </Link>

                            <Link 
                                className="menu-item"
                                to='order'
                            >
                                <div className="item-icon">
                                    <Shop />
                                </div>

                                <div className="item-name">
                                    Đơn hàng
                                </div>
                            </Link>

                            <Link 
                                className="menu-item"
                                to='customer'
                            >
                                <div className="item-icon">
                                    <Group />
                                </div>

                                <div className="item-name">
                                    Khách hàng
                                </div>
                            </Link>

                            <Link 
                                className="menu-item"
                                to='product'
                            >
                                <div className="item-icon">
                                    <ProductIcon width={'26px'} height={'26px'}/>
                                </div>

                                <div className="item-name">
                                    Sản phẩm
                                </div>
                            </Link>

                            <Link
                                className="menu-item"
                                to='category'
                            >
                                <div className="item-icon">
                                    <IconCategory width={'26px'} height={'26px'}/>
                                </div>

                                <div className="item-name">
                                    Phân loại
                                </div>
                            </Link>

                            <Link
                                className="menu-item"
                                to='payment'
                            >
                                <div className="item-icon">
                                    <Payment width={'26px'} height={'26px'}/>
                                </div>

                                <div className="item-name">
                                    Thanh toán
                                </div>
                            </Link>

                            <Link
                                className="menu-item"
                                to='statistical'
                            >
                                <div className="item-icon">
                                    <BubbleChart  width={'26px'} height={'26px'}/>
                                </div>

                                <div className="item-name">
                                    Thống kê
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="detail-wr">
                    <div className="detail-header">
                        <span className='option-name'>Bảng điều khiển</span>
                    </div>

                    <div className="detail-contents">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMain;
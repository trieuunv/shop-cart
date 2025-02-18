import React, { useEffect, useState } from 'react';
import './styles.scss';
import Title from '../../components/Title';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../../../services/api/orderApi';

const getStatus = (status) => {
    switch (status) {
        case 'pending':
            return 'Chờ Xác Nhận';
        case 'confirmed':
            return 'Đã Xác Nhận';
        case 'processed':
            return 'Đang Xử Lí';
        case 'shipped':
            return 'Chờ Giao Hàng';
        case 'delivered':
            return 'Giao Hàng Thành Công';
        default:
            return '';
    }
};

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadOrders = async() => {
            setLoading(true);
            try {
                const { orders } = await fetchOrders();
                setOrders(orders);
                setFilteredOrders(orders);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadOrders();
    }, []);

    const handleDetail = (orderId) => {
        navigate(`detail/${orderId}`);
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        
        setSearchTerm(term);

        const filtered = orders.filter(order => 
            order.orderCode.toLowerCase().includes(term.toLowerCase()) || 
            order.user.profile.name.toLowerCase().includes(term.toLowerCase())
        );
        
        setFilteredOrders(filtered);
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'code',
            key: 'id',
        },

        {
            title: 'Khách hàng',
            dataIndex: ['user', 'profile', 'name'],
            key: 'name',
        },

        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount', 
            key: 'totalPrice',
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            render: (price) => `${price.toLocaleString()} VNĐ`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span>{getStatus(status)}</span>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => new Date(date).toLocaleDateString(), 
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button 
                        className='detail-btn'
                        onClick={() => handleDetail(record.id)}
                    >
                        Chi tiết
                    </Button>
                </div>
            )
        },
    ];
    
    return (
        <div className='orders-wr'>
            <Title 
                onChange={handleSearch}
                name={'Danh sách đơn hàng'}
            />
            
            <Table 
                columns={columns}
                dataSource={filteredOrders}
                rowKey='id'
            />
        </div>
    );
};

export default Orders;
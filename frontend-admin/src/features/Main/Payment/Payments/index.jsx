import React, { useEffect, useState } from 'react';
import './styles.scss';

import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchPayments } from '../../../../../services/api/paymentApi';
import { confirmPayment } from '../../../../../services/api/orderApi';

const Payments = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);

    useEffect(() => {
        const loadPayments = async() => {
            try {
                const { payments } = await fetchPayments();
                setPayments(payments);
                setFilteredPayments(payments);
                console.log(payments);
            } catch (error) {
                console.log(error.response);
            }
        }

        loadPayments();
    }, []); 

    console.log(payments);

    const handleStatusChange = (e) => {
        const status = e.target.value;

        if (status === '') {
            setFilteredPayments(payments);
        } else {
            const filtered = payments.filter(payment => payment.status === status);
            setFilteredPayments(filtered);
        }
    };
    
    const handleDetail = (orderId) => {
        navigate(`/admin/order/detail/${orderId}`);
    }

    const handleConfirm = async(orderId) => {
        try {
            await confirmPayment(orderId);

            const updatedPayments = payments.map(payment => {
                if (payment.orderId === orderId) {
                    return { ...payment, status: 'confirmed' };
                }
                return payment;
            });

            setPayments(updatedPayments);
            setFilteredPayments(updatedPayments);

            alert('Xác nhận thanh toán thành công.');
        } catch (error) {
            console.log(error.response);
        }
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Ngày thanh toán',
            dataIndex: 'date', 
            key: 'date',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'method',
            key: 'method',
            render: (text, record) => {
                switch (record.method) {
                    case 'cash_on_delivery':
                        return <span>Trực tiếp</span>;
                    case 'bank_transfer':
                        return <span style={{ color: 'green' }}>Ngân hàng</span>;
                    default:
                        return <span>{text}</span>;
                }
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                switch (record.status) {
                    case 'pending':
                        return <span style={{ color: 'orange' }}>Chưa thanh toán</span>;
                    case 'confirmed':
                        return <span style={{ color: 'green' }}>Đã xác nhận</span>;
                    case 'waiting_for_confirmation':
                        return <span style={{ color: 'gray' }}>Đang chờ xác nhận</span>;
                    case 'refused':
                        return <span style={{ color: 'red' }}>Đã từ chối</span>;
                    default:
                        return <span>{text}</span>;
                }
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Mã thanh toán',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => handleDetail(record.orderId)}>Chi tiết</Button> 
                    <Button onClick={() => handleConfirm(record.orderId)}>Xác nhận</Button>
                </div>
            )
        },
    ];

    return (
        <div className='payment-list'>
            <div className="payment-title">
                <span>Danh sách thanh toán</span>
                <select 
                    name="" 
                    id=""
                    style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                    onChange={handleStatusChange}
                >
                    <option value="">Tất cả</option>
                    <option value="pending">Chưa thanh toán</option>
                    <option value="waiting_for_confirmation">Đang xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="refused">Đã từ chối</option>
                </select>
            </div>

            <Table 
                columns={columns}
                dataSource={filteredPayments}
                rowKey='id'
            />
        </div>
    );
};

export default Payments;
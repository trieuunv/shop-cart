import React from 'react';
import { Steps } from 'antd';
import { ShoppingCartOutlined, SolutionOutlined, CarOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Step } = Steps;

const OrderHistory = ({ history }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    const getStatusDescription = (status) => {
        switch (status) {
            case 'pending':
                return 'Đơn Hàng Được Đặt';
            case 'confirmed':
                return 'Xác Nhận Đơn Hàng';
            case 'shipped':
                return 'Chờ Giao Hàng';
            case 'delivered':
                return 'Giao Hàng Thành Công';
            default:
                return '';
        }
    };

    const getStatusDate = (status) => {
        const orderStatus = history.find(item => item.status === status);
        return orderStatus ? formatDate(orderStatus.date) : '';
    }

    const steps = [
        {
            title: getStatusDescription('pending'),
            description: getStatusDate('pending'),
            icon: <ShoppingCartOutlined />,
        },
        {
            title: getStatusDescription('confirmed'),
            description: getStatusDate('confirmed'),
            icon: <SolutionOutlined />,
        },
        {
            title: getStatusDescription('shipped'),
            description: getStatusDate('shipped'),
            icon: <CarOutlined />,
        },
        {
            title: getStatusDescription('delivered'),
            description: getStatusDate('delivered'),
            icon: <CheckCircleOutlined />,
        },
    ];

    return (
        <div>
            <Steps current={history.length - 1}>
                {steps.map((step, index) => (
                    <Step
                        key={index}
                        title={step.title}
                        description={step.description}
                        icon={step.icon}
                    />
                ))}
            </Steps>
        </div>
    );
};

export default OrderHistory;

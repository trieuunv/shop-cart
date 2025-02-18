import React, { useEffect, useState } from 'react';
import './styles.scss';

import { useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../../utils/priceUtils';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { isValidateImageFile } from '../../../utils/fileUpload';
import { OrderService } from '../../../services';

const { Dragger } = Upload;

const Payment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [bank, setBank] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [payment, setPayment] = useState(null);
    
    const [imagePreview, setImagePreview] = useState(null);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            file: null,
        }
    });

    const onSubmit = async(data) => {
        if (data && data.file) {
            try {
                await OrderService.confirmPayment(order.id, { file: data.file });

                alert('Thanh toán thành công.');
                navigate(`/order/detail/${order.id}`);  
            } catch (error) {
                alert('Lỗi khi gửi ảnh, thử lại sau.');
                console.log(error.response);
            }
        } else {
            alert('Chưa có ảnh.');
        }
    }

    const beforeUpload = (file) => {
        if (!isValidateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    const handleUploadChange = (infor, field) => {
        const { file } = infor;

        const selectedFile = file.originFileObj || file;
        
        if (selectedFile) {
            field.onChange(selectedFile);

            const imageURL = URL.createObjectURL(selectedFile); 
            setImagePreview(imageURL);
        }
    };

    useEffect(() => {
        const loadPayment = async() => {
            try {
                const { bank, order, payment, qrCode } = await OrderService.fetchPayments(id);
               
                console.log(payment);

                setQrCode(qrCode);
                setBank(bank);
                setOrder(order);
                setPayment(payment);
            } catch (error) {
                console.log(error.response);
            }
        }

        loadPayment();
    }, []);

    return (
        <div className="payment-wr">
            <div className="payment-left">
                <div className="payment-title">
                    Thanh Toán
                </div>

                { bank && 
                    <form className="payment-content" onSubmit={handleSubmit(onSubmit)}>
                        <div className="payment-field">
                            <span className='payment-field-title'>Tổng tiền hàng</span>
                            <span className='payment-field-value'>{formatCurrency(payment.totalAmount)}</span>
                        </div>
                        <div className="payment-field">
                            <span className='payment-field-title'>Số Tài Khoản</span>
                            <span className='payment-field-value'>{bank.bankCode}</span>
                        </div>
                        <div className="payment-field">
                            <span className='payment-field-title'>Tên tài khoản</span>
                            <span className='payment-field-value'>{bank.accountName}</span>
                        </div>
                        <div className="payment-field">
                            <span className='payment-field-title'>Nội dung chuyển khoản</span>
                            <span className='payment-field-value'>{payment.code}</span>
                        </div>

                        <div className="file-upload">
                            <Controller 
                                name='file'
                                control={control}
                                render={({ field }) => (
                                    <Dragger
                                        onChange={(infor) => handleUploadChange(infor, field)}
                                        accept='image/*'
                                        beforeUpload={beforeUpload}
                                        maxCount={1}
                                    >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Kéo và thả hình ảnh vào đây hoặc click để chọn ảnh</p>
                                        <p className="ant-upload-hint">Chỉ hỗ trợ file hình ảnh.</p>
                                    </Dragger> 
                                )}
                            />

                            {imagePreview && ( 
                                <div className="image-preview"> 
                                    <img src={imagePreview} alt="Preview" /> 
                                </div> 
                            )}   
                        </div>

                        <div className="btn-submit">
                            <button type='submit'>Xác nhận</button>
                        </div>
                    </form>
                }
            </div>

            <div className="line-center"></div>

            <div className="payment-right">
                { qrCode && 
                    <div className='qrcode'> 
                        <img src={qrCode} alt="QR Code" /> 
                    </div> 
                }
            </div>
        </div>
    );
};

export default Payment;
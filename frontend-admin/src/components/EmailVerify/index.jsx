import React from 'react';
import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import './styles.scss';
import Close from '../icons/Close';
import axios from 'axios';
import { API_URL } from '../../constants/config';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/api/emailApi';

const EmailVerify = ({show, onClose, userId}) => {
    const navigate = useNavigate();

    const { handleSubmit, watch, trigger, control } = useForm({
        defaultValues: {
            code: '',
        }
    });

    const onSubmit = async(data) => {
        if (data && data.code) {
            try {
                await verifyEmail({ code: data.code });
                
                onClose();
                // navigate('/');
            } catch (error) {
                console.log(error);
                alert('Mã xác nhận không hợp lệ.');
            }
        }
    }

    return (
        <div className={classNames('email-verify-popup', { 'show' : show })}>
            <div className="email-verify-container">
                <span className='email-verify-close' onClick={onClose}>
                    <Close width="20px" height="20px" />
                </span>

                <form action="" className='email-verify-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="verify-title">Xác minh Email</div>
                    <div className='verify-desc'>
                        Vui lòng nhập mã xác nhận gửi đến email của bạn.
                    </div>

                    <div className="verify-field">
                        <Controller 
                            name='code'
                            control={control}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    type="text" 
                                    required
                                    placeholder='XXXXXX'
                                />
                            )}
                        />
                    </div>

                    <div className="btn-submit">
                        <button type='submit'>Gửi</button>
                        <button className='btn-cancel'>Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmailVerify;
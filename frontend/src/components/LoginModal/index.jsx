import React, { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { Controller, useForm } from "react-hook-form";
import './styles.scss';
import { Input } from 'antd';
import Password from 'antd/es/input/Password';
import Close from '../icons/Close';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { MESSAGE } from '../../constants/config';

const LoginModal = () => {
    const modalName = 'loginModal';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { closeModal, isOpen } = useModal();
    const [isFocusUsername, setIsFocusUsername] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const error = useSelector(state => state.auth.error);

    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });
    
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(modalName);
        }
    }

    const handleClosePopup = () => {
        closeModal(modalName);
    }

    const onSubmit = async(data) => {
        const { username, password } = data;
        if (username && password) {
            try {
                await dispatch(login(data)).unwrap();
                handleClosePopup();
            } catch (error) {
                if (error.status === 401) {
                    alert(MESSAGE.ERROR.INVALID_CREDENTIALS);
                } else {
                    alert(MESSAGE.ERROR.NETWORK_ERROR);
                }
            }
        }
    };

    return (
        <div className={`modal ${isOpen(modalName) ? 'show' : ''}`} onClick={handleOutsideClick}>
            <div className='login-container'>
                <span className='login-popup-close' onClick={handleClosePopup}>
                    <Close width="20px" height="20px" />
                </span>
                
                <form 
                    className="login-popup-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="form-title">
                        Đăng Nhập
                    </div>

                    <div className="form-desc">
                        Chào mừng bạn quay trở lại! Hãy đăng nhập để tiếp tục khám phá.
                    </div>

                    <div className="normal-login">
                        <div className="input-box">
                            { isFocusUsername && <label htmlFor="" className='input-title'>Tên đăng nhập</label> }
                            <Controller 
                                name='username'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        id='member-id'
                                        placeholder={!isFocusUsername ? ('Tên đăng nhập') : ('')} 
                                        onFocus={() => setIsFocusUsername(true)}
                                        onBlur={() => setIsFocusUsername(false)}
                                    />
                                )}
                            />
                            {errors.username && <p className="error">{errors.username.message}</p>}
                        </div>
                        <div className="input-box">


                            <div className="order-no"></div>    
                            <div className="passwd">
                                <Controller 
                                    name='password'
                                    control={control}
                                    render={({ field }) => (
                                        <Password 
                                            {...field}
                                            className='member-passwd'
                                            placeholder={!isFocusPassword ? ('Mật khẩu') : ('')} 
                                            onFocus={() => setIsFocusPassword(true)}
                                            onBlur={() => setIsFocusPassword(false)}
                                        />
                                    )}
                                />

                                { isFocusPassword && <label htmlFor="" className='input-title'>Mật khẩu</label> }
                                
                            </div>
                        </div>   

                        <div className="login-checkbox"></div>

                        <button className="login-btn" type='submit'>
                            Đăng nhập
                        </button>

                        <div className="util-menu">
                            <Link to={'/user/register'} onClick={handleClosePopup}>Đăng kí</Link>
                            <a href="">Quên mật khẩu</a>  
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;

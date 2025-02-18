import React, { useState } from 'react';
import './styles.scss';
import { Input } from 'antd';
import { Controller, useForm } from "react-hook-form";
import axios from 'axios';
import Loading from '../../../components/Loading';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import '../../../styles/common.scss';

const { Password } = Input;

const Login = () => {
    const navigate = useNavigate();

    const [isFocusUsername, setIsFocusUsername] = useState(false);
    const [isFocusPassword, setIsFocusPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const handlelogin = async (data) => {
        const {username, password} = data;

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username,
                password
            }, {
                withCredentials: true
            });

            console.log(response.data);
            navigate('/');

        } catch (error) {
            console.log(error);

            if (error.response && error.response.status === 401) {
                alert('Tên đăng nhập hoặc mật khẩu không đúng.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit = (data) => {
        const { username, password } = data;
        if (username && password) {
            handlelogin(data);
        } else {
            
        }
    }

    const { handleSubmit, formState: { errors }, control } = useForm();

    return (
        <div className='login-container'>
            <Header />
            {isLoading && <Loading /> }

            <div className="warp">
                <div className="login-section">
                    <div className="contents">
                        <span className='title'>Đăng Nhập Tài Khoản</span>
                    </div>

                    <div className="contents member-login">
                        <div className="form-wrap">
                            <form className="member-form" onSubmit={handleSubmit(onSubmit)}>
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
                                        <a href="">Quên mật khẩu</a>
                                            
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
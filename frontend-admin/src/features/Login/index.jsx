import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { login } from '../../../services/api/authApi';
import { MESSAGE } from '../../../constants/config';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../../../services';
import './styles.scss';

const Login = () => {
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        try {
            const { token } = await login(data); 
            LocalStorageService.set(LocalStorageService.OAUTH_TOKEN, token);
            navigate('/admin');
        } catch (error) {
            console.log(error);
            alert(MESSAGE.ERROR.INVALID_CREDENTIALS);
        }
    }

    return (
        <div>
            <div className='admin-login'>
                <form onSubmit={handleSubmit(onSubmit)} className='admin-login-form'>
                    <h3>Đăng nhập</h3>
                    <Controller 
                        name='username'
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type='text'
                                placeholder={'Tên đăng nhập'} 
                            />
                        )}
                    />

                    <Controller 
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type='password'
                                placeholder={'Mật khẩu'} 
                            />
                        )}
                    />  

                    <button type='submit'>Đăng nhập</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
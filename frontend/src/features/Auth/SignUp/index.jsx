import React, { useState } from 'react';
import './styles.scss';
import Header from '../../../components/Header'
import { useForm, Controller } from 'react-hook-form';
import _ from 'lodash';
import EmailVerify from '../../../components/EmailVerify';
import Loading from '../../../components/Loading';
import { validateEmail, validatePhoneNumber } from '../../../utils/fieldUtils';
import { register } from '../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AuthService } from '../../../services';

const SignUp = () => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [showEmailVerify, setShowEmailVerify] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChecked = (event) => {
        setIsChecked(event.target.checked);
    };

    const { control, handleSubmit, watch, trigger, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
            name: '',
            email: '',
            phoneFirst: '',
            phoneMid: '',
            phoneLast: '',
        }
    });

    const validatePasswordMatch = (value) => { 
        const password = watch('password'); 
        if (password !== value) { 
            return 'Mật khẩu xác nhận không khớp'; 
        } 
        return true; 
    };

    const validateUsername = async() => {
        const username = watch('username');

        if (username && username.length < 4) {
            return "Tên đăng nhập tối thiểu 4 kí tự.";
        }

        if (username) {
            try {
                const { isAvailable } = await AuthService.checkUsername({ username });
                if (!isAvailable) {
                    return `${username} không khả dụng.`;
                }

                return true;
            } catch (error) {
                console.log(error);
                return "Đã xảy ra lỗi khi kiểm tra tên đăng nhập. Vui lòng thử lại sau.";
            }
        }

        return true;
    } 

    const onSubmit = async(data) => {
        const phoneNumber = `${data.phoneFirst}${data.phoneMid}${data.phoneLast}`;

        const registerForm =  _.mapKeys({
            username: data.username,
            password: data.password,
            name: data.name,
            email: data.email,
            phoneNumber,
            }, (value, key) => _.snakeCase(key)
        );

        setLoading(true);

        try {
            await dispatch(register(registerForm)).unwrap();
            
            setShowEmailVerify(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleCloseEmailVerify = () => {
        setShowEmailVerify(false);
    }

    return (
        <div className='wrap'>
            { loading && <Loading /> }
            <Header />
            <EmailVerify 
                show={showEmailVerify} 
                onClose={handleCloseEmailVerify}
                userId={user?.id}
            />
            <div className="register-wr">
                <div className="title">
                    <span className='title-content'>Đăng kí thành viên</span>
                    <span className='register-desc'>Trải nghiệm mua sắm tiện lợi hơn khi lưu thông tin giao hàng và thanh toán của bạn.</span>
                </div>

                <form action="" id='register-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-block">
                        <p className='title-field'>Tên đăng nhập *</p>
                        <div className='input-field'>
                            <Controller 
                                name='username'
                                control={control}
                                rules={{ validate: validateUsername }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text" 
                                        required
                                        onBlur={() => trigger("username")}
                                    />
                                )}
                            />

                            <div className="desc">
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>

                            {errors.username && <p className="error">{errors.username.message}</p>}
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Mật khẩu *</p>
                        <div className='input-field'>
                            <Controller 
                                name='password'
                                control={control}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="password"
                                        required 
                                    />
                                )}
                            />
                            <div className="desc">
                                <span>(Kết hợp hai hoặc nhiều chữ hoa và chữ thường/số/ký tự đặc biệt, 10 đến 16 ký tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Xác minh mật khẩu *</p>
                        <div className='input-field'>
                            <Controller 
                                name='confirmPassword'
                                control={control}
                                rules={{
                                    validate: validatePasswordMatch
                                }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="password"
                                        required 
                                        onBlur={() => trigger("confirmPassword")}
                                    />
                                )}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

                            <div className="desc">
                                <span className='pw-confirm-msg'></span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Tên *</p>
                        <div className='input-field'>
                            <Controller 
                                name='name'
                                control={control}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text"
                                        required 
                                    />
                                )}
                            />
                            <div className="desc">
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Điện thoại</p>
                        <div className='input-field tel-box'>
                            <Controller 
                                name='phoneFirst'
                                control={control}
                                rules={{ validate: validatePhoneNumber }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text"
                                        maxLength="3" 
                                        size="3" 
                                        placeholder='xxx'
                                        required 
                                        onBlur={() => trigger("phoneFirst")}
                                        className={errors.phoneFirst ? 'input-error' : ''}
                                    />
                                )}
                            />
                            <span>-</span>
                            <Controller 
                                name='phoneMid'
                                control={control}
                                rules={{ validate: validatePhoneNumber }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text"
                                        maxLength="3" 
                                        size="3" 
                                        placeholder='xxx'
                                        required 
                                        onBlur={() => trigger("phoneMid")}
                                        className={errors.phoneMid ? 'input-error' : ''}
                                    />
                                )}
                            />
                            <span>-</span>
                            <Controller 
                                name='phoneLast'
                                control={control}
                                rules={{ validate: value => /^[0-9]{4}$/.test(value) }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text"
                                        maxLength="4" 
                                        size="4" 
                                        placeholder='xxxx'
                                        required 
                                        onBlur={() => trigger("phoneLast")}
                                        className={errors.phoneLast ? 'input-error' : ''}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="form-block">
                        <p className='title-field'>Email *</p>
                        <div className='input-field'>
                            <Controller 
                                name='email'
                                control={control}
                                rules={{ validate: validateEmail }}
                                render={({ field }) => (
                                    <input 
                                        {...field}
                                        type="text"
                                        required 
                                        onBlur={() => trigger("email")}
                                        className={errors.email ? 'input-error' : ''}
                                    />
                                )}
                            />
                            <div className="desc">
                                <span>(Chữ cái viết thường, 4 đến 16 kí tự)</span>
                            </div>
                        </div>
                    </div>

                    <div className="agree-wr">
                        <div className="agree-title">
                            <input 
                                type="checkbox" 
                                id='agree_0' 
                                checked={isChecked}
                                onChange={handleChecked}
                                style={{
                                    backgroundImage: isChecked && 'url(/images/bg_checkbox_checked.png)'
                                }}
                            />
                            <label htmlFor="agree_0">Đồng ý</label>
                        </div>

                        <div className="agree-desc">
                            <span>
                                Tôi đồng ý với Điều khoản sử dụng, việc thu thập và sử dụng thông tin cá nhân cũng như nhận thông tin mua sắm.
                            </span>
                        </div>
                    </div>

                    <div className="btn">
                        <button type='submit'>Đăng Kí</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
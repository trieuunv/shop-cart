import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from "react-hook-form";

import DayOfBirthSelector from '../../../components/DateOfBirthSelector';
import GenderSelector from '../../../components/GenderSelector';
import ResultHandle from '../../../components/ResultHandle/inex';
import { isValidBirthDate } from '../../../utils/dateUtils';
import { MESSAGE } from '../../../constants/config';
import _ from 'lodash';
import { validateEmail } from '../../../utils/fieldUtils';
import { MyPageService } from '../../../services';
import { Avatar } from 'antd';
import { ChevronRight } from '../../../components/icons/ChevronRight';
import { Link } from 'react-router-dom';
///

import { IconDetail } from '../../../components/icons/IconDetail';

const Profile = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const [profile, setProfile] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);

    const { handleSubmit, control, setValue, formState: { errors }, trigger } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '', 
            phoneNumber: '',
            email: '',
            gender: '',
            dayOfBirth: '',
        }
    });

    const onSubmit = async(data) => {
        console.log(data);
        if (initialUserData) {
            const isUpdated = Object.keys(data).some((key) => data[key] !== initialUserData[key]);
            if (isUpdated) {
                try {
                    const { name, gender, dayOfBirth } = data;

                    const profileData = _.mapKeys({
                        name,
                        gender,
                        dayOfBirth
                        }, (value, key) => _.snakeCase(key)
                    );
                    
                    const isUpdated = await MyPageService.updateProfile(profileData);
    
                    if (isUpdated) {
                        alert(MESSAGE.SUCCESS.USER_PROFILE_UPDATED);
                    } else {
                        alert(MESSAGE.ERROR.USER_PROFILE_UPDATE_ERROR);
                    }
                } catch (error) {
                    setError(error.message);
                    alert(MESSAGE.ERROR.GENERAL_ERROR);
                }
            }
        }
    }

    useEffect(() => {
        const loadUser = async() => {
            try {
                const { profile } = await MyPageService.fetchUser();

                setProfile(profile);
                setInitialUserData(profile);

                const profileFields = ['name', 'phoneNumber', 'email', 'gender', 'dayOfBirth'];

                profileFields.forEach(field => {
                    setValue(field, profile?.[field] || '');
                });
            } catch (error) {
                
            }
        }

        loadUser();
    }, []);

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <div className="profile-container">
            <div className="profile-container-head">
                <div className="profile-container-head__title">
                    Thông Tin Tài Khoản
                </div>

                <div className="profile-container-head__describe">
                    Quản lý và cập nhật thông tin tài khoản của bạn một cách dễ dàng và an toàn.
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-field">
                    <div className="profile-field__title">
                        <span>Tên đầy đủ</span>
                    </div>

                    <div className="profile-field__input">
                        <input 
                            type="text"
                        />
                    </div>
                </div>

                <div className="profile-field">
                    <div className="profile-field__title">
                        <span>Giới tính</span>
                    </div>

                    <div className="profile-field__input">
                        <select
                            style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                        >
                            <option value="">Nam</option>
                            <option value="">Nữ</option>
                        </select>
                    </div>
                </div>

                <div className="profile-field">
                    <div className="profile-field__title">
                        <span>Ngày sinh</span>
                    </div>

                    <div className="profile-field__input">
                        <DayOfBirthSelector /> 
                    </div>
                </div>

                <div className="profile-field">
                    <div className="profile-field__title">
                        <span>Email</span>
                    </div>

                    <div className="profile-field__input">
                        <input 
                            type="text"
                        />
                    </div>
                </div>

                <div className="profile-field">
                    <div className="profile-field__title">
                        <span>Số điện thoại</span>
                    </div>

                    <div className="profile-field__input">
                        <input 
                            type="text"
                        />
                    </div>
                </div>
            </div>

            <div className="profile-action">
                <button className="profile-action__submit">Lưu hồ sơ</button>
            </div>
        </div>
    );
}

export default Profile;
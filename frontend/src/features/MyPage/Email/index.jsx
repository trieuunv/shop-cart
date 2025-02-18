import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { Controller, useForm } from "react-hook-form";

import DayOfBirthSelector from '../../../components/DateOfBirthSelector';
import GenderSelector from '../../../components/GenderSelector';
import ResultHandle from '../../../components/ResultHandle/inex';

const Email = () => {
    const [isSuccess, setIsSuccess] = useState(false);

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
    }

    useEffect(() => {
        /*
        const loadUser = async() => {
            try {
                const { profile } = await fetchUser();

                const profileFields = ['name', 'phoneNumber', 'email', 'gender', 'dayOfBirth'];

                profileFields.forEach(field => {
                    setValue(field, profile?.[field] || '');
                });
            } catch (error) {
                
            }
        }
            */

        // loadUser();
    }, []);

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <form className="email-content" onSubmit={handleSubmit(onSubmit)}>
            <ResultHandle 
                isSuccess={isSuccess}
                name='Thay đổi thành công' 
                onChange={() => setIsSuccess(false)} 
            /> 
            
            <div className="email-persional">
                <div className="email-title">
                    Địa chỉ Email
                </div>

                <div className="email-content">
                    <form action="" className='new-email-form'>
                        <input 
                            type="text" 
                            placeholder='Địa chỉ email mới'
                        />
                        <button>Tiếp theo</button>
                    </form>
                </div>
            </div>
        </form>
    );
}

export default Email;
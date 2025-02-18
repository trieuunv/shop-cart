import React, { useEffect, useState } from 'react';
import './styles.scss';
import Location from '../../../../components/Location';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MESSAGE } from '../../../../constants/config';
import { AddressService } from '../../../../services';
import _ from 'lodash';

const AddressForm = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { id } = useParams();

    const { handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            phoneNumber: '',
            address: {
                province: null,
                district: null,
                ward: null
            },
            detail: ''
        }
    });

    useEffect(() => {
        const loadAddress = async (addressId) => {
            try {
                setLoading(true);
                const data = await AddressService.fetchAddress(addressId);
                setAddress(data.address);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        } 
        
        if (id) {
            loadAddress(id);
        }
    }, [id]);

    useEffect(() => {
        setValue('name', address?.name || '');
        setValue('phoneNumber', address?.phoneNumber || '');
        setValue('location', 
            {
                province: address?.province,
                district: address?.district,
                ward: address?.ward,
            },
        );
        setValue('detail', address?.detail);
    }, [address, setValue]);

    const onSubmit = async (data) => {
        if (id && !address) {
            alert(MESSAGE.ERROR.VALIDATION_ERROR);
            return;
        }

        const { name, phoneNumber, location, detail} = data;

        const { province, district, ward } = location;

        const addressData = _.mapKeys({
            id: address?.id,
            name,
            phoneNumber,
            province,
            district,
            ward,
            detail,
            }, (value, key) => _.snakeCase(key)
        );
        
        try {
            const isUpdated = id 
                ? await AddressService.updateAddress(addressData) 
                : await AddressService.createAddress(addressData);
            if (isUpdated) {
                alert(MESSAGE.SUCCESS.ADDRESS_UPDATED);
                navigate('/account/address');
            } else {
                alert(MESSAGE.ERROR.ADDRESS_UPDATE_ERROR);
            }
        } catch (error) {
            setError(error.message);
            alert(MESSAGE.ERROR.GENERAL_ERROR);
        }
    }

    return (
        <div className='address-edit'>
            <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="address-title">Địa chỉ</div>

                <div className="edit-content">
                    <div className="edit-field">
                        <div className="edit-title">
                            <span>Họ & Tên</span>
                        </div>

                        <Controller 
                            name='name'
                            control={control}
                            render={({ field }) => (
                                <div className="edit-input">
                                    <input 
                                        {...field}
                                        required
                                        placeholder='Nhập họ và tên'
                                        type="text"      
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <div className="edit-field">
                        <div className="edit-title">
                            <span>Điện thoại</span>
                        </div>

                        <Controller 
                            control={control}
                            name='phoneNumber'
                            render={({ field }) => (
                                <div className="edit-input">
                                    <input 
                                        {...field}
                                        required
                                        placeholder='Nhập số điện thoại'
                                        type="text" 
                                    />
                                </div>
                            )}
                        />
                    </div>

                    <Controller 
                        name='location'
                        control={control}
                        render={({ field }) => (
                            <Location 
                                {...field}
                            />
                        )}
                    />

                    <div className="edit-field">
                        <div className="edit-title">
                            <span>Địa chỉ</span>
                        </div>

                        <div className="edit-input">
                            <Controller 
                                name='detail'
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}  
                                        name="" 
                                        id="" 
                                        required
                                        placeholder='Nhập địa chỉ'
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="edit-field">
                        <div className="edit-title">
                            
                        </div>

                        <div className="edit-input">
                            <button type='submit'>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddressForm;
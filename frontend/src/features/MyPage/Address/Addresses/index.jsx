import React, { useEffect, useState } from 'react';
import './styles.scss';
import { AddressService } from '../../../../services';
import { MESSAGE } from '../../../../constants/config';

import Close from '../../../../components/icons/Close';
import { IconIconStar } from '../../../../components/icons/IconIconStar';

const Addresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const { addresses } = await AddressService.fetchAddresses();

                const provincePromises = addresses.map(address => AddressService.fetchProvince(Number(address.province)));
                const districtPromises = addresses.map(address => AddressService.fetchDistrict(Number(address.district))); 
                const wardPromises = addresses.map(address => AddressService.fetchWard(Number(address.ward)));

                const provinces = await Promise.all(provincePromises); 
                const districts = await Promise.all(districtPromises); 
                const wards = await Promise.all(wardPromises);

                const updatedAddresses = addresses.map((address, index) => ({
                    ...address,
                    province: provinces[index], 
                    district: districts[index], 
                    ward: wards[index],
                }))

                setAddresses(updatedAddresses);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }  
        }

        loadAddresses();
    }, []);

    const handleUpdateDefaultAddress = async (addressId) => {
        try {
            const isChanged = await AddressService.updateDefaultAdress(addressId);

            if (isChanged) {
                alert(MESSAGE.SUCCESS.ADDRESS_UPDATED);

                setAddresses(prevAddresses => 
                    prevAddresses
                        .map(address => ({
                            ...address,
                            isDefault: address.id === addressId,
                        }))
                        .sort((a, b) => b.isDefault - a.isDefault)
                );
            } else {
                alert(MESSAGE.ERROR.ADDRESS_UPDATE_DEFAULT_ERROR);
            }
        } catch (error) {
            setError(error.message);
            alert(MESSAGE.ERROR.GENERAL_ERROR);
        }
    }

    const handleDeleteAddress = async (addressId) => {
        try {
            const isDeleted = await AddressService.deleteAddress(addressId);

            if (isDeleted) {
                alert(MESSAGE.SUCCESS.ADDRESS_DELETED);

                setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== addressId));
            } else {
                alert(MESSAGE.ERROR.ADDRESS_DELETE_ERROR);
            }
        } catch (error) {
            setError(error.message);
            alert(MESSAGE.ERROR.GENERAL_ERROR);
        }
    }

    return (
        <div className='address-container'>
            <div className="addresses-head">
                <div className='addresses-head__title'>
                    Danh Sách Địa Chỉ
                </div>

                <div className='addresses-head__describe'>
                    Vị trí thuận lợi cùng không gian thân thiện đang chờ đón bạn. Hãy để địa chỉ này là nơi bắt đầu những trải nghiệm khó quên!
                </div>
            </div>

            <div className="address-list">
                {addresses.length > 0 && 
                    addresses.map((address) => (
                        <div 
                            className="address-item-container" 
                            key={address.id}
                        >
                            <div className="address-content">
                                <div className="address-content__customer">
                                    <div className='address-content__customer-name'>
                                        {address.name}
                                    </div>

                                    {address.isDefault && (
                                        <div className="address-content__customer-is-default">
                                            <IconIconStar className="start-icon"/> 
                                            Địa chỉ mặc định
                                        </div>
                                    )}
                                </div>
                                <div className="address-content__field">
                                    <span className='address-content__field-key'>Địa chỉ: </span>
                                    <span className='address-content__field-value'>{`${address.detail}, ${address.ward.name}, ${address.district.name}, ${address.province.name}`}</span>
                                </div>

                                <div className="address-content__field">
                                    <span className='address-content__field-key'>Điện thoại: </span>
                                    <span className='address-content__field-value' >{address.phoneNumber}</span>
                                </div>
                            </div>

                            <div className="address-actions">
                                <button><Close /></button>
                                <button className='address-actions__edit'>Chỉnh sửa</button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Addresses;
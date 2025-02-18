import React, { useEffect } from 'react';
import './styles.scss';
import { Outlet } from 'react-router-dom';
import { useAccountStatus } from '../../../context/AccountStatusContext';

const Address = () => {
    const { setOptionSelected } = useAccountStatus();

    useEffect(() => {
        setOptionSelected('address');
    }, [setOptionSelected]);

    return (
        <Outlet />
    );
}

export default Address;
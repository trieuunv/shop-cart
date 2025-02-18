import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { setAuthenticated } from '../store/slices/authSlice';

const useAuthCheck = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleCheckAuthenticate = async() => {
            try {
                const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
                dispatch(setAuthenticated(response.data.authenticated));
            } catch (error) {
                console.log("Authentication check failed:", error.response);
            }
        } 

        handleCheckAuthenticate();
    }, [dispatch]);
};

export default useAuthCheck;
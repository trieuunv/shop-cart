import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { setItemCount } from "../features/Checkout/Cart/slice";

const useCartCount = () => {
    const dispatch = useDispatch();
    const authenticated = useSelector((state) => state.auth.authenticated);

    useEffect(() => {
        const loadCount = async() => {
            try {
                const response = await axios.get(`${API_URL}/get-cart-product-count`, { withCredentials: true });
                dispatch(setItemCount(response.data));
            } catch (error) {
                console.log("Authentication check failed:", error.response);
            }
        } 

        if (authenticated) {
            loadCount();
        }
    }, [dispatch]);
}

export default useCartCount;
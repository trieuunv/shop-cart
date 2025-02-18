export const validatePhoneNumber = (value) => { 
    const regex = /^[0-9]{3}$/; 
    return regex.test(value) || "Số điện thoại không hợp lệ"; 
};

export const validateEmail = (value) => { 
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        return 'Email không hợp lệ';
    }
    return true;
}

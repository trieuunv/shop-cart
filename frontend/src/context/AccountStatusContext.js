import React, { createContext, useContext, useState } from "react";

const AccountStatusContext = createContext();

export const AccountStatusProvider = ({children}) => {
    const [optionSelected, setOptionSelected] = useState('');

    return(
        <AccountStatusContext.Provider value={{ optionSelected, setOptionSelected }}>
            {children}
        </AccountStatusContext.Provider>
    );
}

export const useAccountStatus = () => {
    return useContext(AccountStatusContext);
}
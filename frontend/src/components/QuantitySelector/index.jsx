import React, { forwardRef, useEffect, useState } from 'react';
import './styles.scss';
import { IconPlus } from '../icons/IconPlus';
import { IconIconMinus } from '../icons/IconMinus';

const QuantitySelector = forwardRef(({cartProductId, value, onChange}, ref) => {
    const [total, setTotal] = useState(value ? value : 1);

    const handleMinus = () => {
        setTotal(total > 1 ? total - 1 : 1);
    };

    const handlePlus = () => {
        setTotal(total + 1);
    };

    useEffect(() => {
        if (cartProductId && total) {
            onChange(cartProductId, total);
        } else {
            onChange(total);
        }
    }, [total]);

    return (
        <div>
            <div className="button-quatity">
                <span className="minus" onClick={handleMinus}><IconIconMinus /></span>
                <span className='num'>{ total }</span>
                <span className='plus' onClick={handlePlus}><IconPlus /></span>
            </div>
        </div>
        
    );
});

export default QuantitySelector;
import React, { forwardRef, useEffect, useState } from 'react';
import './styles.scss';

const GenderSelector = forwardRef(({ onChange, value }, ref) => {
    const [gender, setGender] = useState(null);

    useEffect(() => {
        setGender(value);
    }, [value]);

    const handleGenderChange = (selectedGender) => { 
        setGender(selectedGender); 

        if (onChange) { 
            onChange(selectedGender); 
        }
    };

    return (
        <div ref={ref} className='gender-selector'>
            <input 
                type="checkbox" 
                id="sex_0" 
                checked={gender === 'male'} 
                onChange={() => handleGenderChange('male')} 
                style={{
                    backgroundImage: gender === 'male' && 'url(/images/bg_checkbox_checked.png)'
                }}
            />  
            <label htmlFor="sex_0">Nam</label>

            <input 
                type="checkbox" 
                id="sex_1" 
                checked={gender === 'female'} 
                onChange={() => handleGenderChange('female')} 
                style={{
                    backgroundImage: gender === 'female' && 'url(/images/bg_checkbox_checked.png)'
                }}
            />
            <label htmlFor="sex_1">Nữ</label>

            <input 
                type="checkbox" 
                name="" 
                id="sex_2" 
                checked={gender === 'other'} 
                onChange={() => handleGenderChange('other')} 
                style={{
                    backgroundImage: gender === 'other' && 'url(/images/bg_checkbox_checked.png)'
                }}
            />
            <label htmlFor="sex_2">Khác</label>
        </div>
    );
});

export default GenderSelector;
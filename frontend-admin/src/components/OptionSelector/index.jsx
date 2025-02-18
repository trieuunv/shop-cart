import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const OptionSelector = forwardRef(({ title, value, options, onChange }, ref) => {
    const [ optionSelected, setOptionSelected ] = useState(null);

    const handleToggleOption = (index, option) => {
        setOptionSelected(index);
        onChange(option.id);
    }

    return (
        <div>
            <div className='select-att'>
                <p>{ title }</p>
                <div className='box-type-att'>
                    { options && options.map((option, index) => (
                        <div
                            key={index} 
                            className={`att-product ${optionSelected === index ? 'active' : ''}`}
                            onClick={() => handleToggleOption(index, option)}
                        >
                            <span className='span-att'>{ option.name }</span>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
});

export default OptionSelector;
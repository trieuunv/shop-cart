import React, { forwardRef, useRef } from 'react';
import './styles.scss';

const Confirm = forwardRef(({ isVisible , text, onChange, handle }, ref) => {
    const resultBoxRef = useRef(null);

    const handleClickOutside = (e) => {
        if (resultBoxRef.current && !resultBoxRef.current.contains(e.target)) {
            onChange(false);
        }
    };

    return (
        <div className={`confirm-wr ${isVisible ? 'visible' : ''}`} onClick={handleClickOutside} >
            <div className="confirm-box" ref={resultBoxRef}>
                <div className="confirm-text">
                    { text }
                </div>

                <div className="confirm-btns">
                    <button className='confirm-action'>Xác nhận</button>
                    <button className='cancel-action' onClick={() => onChange()}>Hủy</button>
                </div>
            </div>
        </div>
    );
});

export default Confirm;
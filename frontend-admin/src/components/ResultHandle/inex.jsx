import React, { forwardRef, useEffect, useRef } from 'react';
import './styles.scss';

const ResultHandle = forwardRef(({ isSuccess, name, onChange }, ref) => {
    const resultBoxRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (resultBoxRef.current && !resultBoxRef.current.contains(e.target)) {
                onChange();
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onChange]);

    return (
        <div className={`result-handle ${isSuccess ? 'visible' : ''}`}>
            <div className="result-box" ref={resultBoxRef}>
                <div className="result-image">
                    <img src="/images/submit-successfully-64.png" alt="" />
                </div>

                <div className="result-text">
                    <span>{ name }</span>
                </div>
            </div>
        </div>
    );
});

export default ResultHandle;
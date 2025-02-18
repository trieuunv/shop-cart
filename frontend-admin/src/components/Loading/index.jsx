import React from 'react';
import './styles.scss';

const Loading = () => {
    return (
        <div className='loading-overlay'>
            <div className="loading-container">
                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <div className="loading-title">Đang tải...</div>
            </div>
        </div>
    );
}

export default Loading;
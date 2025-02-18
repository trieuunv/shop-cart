import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

Voucher.propTypes = {

};

function Voucher(props) {
    return (
        <div className="voucher-container">
            <div className="frame">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286 60" class="coupon-bg" width="286" height="60">
                    <g fill="none" fill-rule="evenodd">
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <g>
                                            <path fill="#FFF" d="M278 0c4.418 0 8 3.582 8 8v44c0 4.418-3.582 8-8 8H64.5c0-2.21-1.79-4-4-4s-4 1.79-4 4H8c-4.418 0-8-3.582-8-8V8c0-4.418 3.582-8 8-8h48.5c0 2.21 1.79 4 4 4s4-1.79 4-4H278z" 
                                                transform="translate(-544 -2912) translate(80 2252) translate(0 460) translate(464) translate(0 200)">
                                            </path>
                                            <g stroke="#EEE" stroke-dasharray="2 4" stroke-linecap="square">
                                                <path d="M0.5 0L0.5 48" transform="translate(-544 -2912) translate(80 2252) translate(0 460) translate(464) translate(0 200) translate(60 8)">
                                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>

            <div className="voucher-box">
                <div className="voucher-icon">
                    <img src="/images/voucher.png" alt="" />
                </div>

                <div className="voucher-infor">
                    <h4>Giảm 25K</h4>

                    <div className="voucher-action">
                        <button>Áp dụng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Voucher;
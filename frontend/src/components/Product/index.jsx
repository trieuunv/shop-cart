import React from 'react';
import './styles.scss';
import { formatCurrency } from '../../utils/priceUtils';

const Product = ({ id, imageUrl, name, price, status, url }) => {
    return (
        <div className="product">
            <div className="product-image">
                <a href={url}>
                    <img src={imageUrl} alt="" />
                </a>
            </div>

            <div className="product-text">
                <a href={url}>
                    <span>{name && name}</span>
                </a>

                <span>{formatCurrency(price)}</span>

                { status && status.length > 0 && (
                    <div className="special-status">
                        <ul>
                            { status.map((item, index) => (
                                <li key={index}>{ item }</li>
                            )) }
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;
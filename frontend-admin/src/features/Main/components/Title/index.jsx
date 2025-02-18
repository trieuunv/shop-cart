import React from 'react';
import './styles.scss';
import Search from '../../../../../components/icons/Search';
import Add from '../../../../../components/icons/Add';
import { Link } from 'react-router-dom';

const Title = ({onChange, route, name}) => {
    return (
        <div className="title-wr">
            <div className="title-name">
            <span>{name}</span>
            </div>  

            <div className="title-actions">
            <div className="search-wr">
                <input 
                    type="text"
                    placeholder='Tìm kiếm'    
                    onChange={onChange}
                />
                <Search />
            </div>

            <Link 
                to={route}
                className="add-btn"
            >
                <span style={{ backgroundImage: 'url(/images/plus-icon.png)' }} />
            </Link>
            </div>
            
        </div>   
    );
};

export default Title;
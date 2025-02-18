import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { Table } from 'antd';
import { fetchCategories } from '../../../../../services/api/categoryApi';

const Categories = ()=> {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { categories } = await fetchCategories();
                setCategories(categories);
                console.log(categories);
            } catch (error) {
                console.log(error);
            }
        }

        loadCategories();
    }, []);

    const columns = [
        {
            title: 'Mã phân loại',
            dataIndex: 'categoryCode',
            key: 'categoryCode',
        },
        {
          title: 'Tên phân loại',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Mô tả',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Đường dẫn',
          dataIndex: 'slug',
          key: 'slug',
        },
        {
          title: 'Sản phẩm',
          dataIndex: 'productsCount',
          key: 'productsCount',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <></>
            ),
        },
      ];

    return (
        <div>   
            <Title 
                name='Danh sách phân loại'
                route={'create'}
            />

            <div className="categories-wr">
                <Table 
                    columns={columns}
                    dataSource={categories}
                    rowKey={'id'}
                />
            </div>
        </div>  
    );
};


export default Categories;
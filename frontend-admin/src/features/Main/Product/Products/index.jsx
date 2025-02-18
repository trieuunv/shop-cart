import React, { useEffect, useState } from 'react';
import './styles.scss';
import Title from '../../components/Title';
import { Button, Table, Tag } from 'antd';
import { fetchProducts } from '../../../../../services/api/productApi';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async() => {
          try {
            const { products } = await fetchProducts();
            setProducts(products);
            setFilteredProducts(products);
          } catch (error) {
            console.log(error);
          }
        }
  
        loadProducts();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;

        const filtered = products.filter(product => {
            const productCode = product.productCode ? product.productCode.toLowerCase() : '';
            const productName = product.name ? product.name.toLowerCase() : '';
            const productCategories = product.categories && product.categories.length > 0 
                ? product.categories.map(category => category.name.toLowerCase()).join(' ')
                : '';

            return (
                productCategories.includes(term.toLowerCase()) ||
                productName.includes(term.toLowerCase()) ||
                productCode.includes(term.toLowerCase())
            );
        });

        setFilteredProducts(filtered);
    }

    const handleDetailProduct = (productId) => {
        navigate(`edit/${productId}`);
    }

    const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Mô tả',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Khối lượng',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'Phân Loại',
        dataIndex: 'categories',
        key: 'categories',
        render: (categories) => (
            <span>
                {categories && categories.length > 0 ? (
                    categories.map(category => (
                    <Tag color="blue" key={category.id}>
                        {category.name}
                    </Tag>
                    ))
                ) : (
                    <Tag color="gray">Không có loại</Tag>
                )}
            </span>
        ),
    },
    {
        title: 'Hành động',
        key: 'action',
        render: (text, record) => (
            <Button onClick={() => handleDetailProduct(record.id)}>
                Chi tiết
            </Button>
        ),
    },
    ];

    return (
        <div className='ad-products'>
            <Title 
                onChange={handleSearch} 
                route={'create'}
                name={'Danh sách sản phẩm'} 
            /> 
            <Table 
              columns={columns} 
              dataSource={filteredProducts} 
              rowKey="id"
              className='products-list'
            />
        </div>
    );
}

export default Products;
import React, { useEffect, useState } from 'react';
import './styles.scss';
import Product from '../../../components/Product';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../constants/config';
import { ProductService } from '../../../services';

const Products = () => {
    const { filter } = useParams();

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async() => {
            try {
                const { products, category } = await ProductService.fetchProducts(filter);
                setProducts(products);
                setCategory(category);
                console.log(products);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [filter]);

    return (
        <div className='product-body'>
            <div className="wide">
                <div className="title">
                    <span>{ loading ? 'Đang tải' : (category ? category.name : 'Tất cả') }</span>
                </div>
            </div>

            <div className="wide">
                <div className="product-menu">
                    <div className="product-total">
                        <span>Có</span>
                        <span className='count'>{products.length}</span>
                        <span>sản phẩm</span>
                    </div>

                    <div className="product-options">
                        <select 
                            style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                        >
                            <option value="">Giá: Tăng dần</option>
                            <option value="">Giá: Giảm dần</option>
                            <option value="">Bán chạy nhất fewf</option>
                        </select>    
                    </div>  
                </div>

                <div className="product-list">
                    { products.map((product, index) => (
                        <Product 
                            key={product.id}
                            id={product.id}
                            imageUrl={`${API_URL}/storage/${product.image?.path}`}
                            name={product.name}
                            price={product.price}
                            status={product.status}
                            url={`/product/detail/${product.id}`}
                        />
                    )) }
                </div>
                
                <div className="product-page">
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_first.png" alt="" />
                    </a>
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_prev.png" alt="" />
                    </a>
                    <ol>
                        <li>
                            <a href="">1</a>
                        </li>
                    </ol>
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_next.png" alt="" />
                    </a>
                    <a href="">
                        <img src="https://ecimg.cafe24img.com/pg218b67012705022/sshowlab1/web/_ms/img/ms_page_last.png" alt="" />
                    </a>
                </div>
                
            </div>
        </div>
    );
}

export default Products;
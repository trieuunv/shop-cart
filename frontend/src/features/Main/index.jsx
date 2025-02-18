import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import '../../styles/common.scss';

import SlideShow from './components/SlideShow';
import Product from '../../components/Product';
import Header from '../../components/Header';
import axios from 'axios';
import { API_URL } from '../../constants/config';
import { ProductService } from '../../services';
import { MainService } from '../../services';

const Home = () => { 
    const [products, setProducts] = useState([]); 
    const [banners, setBanners] = useState([]); 

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { products } = await ProductService.fetchProducts('new');
                setProducts(products);
            } catch (error) {
                console.log(error);
            }
        }

        loadProducts();
    }, []); 

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const { banners } = await MainService.fetchBanners();
                setBanners(banners);
            } catch (error) {
                console.log(error);
            }
        }

        loadBanners();
    }, []);

    return (
        <div className='main wr'>
            <div className='wrap'>
                <Header />
                <div className="main-wr">
                    <div className="main-contents">
                        <SlideShow slides={banners} />
                        <div className="policies">
                            <div className="wide">
                                <div className="policies-swiper">
                                    <div className="policies-item">
                                        <div className="policies-image">
                                            <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                                        </div>

                                        <div className="policies-infor">
                                            <span className="policies-title">
                                                Miễn phí vận chuyển
                                            </span>
                                            
                                            <span className="policies-desc">
                                                Đơn từ 399k
                                            </span>
                                        </div>
                                    </div>

                                    <div className="policies-item">
                                        <div className="policies-image">
                                            <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                                        </div>

                                        <div className="policies-infor">
                                            <span className="policies-title">
                                                Miễn phí vận chuyển
                                            </span>
                                            
                                            <span className="policies-desc">
                                                Đơn từ 399k
                                            </span>
                                        </div>
                                    </div>

                                    <div className="policies-item">
                                        <div className="policies-image">
                                            <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                                        </div>

                                        <div className="policies-infor">
                                            <span className="policies-title">
                                                Miễn phí vận chuyển
                                            </span>
                                            
                                            <span className="policies-desc">
                                                Đơn từ 399k
                                            </span>
                                        </div>
                                    </div>

                                    <div className="policies-item">
                                        <div className="policies-image">
                                            <img src="https://file.hstatic.net/1000360022/file/giaohangnhanh_abaa5d524e464a0c8547a91ad9b50968.png" alt="" />
                                        </div>

                                        <div className="policies-infor">
                                            <span className="policies-title">
                                                Miễn phí vận chuyển
                                            </span>
                                            
                                            <span className="policies-desc">
                                                Đơn từ 399k
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="collections">
                            <div className="wide">
                                <div className="collection-wr">
                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/dodilam_5e4f45bc5c8645deb71eea2b8dec4f99_grande.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/techopen_jeans_7e32840e2aba41ecb0cd8772d8eff9ee_grande.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/sp_denim_779deb4755ad4251bc8ecbbca8004673_grande.jpg" alt="" />
                                        </a>
                                    </div>

                                    <div className="collection-item">
                                        <a href="">
                                            <img src="https://file.hstatic.net/1000360022/file/dohangngay_69ac0ead5c7c4b4483520cec6804996a_grande.jpg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="products">
                            <div className='wide'>
                                <div className="title">
                                    <h1>Hàng Mới</h1>
                                </div>

                                <div className="body">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

import React, { useEffect, useState } from 'react';
import './styless.scss';
import { fetchBanners, updateBanners } from '../../../../services/api/bannerApi';
import { API_URL } from '../../../../constants/config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const [initialBanner, setInitialBanner] = useState([]);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const { banners } = await fetchBanners();
                setBanners(banners);
                setInitialBanner(banners);

                console.log(banners);
            } catch (error) {
                console.log(error);
            }
        }

        loadBanners();
    }, []);

    const handleDelete = (bannerId) => {
        setBanners((prev) => prev.filter((banner) => banner.id !== bannerId));
    }

    const handleReset = () => {
        setBanners(initialBanner);
    }

    const handleCreateBanner = () => {
        navigate('/admin/banner');
    }

    const onSubmit = async () => {
        try {
            const bannerIds = banners.map((banner) => banner.id)
            await updateBanners({  
                'banner_ids': bannerIds,
            });

            alert('Cập nhật banner thành công');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('draggedIndex', index); // Lưu chỉ số của phần tử đang kéo
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định để cho phép thả
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('draggedIndex'); // Lấy chỉ số phần tử bị kéo
        const draggedItem = banners[draggedIndex]; // Lấy phần tử bị kéo

        const updatedBanners = [...banners];
        updatedBanners.splice(draggedIndex, 1); // Xóa phần tử bị kéo ra khỏi mảng
        updatedBanners.splice(index, 0, draggedItem); // Chèn phần tử bị kéo vào vị trí mới

        setBanners(updatedBanners); // Cập nhật lại danh sách banners
    };

    return (
        <div className='dashboard-wr'>
            <div className="slides">
                <div className="slide-title">
                    <span>Ảnh slides</span>
                    <div className="banner-action">
                        <button onClick={handleCreateBanner}>Thêm</button>
                        <button onClick={handleReset}>Làm mới</button>
                    </div>
                </div>

                <div className="slide-imgs">
                    { banners.map((banner, index) => (
                         <div 
                            className="slide-item"
                            key={banner.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)} 
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                         >
                            <div className="img-content">
                                <span className="image-index">
                                    {`Tiêu đề: ${ banner.title }`}
                                </span>
    
                                <div className="content-detail">
                                    { `Đường dẫn: ${ banner.target }` }
                                </div>
                            </div>
    
                            <div className="slide-image">
                                <img src={`${API_URL}/storage/${banner.path}`} alt="" />
                            </div>
    
                            <div className="slide-action">
                                <button onClick={() => handleDelete(banner.id)}>Xóa</button>
                            </div>
                        </div>
                    )) }
                </div>

                <div className="btn-submit">
                    <button onClick={onSubmit}>Cập nhật</button>
                </div>
            </div>
        </div>              
    );
};

export default Dashboard;
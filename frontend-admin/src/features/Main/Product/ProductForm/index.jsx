import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import { Select, Button, Upload } from 'antd';
import { isValidateImageFile } from '../../../../../utils/fileUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCategories } from '../../../../../services/api/categoryApi';
import { fetchSizes } from '../../../../../services/api/sizeApi';
import { fetchColors } from '../../../../../services/api/colorApi';
import { createProduct, fetchProduct, updateProduct } from '../../../../../services/api/productApi';
import { API_URL } from '../../../../../constants/config';
import { UploadOutlined } from '@ant-design/icons';
import Reset from '../../../../../components/icons/Reset';

const ProductForm = () => {
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { Option } = Select;
    const [fileList, setFileList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [images, setImages] = useState([]);

    const { id } = useParams();

    const beforeUpload = (file) => {
        if (!isValidateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    const handleUploadChange = (info, field) => {
        const updatedFileList = info.fileList.map(file => ({
            ...file,
            originFileObj: file.originFileObj || file
        }));
        setFileList(updatedFileList);
        field.onChange(updatedFileList.map(file => file.originFileObj));
    };
    

    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: '',
            price: '',
            weight: '',
            description: '',
            categories: [],
            colors: [],
            sizes: [],
            images: []
        }
    });

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            ['name', 'price', 'weight', 'description'].forEach((key) => formData.append(key, data[key]));

            ['categories', 'colors', 'sizes', 'images'].forEach((key) => {
                data[key].forEach((item) => 
                    formData.append(`${key}[]`, key === 'categories' || key === 'sizes' ? Number(item) : item)
                );
            });
            
            if (id) {
                // Update

                images.forEach((image) => {
                    formData.append('image_ids[]', image.id);
                });
                
                await updateProduct(id, formData);
                alert('Cập nhật sản phẩm thành công.');
            } else {
                await createProduct(formData);
                alert('Thêm sản phẩm thành công.');
            }

            navigate('/admin/product');
        } catch (error) {
            alert('Đã xảy ra lỗi.');
            console.log(error.response);
        }
    } 

    useEffect(() => {
        const loadProduct = async(productId) => {
            try {
                const { product } = await fetchProduct(productId);
                setProduct(product);
            } catch (error) {
                console.log(error);
            }
        }

        if (id) {
            loadProduct(id);
        }
    }, [id]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { categories } = await fetchCategories();
                setCategories(categories);
            } catch (error) {
                console.log(error);
            }
        } 

        loadCategories();
    }, []);

    useEffect(() => {
        const loadSizes = async () => {
            try {
                const { sizes } = await fetchSizes();
                setSizes(sizes);
            } catch (error) {
                console.log(error);
            }
        } 

        loadSizes();
    }, []);

    useEffect(() => {
        const loadColors = async () => {
            try {
                const { colors } = await fetchColors();
                setColors(colors);
            } catch (error) {
                console.log(error);
            }
        } 

        loadColors();
    }, []);

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                price: product.price,
                weight: product.weight,
                description: product.description,
                categories: product.categories.map((product) => product.id),
                colors: product.colors.map((color) => color.id),
                sizes: product.sizes.map((size) => size.id),
            });

            setImages(product.images);
        }
    }, [product, reset]);

    const handleReset = () => {
        if (product) {
            reset({
                name: product.name,
                price: product.price,
                weight: product.weight,
                description: product.description,
                categories: product.categories.map((product) => product.id),
                colors: product.colors.map((color) => color.id),
                sizes: product.sizes.map((size) => size.id),
            });

            setImages(product.images);
            setFileList([]);
        }
    }

    const handleDeleteImage = (id) => {
        setImages((prev) => prev.filter((image) => image.id !== id));
    }

    return (
        <div className='adm_addproduct'>
            <div className="add_title">
                <span>Thêm sản phẩm</span>

                <button className='btn-reset' onClick={handleReset}>Làm mới</button>
            </div>

            <form className="add_box" onSubmit={handleSubmit(onSubmit)}>
                <div className="box-fields">
                    <div className="add_list_left">
                        <div className="add_field">
                            <span className='field_title'>Tên sản phẩm:</span>
                            <div className="field_input">
                                <Controller 
                                    name='name'
                                    control={control}
                                    render={({ field }) => (
                                        <input 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập tên sản phẩm'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Giá Tiền:</span>
                            <div className="field_input">
                                <Controller 
                                    name='price'
                                    control={control}
                                    render={({ field }) => (
                                        <input 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập giá sản phẩm'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Khối lượng (kg):</span>
                            <div className="field_input">
                                <Controller 
                                    name='weight'
                                    control={control}
                                    render={({ field }) => (
                                        <input 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập khối lượng'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Mô tả:</span>
                            <div className="field_input">
                                <Controller 
                                    name='description'
                                    control={control}
                                    render={({ field }) => (
                                        <textarea 
                                            {...field}
                                            type="text" 
                                            placeholder='Nhập mô tả'
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Phân loại:</span>
                            <div className="field-add">
                                <Controller 
                                    name='categories'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            mode="multiple"
                                            className='select-field'
                                            placeholder='Chọn phân loại'
                                            required
                                        >
                                            { categories.map((category) => (
                                                <Option 
                                                    value={category.id}
                                                    key={category.id}
                                                >
                                                    { category.name }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Màu sắc:</span>
                            <div className="field-add">
                                <Controller 
                                    name='colors'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            mode="multiple"
                                            className='select-field'
                                            placeholder='Chọn màu sắc'
                                            required
                                        >
                                            { colors.map((color) => (
                                                <Option 
                                                    key={color.id}
                                                    value={color.id}
                                                    className='option-field'
                                                >
                                                    { color.name }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="add_field">
                            <span className='field_title'>Kích thước:</span>
                            <div className="field-add">
                                <Controller 
                                    name='sizes'
                                    control={control}
                                    render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            mode="multiple"
                                            className='select-field'
                                            placeholder='Chọn kích thước'
                                            required
                                        >
                                            { sizes.map((size) => (
                                                <Option 
                                                    value={size.id}
                                                    key={size.id}
                                                >
                                                    { size.name }
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="btn-submit">
                            <button type='submit'>Cập nhật</button>
                        </div>
                    </div>

                    <div className="vertical"></div>

                    <div className="add_list_right">
                        <div className="image-add-title">
                            Thêm ảnh
                        </div>

                        <div className="images-product">
                            { images && images.map((image) => (
                                <div 
                                    key={image.id}
                                    className="image-item"
                                >
                                    <img 
                                        className='image-content'
                                        src={`${API_URL}/storage/${image.path}`} 
                                        alt="" 
                                    />

                                    <button onClick={() => handleDeleteImage(image.id)}>Xóa</button>
                                </div>
                            )) }
                        </div>

                        <div className="image-wrap">
                            <Controller 
                                name='images'
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        {...field}
                                        listType="picture"
                                        beforeUpload={beforeUpload}
                                        onChange={(infor) => handleUploadChange(infor, field)}
                                        className='upload-images'
                                        fileList={fileList}
                                    >
                                        <Button icon={<UploadOutlined />}>Upload File</Button>
                                    </Upload>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
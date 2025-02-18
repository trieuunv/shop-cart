import React, { useCallback } from 'react';
import './styles.scss';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../../../../../constants/config';
import _ from 'lodash';
import { debounce } from 'lodash';

const CategoryForm = () => {
    const { control, handleSubmit, trigger, watch, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            slug: ''
        }
    });

    const onSubmit = async(data) => {
        const categoryForm = _.mapKeys(data, (value, key) => _.snakeCase(key));

        try {
            await axios.post(`${API_URL}/create-category`, categoryForm, { withCredentials: true });
            
            alert('Tạo mới loại sản phẩm thành công.');
            reset();
        } catch (error) {
            console.log(error);
            alert('Đã xảy ra lỗi.');
        }
    }

    return (
        <div className='category-wr'>
            <div className="form-title">
                <span>Thêm phân loại sản phẩm</span>
            </div>

            <form className="category-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="category-field">
                    <div className="category-field-input">
                        <Controller 
                            name='name'
                            control={control}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    type="text"
                                    placeholder='Tên sản phẩm' 
                                    required
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="category-field">
                    <div className="category-field-input">
                        <Controller 
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    type="text"
                                    placeholder='Mô tả' 
                                    required
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="category-field">
                    <div className="category-field-input">
                        <Controller 
                            name='slug'
                            control={control}
                            rules={{ 
                                validate: debounce(async (value) => { 
                                    if (value) { 
                                        try { 
                                            const response = await axios.post(`${API_URL}/check-slug`, { slug: value }); 
                                            console.log(response); 
                                            if (!response.data.isAvailable) { 
                                                return `'${value}' đã tồn tại.`; 
                                            } return true; 
                                        } catch (error) { 
                                            return "Đã xảy ra lỗi. Vui lòng thử lại sau."; 
                                        } 
                                    } 
                                }, 300)
                             }}
                            render={({ field }) => (
                                <input 
                                    {...field}
                                    type="text"
                                    placeholder='Đường dấn (slug)' 
                                    onBlur={() => trigger("slug")}
                                    required
                                />
                            )}
                        />

                        {errors.slug && <p className='error-message'>{errors.slug.message}</p>}
                    </div>
                </div>

                <div className="category-submit">
                    <button>Cập nhật</button>
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;
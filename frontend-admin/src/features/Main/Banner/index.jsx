import React, { useState } from 'react';
import { isValidateImageFile } from '../../../../utils/fileUpload';
import { useForm, Controller } from 'react-hook-form';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './styles.scss';
import { createBanner } from '../../../../services/api/bannerApi';

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [file, setFile] = useState(null);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            target: '',
            title: '',
            description: '',
        }
    });

    const beforeUpload = (file) => {
        if (!isValidateImageFile(file)) {
            return Upload.LIST_IGNORE;
        }
        return true;
    }

    const handleUploadChange = (info, field) => {
        const uploadedFile = info.fileList[0]?.originFileObj || null;
        setFile(uploadedFile);
        field.onChange(uploadedFile);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            ['target', 'title', 'description'].forEach((key) => formData.append(key, data[key]));
            formData.append('image', file);

            await createBanner(formData);

            alert('Tạo mới banner thành công.');
        } catch (error) {
            console.log(error);
            alert('Đã xảy ra lỗi.');
        }
    }

    return (
        <div className='banner-container'>
            <form action="" className='banner-form' onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name='target'
                    control={control}
                    render={({ field }) => (
                        <input 
                            type="text" 
                            placeholder='Đích' 
                            {...field}
                        />
                    )}
                />

                <Controller 
                    name='title'
                    control={control}
                    render={({ field }) => (
                        <input 
                            type="text" 
                            placeholder='Mô tả' 
                            {...field}
                        />
                    )}
                />

                <Controller 
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <input 
                            type="text" 
                            placeholder='Thứ tự' 
                            {...field}
                        />
                    )}
                />

                <div className="banner-add">
                    <Controller 
                        name='images'
                        control={control}
                        render={({ field }) => (
                            <Upload
                                listType="picture"
                                beforeUpload={beforeUpload}
                                onChange={(info) => handleUploadChange(info, field)}
                                fileList={file ? [{ uid: '-1', name: file.name, status: 'done' }] : []}
                                maxCount={1}
                                className="upload-images"
                            >
                                <Button icon={<UploadOutlined />}>Upload File</Button>
                            </Upload>
                        )}
                    />
                </div>
                <button type='submit' className='btn-submit'>Cập nhật</button>
            </form>
        </div>
    );
};

export default Banner;
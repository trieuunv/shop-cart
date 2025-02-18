import React, { forwardRef, useEffect, useState } from 'react';
import './styles.scss';

import { fetchProvinces, fetchDistricts, fetchWards } from '../../services/api/addressApi';

const Location = forwardRef(({ value, onChange }, ref) => {
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [ward, setWard] = useState(null);

    const [error, setError] = useState('');

    useEffect(() => {
        setProvince(value?.province);
        setDistrict(value?.district);
        setWard(value?.ward);
    }, [value]);

    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const provinces = await fetchProvinces();
                setProvinces(provinces);
            } catch (error) {
                setError(error);
            }
        };

        loadProvinces();
    }, []);

    useEffect(() => {
        const loadDistricts = async () => {
            if (province) {
                const districts = await fetchDistricts(province);
                setDistricts(districts);
            } else {
                setDistricts([]);
                setDistrict(null);
            }
        };

        loadDistricts();
    }, [province]);

    useEffect(() => {
        const loadWards = async () => {
            if (district) {
                const wards = await fetchWards(district);
                setWards(wards);
            } else {
                setWards([]);
                setWard(null);
            }
        };

        loadWards();
    }, [district]);

    const handleProvinceChange = (e) => {
        const selectedProvince = provinces?.find(p => p.code === Number(e.target.value));
        setProvince(selectedProvince?.code || null);
        setDistrict(null);

        onChange({ 
            province: selectedProvince?.code, 
            district: null, 
            ward: null 
        });
    }

    const handleDistrictChange = (e) => {
        const selectedDistrict = districts?.find(d => d.code === Number(e.target.value));
        setDistrict(selectedDistrict?.code || null);
        setWard(null);

        onChange({ 
            province: province, 
            district: selectedDistrict.code, 
            ward: null 
        });
    }

    const handleWardChange = (e) => {
        const selectedWard = wards?.find(w => w.code === Number(e.target.value));
        setWard(selectedWard?.code || null);

        onChange({ 
            province: province, 
            district: district, 
            ward: selectedWard.code 
        });
    }

    return (
        <div className='location-wr'>
            <div className="location-field">
                <div className="location-title">
                    <span>Tỉnh / Thành phố</span>
                </div>

                <div className="location-input">
                    <select 
                        value={province || ''} 
                        onChange={handleProvinceChange}
                        required
                        style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                    >
                        <option value="">Chọn Tỉnh / Thành phố</option>
                        {provinces.map((province) => (
                            <option key={province.code} value={province.code}>
                                { province.name }
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="location-field">
                <div className="location-title">
                    <span>Quận / Huyện</span>
                </div>

                <div className="location-input">
                    <select 
                        value={district || ''} 
                        onChange={handleDistrictChange}
                        required
                        style={{ backgroundImage: 'url(/images/down-arrow.png)' }}

                    >
                        <option value="">Chọn Quận / Huyện</option>
                        {districts.map((district) => (
                            <option key={district.code} value={district.code}>
                                { district.name }
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="location-field">
                <div className="location-title">
                    <span>Phường / Xã</span>
                </div>

                <div className="location-input">
                    <select 
                        value={ward || ''} 
                        onChange={handleWardChange}
                        required
                        style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                    >
                        <option value="">Chọn Phường / Xã</option>
                        {wards.map((ward) => (
                            <option key={ward.code} value={ward.code}>
                                { ward.name }
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
});

export default Location;
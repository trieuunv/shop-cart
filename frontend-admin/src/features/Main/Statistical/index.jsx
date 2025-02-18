import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './styles.scss';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchStatisticalOrder } from '../../../services/api/statisticalApi';

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistical = () => {
    const [statistical, setStatistical] = useState(null);
    const [loading, setLoading] = useState(false);

    const { control, watch, setValue, getValues } = useForm({
        defaultValues: {
            statisticalType: 'order',
            yearSelected: 2024,
            numMonth: 3,
            monthStart: 1,
            monthEnd: 4,
        },
    });

    const year = watch('yearSelected');
    const numMonth = watch('numMonth');
    const monthStart = watch('monthStart');
    const statisticalType = watch('statisticalType');
    const monthEnd = watch('monthEnd');

    useEffect(() => {
        const endMonth = (parseInt(monthStart) + parseInt(numMonth) - 1) > 12
            ? 12
            : (parseInt(monthStart) + parseInt(numMonth) - 1);

        setValue('monthEnd', endMonth || 12);
    }, [monthStart, numMonth, setValue]);

    useEffect(() => {
        const loadStatistical = async () => {
            setLoading(true);
            try {
                const { statistical } = await fetchStatisticalOrder({
                    'type': statisticalType,
                    'year': year,
                    'num_month': numMonth,
                    'month_start': monthStart,
                    'month_end': monthEnd

                });
                setStatistical(statistical);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        
        loadStatistical();
    }, [numMonth, monthStart, statisticalType, year, monthEnd]);

    const generateMonthLabels = (start, end) => {
        const labels = [];
        for (let i = start; i <= end; i++) {
            labels.push(`Tháng ${i}`);
        }
        return labels;
    };

    const generateChartData = () => {
        const months = generateMonthLabels(monthStart, monthEnd);
    
        const values = Array(months.length).fill(0);

        if (statistical) {
            statistical.forEach((data) => {
                const monthIndex = months.findIndex(month => month === `Tháng ${data.month}`);
                if (monthIndex !== -1) {
                    values[monthIndex] = data.value;
                }
            });
        }

        return {
            labels: months,
            datasets: [
                {
                    label: 'Tổng Đơn Hàng',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
  };

    const data = generateChartData();

    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Sales Data',
            },
        },
    };

    return (
        <div className='statistical-container'>
            <div className="statistical-header">
                <span className="statistical-title">
                    
                </span>
            </div>

            <div className="statistical-main">
                <div className="bart-list">
                    <form className="bart-item">
                        <span className="bart-title">
                            <Controller 
                                name='statisticalType'
                                control={control}
                                render={({ field }) => (
                                    <select 
                                        {...field}
                                        className='type-select'
                                        style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                                    >
                                        <option value="order">Thống Kê Đơn Hàng</option>
                                        <option value="revenue">Thống Kê Doanh Thu</option>
                                    </select>
                                )}
                            />

                            <div className="statistical-date">
                                <Controller
                                    name="numMonth"
                                    control={control}
                                    render={({ field }) => (
                                        <select 
                                            {...field} 
                                            className='type-select'
                                            style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                                        >
                                            <option value={1}>1 Tháng</option>
                                            <option value={3}>3 Tháng</option>
                                            <option value={6}>6 Tháng</option>
                                            <option value={12}>1 Năm</option>
                                        </select>
                                    )}
                                />
                            </div>

                            <div className="statistical-date-detail">
                                <Controller 
                                    name='monthStart'
                                    control={control}
                                    render={({ field }) => (
                                        <select 
                                            {...field}
                                            style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                                        >
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    Tháng {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />

                                <Controller 
                                    name='monthEnd'
                                    control={control}
                                    render={({ field }) => (
                                        <select 
                                            {...field}
                                            style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                                        >
                                            {Array.from({ length: 12 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    Tháng {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />
                            </div>

                            <div className="bart-actions">
                                <Controller 
                                    name='yearSelected'
                                    control={control}
                                    render={({ field }) => (
                                        <select 
                                            {...field}
                                            className='bart-btn'
                                            style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                                        >
                                            <option value={2024}>2024</option>
                                            <option value={2023}>2023</option>
                                        </select>
                                    )}
                                />
                            </div>
                        </span>

                        {loading ? (
                            <div className="spinner">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            <Bar data={data} options={options} />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Statistical;
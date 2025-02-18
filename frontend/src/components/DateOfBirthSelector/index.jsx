import React, { forwardRef, useEffect, useState } from 'react';
import './styles.scss';

const DayOfBirthSelector = forwardRef(({ value, onChange }, ref) => {
    const currentYear = new Date().getFullYear();
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [dayInMonth, setDayInMonth] = useState([]);

    useEffect(() => {
        if (value && typeof value === 'string') {
            const [yearValue, monthValue, dayValue] = value ? value.split('-') : [];
            setDay(Number(dayValue));
            setMonth(Number(monthValue));
            setYear(Number(yearValue));
        }
    }, [value]);

    useEffect(() => {
        const updateDayInMoth = () => {
            const days = new Date(year, month, 0).getDate();
            const daysArray = Array.from({ length: days }, (_, i) => i + 1);
            setDayInMonth(daysArray);
            
            if (day > days) {
                setDay(days);
            }
        };

        updateDayInMoth();
    }, [month, year]);

    useEffect(() => {
        if (onChange) {
            if (day && month && year) {
                onChange(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
            }
        }
    }, [day, month, year, onChange]);

    return (
        <div className='dob-box' ref={ref}>
            <select 
                id="day" 
                value={day || ''}
                onChange={(e) => setDay(Number(e.target.value))}
                style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
                >
                <option value="">Ngày</option>
                { dayInMonth.map((d) => (
                    <option key={d} value={d}>
                        {d}
                    </option>
                )) }
            </select>

            <select 
                id="month" 
                value={month || ''} 
                onChange={(e) => setMonth(Number(e.target.value))}
                style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
            >
                <option value="">Tháng</option>
                {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        Tháng { i + 1 }
                    </option>
                ))}
            </select>

            <select 
                id="year" 
                value={year || ''} 
                onChange={(e) => 
                setYear(Number(e.target.value))}
                style={{ backgroundImage: 'url(/images/down-arrow.png)' }}
            >
                <option value="" className='option-null'>Năm</option>
                {Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (
                    <option key={currentYear - i} value={currentYear - i}>
                        { currentYear - i }
                    </option>
                ))}
            </select>
        </div>
    );
})

export default DayOfBirthSelector;
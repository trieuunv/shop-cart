import { parse, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz'; 

export function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}

export function isValidBirthDate(dateString) {
    if (!isValidDate(dateString)) {
        return false;
    }

    const birthDate = new Date(dateString);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (birthDate >= currentDate) {
            return false;
        }

        return true;
}

export const formatDate = (dateString) => {
    if (!dateString) {
        return '';
    }
    
    const date = new Date(dateString);
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };

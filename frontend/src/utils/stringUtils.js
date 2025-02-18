export function isValidDateString(str) {
    return typeof str === 'string' && str !== null;
}

export function isValidDateMinLengthString(str, num) {
    return isValidDateString(str) && str.length >= num;
}
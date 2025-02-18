const isNotEmptyObject = (obj) => {
    for (let key in obj) {
        if (obj[key] === "" || obj[key] === null) {
            return false;
        }
    }
    return true;
}

export default isNotEmptyObject;
export const isValidateImageFile = (file, ) => {
    const isImage = file.type.startWith('image');
    if (!isImage) {
        return false;
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        return false;
    }

    return true;
}
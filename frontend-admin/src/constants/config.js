export const API_URL = 'http://localhost:8000'

export const MESSAGE = {
    SUCCESS: {
        USER_PROFILE_UPDATED: 'Cập nhật hồ sơ thành công!',
        ADDRESS_UPDATED: 'Cập nhật địa chỉ thành công!',

        ADDRESS_DELETED: 'Xóa địa chỉ thành công!',
    },
    ERROR: {
        NETWORK_ERROR: 'Có lỗi xảy ra. Vui lòng thử lại.',
        VALIDATION_ERROR: 'Dữ liệu không hợp lệ.',

        GENERAL_ERROR: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',

        USER_PROFILE_UPDATE_ERROR: 'Lỗi khi cập nhật hồ sơ.',

        ADDRESS_UPDATE_DEFAULT_ERROR: 'Lỗi khi cập nhật địa chỉ mặc định.',
        ADDRESS_UPDATE_ERROR: 'Lỗi khi cập nhật thông tin địa chỉ.',

        ADDRESS_DELETE_ERROR: 'Lỗi khi xóa địa chỉ.',

        INVALID_CREDENTIALS: 'Thông tin đăng nhập không hợp lệ',


    },
    WARNING: {
        UNSAVED_CHANGES: 'Bạn có thay đổi chưa lưu!',
    },
}
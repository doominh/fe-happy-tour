import axios from 'axios';

export const apiUpdateUser = async (data) => {
    try {
        const response = await axios.put('/api/user/current', data);
        return response.data; // Giả sử API trả về dữ liệu ở dạng JSON
    } catch (error) {
        throw error; // Đẩy lỗi ra để xử lý ở nơi gọi API
    }
};

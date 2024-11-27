import axios from "../axios";

export const apiCreateBooking = (data) => axios({
    url: '/api/booking',
    method: 'post',
    data
})

export const apiGetBookings = () => axios({
    url: '/api/booking',
    method: 'get',
})

export const apiGetBooking = (tourId) => axios({
    url: '/api/booking/' +tourId,
    method: 'get'
})
export const apiGetBookingTour = async (params) => {
    try {
        const response = await axios.get('/api/booking', { params });
        return response.data; // Giả sử API trả về dữ liệu dưới dạng JSON
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error; // Đẩy lỗi ra để xử lý ở nơi gọi API
    }
};

export const apiUpdateStatusBooking = (bookingId,data) => axios({
    url: '/api/booking/status/' + bookingId,
    method: 'put',
    data
})

export const apiGetUserBookings = (params) => axios({
    url: '/api/booking/current/',
    method: 'get',
    params
})
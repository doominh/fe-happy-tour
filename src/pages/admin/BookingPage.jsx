import React, { useEffect, useState } from 'react';
import { apiGetBookings } from '../../apis/booking'; // Đảm bảo đường dẫn đúng
import moment from 'moment';
import InputField from '../../components/InputField';
import './Css/BookingPage.css'

const BookingPage = () => {
    const [bookingTours, setBookingTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [queries, setQueries] = useState({
        q: ''
    });

    // Hàm gọi API và cập nhật dữ liệu
    const fetchBookingTours = async () => {
        try {
            const response = await apiGetBookings();
            if (response.status === 404) {
                console.error('API không tồn tại hoặc đường dẫn không đúng');
                return;
            }
            if (response.success) {
                setBookingTours(response.bookingsData); // Giả sử response chứa mảng dữ liệu cần hiển thị
            } else {
                setError('Không thể tìm nạp các chuyến tham quan đã đặt trước');
                console.log(response);
            }
        } catch (err) {
            setError('Đã xảy ra lỗi khi lấy dữ liệu!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Gọi hàm fetchBookingTours khi component được render
    useEffect(() => {
        fetchBookingTours();
    }, []);

    return (
        <>
            <div className="m-10">
                <div className='flex justify-between m-5'>
                    <h1 className="text-2xl font-bold">Booking List</h1>
                    <div>
                        <InputField
                            nameKey="q"
                            value={queries.q}
                            setValue={setQueries}
                            placeholder="Search tour..."
                            isHideLabel
                        />
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!loading && !error && (
                    <div className="overflow-x-auto bg-white mx-2">
                        <table className="table booking-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tour Name</th>
                                    <th>Tour Price</th>
                                    <th>Vehicel</th>
                                    <th>License Plate</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Mobile</th>
                                    <th>Adults</th>
                                    <th>Children</th>
                                    <th>Infants</th>
                                    <th>Total</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingTours.map((booking, idx) => (
                                    <tr key={booking._id}>
                                        <td>{idx + 1}</td>
                                        <td>{booking?.tour?.name || 'N/A'}</td>
                                        <td>{booking?.tour?.price ? booking.tour.price.toLocaleString() + ' VND' : 'N/A'}</td>
                                        <td>{booking?.trip?.vehicel || 'N/A'}</td>
                                        <td>{booking?.trip?.licensePlate || 'N/A'}</td>
                                        <td>{booking?.orderBy?.firstname || 'N/A'}</td>
                                        <td>{booking?.orderBy?.lastname || 'N/A'}</td>
                                        <td>{booking?.orderBy?.mobile || 'N/A'}</td>
                                        <td>{booking?.adult !== null && booking?.adult !== undefined ? booking.adult : 'N/A'}</td>
                                        <td>{booking?.children !== null && booking?.children !== undefined ? booking.children : 'N/A'}</td>
                                        <td>{booking?.infant !== null && booking?.infant !== undefined ? booking.infant : 'N/A'}</td>
                                        <td>{booking?.total ? booking.total.toLocaleString() + ' VND' : 'N/A'}</td>
                                        <td>{booking?.createdAt ? moment(booking.createdAt).format('DD/MM/YYYY') : 'N/A'}</td>
                                        <td>{booking?.updatedAt ? moment(booking.updatedAt).format('DD/MM/YYYY') : 'N/A'}</td>
                                        <td className='status'>
                                            <span className={`status-label ${booking.status.toLowerCase()}`}>
                                                {booking?.status || 'N/A'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingPage;

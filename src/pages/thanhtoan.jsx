import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetTour } from '../apis';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { totalBooking, formatMoney, formatDate } from '../ultils/helpers';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import withBaseComponent from '../hocs/withBaseComponent';
import moment from 'moment';

const Thanhtoan = ({ navigate, location }) => {
  const { current } = useSelector(state => state.user)
  const { tourId } = useParams();
  const [tours, setTour] = useState(null);
  const [payload, setPayload] = useState({
    tourId,
    tripId: '',
    adult: 1,
    children: 0,
    infant: 0,
  });
  const reBookingData = location.state?.reBookingData;
  const fetchTours = async () => {
    const response = await apiGetTour(tourId);
    if (response.success) setTour(response.tourData);
  };

  useEffect(() => {
    if (tourId) fetchTours();
    if (reBookingData) {
      const { adult, children, infant } = reBookingData
      setPayload({ ...payload, adult, children, infant });
    }
  }, [tourId, reBookingData]);

  const handleBooking = async () => {
    console.log(current)
    if (!current) {
      return Swal.fire({
        icon: 'info',
        title: 'Almost!',
        text: 'Please go to login',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Go to login',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) navigate('/dangnhap')
      })
    } else if (payload.tripId && current) {
      const selectedTrip = tours?.trip?.find(el => el._id === payload.tripId);
      navigate('/checkout', { state: { payload, tourName: tours?.name, tourPrice: tours?.price, vehicle: selectedTrip.vehicel, licensePlate: selectedTrip.licensePlate, startDate: tours?.startDate, departureTime: selectedTrip.departureTime } });
    } else {
      Swal.fire('Oops!', 'Vui lòng chọn giờ khởi hành trước khi tiếp tục.', 'warning');
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-header bg-success text-white">DỊCH VỤ TOUR</div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Tour yêu cầu</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" value={tours?.name || ''} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Khách sạn</label>
                <div className="col-sm-10 flex">
                  {tours?.destination?.map(el => (
                    <span className='px-2' key={el._id} >{el.hotel}</span>
                  ))}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Ngày vào tour</label>
                <div className="col-sm-10">
                  <span>{formatDate(tours?.startDate)}</span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Ngày ra tour</label>
                <div className="col-sm-10">
                  <span>{formatDate(tours?.endDate)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-header bg-success text-white">CHI TIẾT TOUR</div>
            <div className="card-body">
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Chọn giờ khởi hành <span className="text-danger">*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-control"
                    value={payload.tripId}
                    onChange={(e) => setPayload({ ...payload, tripId: e.target.value })}
                  >
                    <option value=""> -Lựa chọn- </option>
                    {tours?.trip?.map(el => (
                      <option key={el._id} value={el._id}>{`${el.vehicel} (${moment(el.departureTime).format("HH:mm")})`}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">
                  Người lớn <span className="text-danger">*</span>
                </label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control"
                    min={1}
                    value={payload.adult}
                    onChange={(e) => setPayload({ ...payload, adult: e.target.value })}
                  />
                </div>
                <label className="col-sm-3 col-form-label">Giá người lớn</label>
                <div className="col-sm-3">
                  <span>{formatMoney(payload.adult * (tours?.price || 0))} VND</span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Trẻ em</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control"
                    value={payload.children}
                    min={0}
                    onChange={(e) => setPayload({ ...payload, children: e.target.value })}
                  />
                </div>
                <label className="col-sm-3 col-form-label">Giá trẻ em (75%)</label>
                <div className="col-sm-3">
                  <span>{formatMoney(payload.children * (tours?.price || 0) * 0.75)} VND</span>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Trẻ nhỏ</label>
                <div className="col-sm-3">
                  <input
                    type="number"
                    className="form-control"
                    value={payload.infant}
                    min={0}
                    onChange={(e) => setPayload({ ...payload, infant: e.target.value })}
                  />
                </div>
                <label className="col-sm-3 col-form-label">Giá trẻ nhỏ (free)</label>
                <div className="col-sm-3">
                  <input type="text" readOnly className="form-control-plaintext" value="0 VND" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-3 col-form-label">Tổng giá</label>
                <div className="col-sm-9">
                  <div className="total-price-box">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext total-price"
                      value={`${formatMoney(totalBooking((tours?.price || 0), Number(payload.adult), Number(payload.children)))} VND`}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card">
              <div className="card-header bg-success text-white">LƯU Ý</div>
              <div className="card-body">
                <p className="text-muted">
                  * Xin vui lòng nhập tên hành khách phải đúng tên như trong CMND/Hộ chiếu (tên không dấu, có dấu cách giữa họ và tên).<br />
                  * Quý khách vui lòng mang đầy đủ giấy tờ tùy thân.<br />
                  * Hãy để lại địa chỉ liên lạc chính xác nhất và chúng tôi sẽ liên hệ lại cho bạn trong thời gian sớm nhất.<br />
                  * Booking có giá trị khi được nhân viên xác nhận.<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className="col-12 d-flex justify-content-center pb-3">
          <Button
            name={'Xác nhận thanh toán'}
            handleOnClick={handleBooking}
          />
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Thanhtoan);

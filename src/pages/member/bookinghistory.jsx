// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiGetUserBookings } from '../../apis';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import { useForm } from 'react-hook-form';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { formatMoney, totalBooking } from '../../ultils/helpers';
import moment from 'moment';
import CustomSelect from '../../components/inputs/CustomSelect';
import { statusBookings } from '../../ultils/constant';
import withBaseComponent from '../../hocs/withBaseComponent'
import Button from '../../components/Button';

const BookingHistory = ({ navigate, location }) => {

  const [params] = useSearchParams()
  const [booking, setBooking] = useState(null)
  const { register, formState: { errors }, watch, setValue } = useForm()
  const status = watch('status')
  const [counts, setCounts] = useState(0)
  const fetchUserBookings = async (params) => {
    const response = await apiGetUserBookings({
      ...params,
      limit: import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT,
    })
    if (response.success) {
      setBooking(response.bookingData)
      setCounts(response.counts)
    }
  }
  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchUserBookings(searchParams)
  }, [params])
  const handleSearchStatus = (val) => {
    const value = val?.value;
    const params = value ? createSearchParams({ status: value }).toString() : '';
    navigate({
      pathname: location.pathname,
      search: params
    });
  };

  const handleRebooking = (reBookingData) => {
    navigate(`/thanhtoan/${reBookingData?.tour?._id}`, { state: { reBookingData } });
  };
  return (
    <div className="container mt-5">
      <div className=" mb-4 flex justify-between items-center">
        <div>
          <h2>Lịch sử đặt vé</h2>
        </div>
        <form className='w-[45%] grid grid-cols-2 gap-4'>
          <div className='col-span-1'>
          </div>
          <div className='col-span-1 flex items-center'>
            <CustomSelect
              options={statusBookings}
              value={status}
              onChange={val => handleSearchStatus(val)}
              wrapClassname='w-full'
            />
          </div>
        </form>
      </div>
      <div className="row">
        {booking?.map(el => (
          <div className="col-md-12 mb-4" key={el._id}>
            <div className="card shadow-lg rounded-lg overflow-hidden">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={el?.tour?.thumb || el?.tour?.images[0]}
                    className="card-img h-full object-cover"
                    alt={el?.tour?.name}
                    style={{ height: '100%' }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h5 className="card-title font-weight-bold">
                      {el?.tour?.name}
                    </h5>
                    <p className="card-text mb-2">
                      <strong>Giá:</strong> {`${formatMoney(el?.tour?.price)} VND`}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Phương tiện:</strong> {el?.trip?.vehicel}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Số hành khách:</strong> {`${el?.adult} người lớn, ${el?.children} trẻ em, ${el?.infant} em bé`}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Tổng tiền:</strong> {`${formatMoney(totalBooking((+el?.tour?.price || 0), Number(el?.adult), Number(el?.children)))} VND`}
                    </p>
                    <p className="card-text mb-2">
                      <strong>Trạng thái:</strong> <span className={`badge ${el.status === 'Success' ? 'badge-success' : 'badge-warning'}`}>{el.status}</span>
                    </p>
                    <p className="card-text mb-2">
                      <small className="text-muted">
                        Ngày Tạo: {moment(el?.createdAt).format("DD/MM/YYYY HH:mm")}
                      </small>
                    </p>
                    <Button
                      fw
                      name={'Đặt lại tour'}
                      handleOnClick={() => handleRebooking(el)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBaseComponent(BookingHistory);

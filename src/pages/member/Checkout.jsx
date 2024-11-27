import React, { useState } from 'react'
import payment from '../../assets/payment.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import Paypal from '../../components/common/Paypal';
import { totalBooking, formatMoney, formatDate } from '../../ultils/helpers';
import { useSelector } from 'react-redux';
import Congratulation from '../../components/common/Congratulation';
import moment from 'moment';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const { payload, tourName, tourPrice, vehicle, licensePlate, startDate, departureTime } = location.state || {}

    const { current } = useSelector(state => state.user)
    const [isSuccess, setIsSuccess] = useState(false)
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className='p-8 w-full grid grid-cols-10 min-h-screen max-h-screen overflow-y-auto gap-6'>
            {isSuccess && <Congratulation />}

            <div className='w-full flex justify-center items-center col-span-3'>
                <img src={payment} alt="payment" className='h-[70%] object-contain' />
            </div>
            <div className='flex w-full flex-col justify-center col-span-7 gap-6 '>
                <h2 className='text-3xl font-bold capitalize'>Checkout your booking</h2>
                <div className='flex items-center w-full gap-6'>
                    <div className='basis-3/5'>
                        <div className='py-3'>
                            <span className='italic'>Tour infomation:</span>
                            <table className='table-auto h-fit'>
                                <thead>
                                    <tr className='border bg-gray-200'>
                                        <th className='text-left p-2'>Tour name</th>
                                        <th className='text-center p-2'>Price</th>
                                        <th className='text-center p-2'>Vehicle</th>
                                        <th className='text-right p-2'>License plate</th>
                                        <th className='text-right p-2'>Depart at</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border'>
                                        <td className='text-left p-2'>{tourName}</td>
                                        <td className='text-center p-2'>{tourPrice}</td>
                                        <td className='text-center p-2'>{vehicle}</td>
                                        <td className='text-right p-2'>{licensePlate}</td>
                                        <td className='text-right p-2'>{`${formatDate(startDate)} ${moment(departureTime).format("HH:mm")}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='py-3'>
                            <span className='italic'>Passenger information:</span>
                            <table className='table-auto h-fit'>
                                <thead>
                                    <tr className='border bg-gray-200'>
                                        <th className='text-left p-2'>User name</th>
                                        <th className='text-center p-2'>Adult</th>
                                        <th className='text-center p-2'>Children (4-10)</th>
                                        <th className='text-center p-2'>Children (&lt;4)</th>
                                        <th className='text-right p-2'>Total Pax</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border'>
                                        <td className='text-left p-2'>{`${current?.firstname} ${current?.lastname}`}</td>
                                        <td className='text-center p-2'>{payload?.adult}</td>
                                        <td className='text-center p-2'>{payload?.children}</td>
                                        <td className='text-center p-2'>{payload?.infant}</td>
                                        <td className='text-right p-2'>{Number(payload?.adult) + Number(payload?.children) + Number(payload?.infant)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='w-1/2 mx-auto'>
                            <button
                                onClick={handleCancel}
                                className='w-full py-2 mt-4 text-center text-white bg-red-500 hover:bg-red-600 rounded'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className='basis-2/5 flex flex-col justify-between py-2 gap-[45px]'>
                        <div className='flex flex-col gap-6'>
                            <span className='flex items-center gap-8 text-sm'>
                                <span className='font-medium'>Subtotal:</span>
                                <span className='text-[#5DBC5D] font-bold'>{`${formatMoney(totalBooking((tourPrice || 0), Number(payload.adult), Number(payload.children)))} VND`}</span>
                            </span>
                            <span className='flex items-center gap-8 text-sm'>
                                <span className='font-medium'>Address:</span>
                                <span className='text-[#5DBC5D] font-bold'>{current.address}</span>
                            </span>
                        </div>
                        <div className='w-full mx-auto'>
                            <Paypal
                                payload={{ ...payload, address: current?.address }}
                                amount={Math.round(+totalBooking((tourPrice || 0), Number(payload.adult), Number(payload.children)) / 23500)}
                                setIsSuccess={setIsSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout

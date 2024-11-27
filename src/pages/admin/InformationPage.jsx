import { useEffect, useState } from 'react';
import InputForm from '../../components/InputForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { apiUpdateCurrent } from '../../apis/user';
import { getCurrent } from '../../store/users/asyncActions'
import avatar from '../../assets/avatarDefault.png';
import { toast } from 'react-toastify';

const ChangeInforAdmin = () => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset } = useForm()
    const { current } = useSelector(state => state.user)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const savedCurrent = JSON.parse(localStorage.getItem('current'));
        if (savedCurrent) {
            reset(savedCurrent);
        } else {
            dispatch(getCurrent());
        }
    }, []);
    
    useEffect(() => {
        if (current) {
            localStorage.setItem('current', JSON.stringify(current));
        }
    }, [current]);
    
    

    const handleUpdateInfor = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) {
            formData.append('avatar', data.avatar[0])
        }
        delete data.avatar
        
        for(let i of Object.entries(data)) formData.append(i[0], i[1])
        const response = await apiUpdateCurrent(formData)
        if(response.success) {
            dispatch(getCurrent())
            toast.success(response.mes)
        }
        else toast.error(response.mes);
    }
    return (
        <>
            <div className="container m-10">
                <h3 className="fw-bold mt-4">THAY ĐỔI THÔNG TIN CÁ NHÂN</h3>
                <form onSubmit={handleSubmit(handleUpdateInfor)} className="row g-3 justify-content-center">
                    <div className="col-md-6">
                        <InputForm
                            label= "Họ"
                            register={register}
                            errors={errors}
                            id='firstname'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                        />
                    </div>
                    <div className="col-md-6">
                        <InputForm
                            label= "Tên"
                            register={register}
                            errors={errors}
                            id='lastname'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                        />
                    </div>
                    <div className="col-12">
                        <InputForm
                            label= "Địa chỉ email"
                            register={register}
                            errors={errors}
                            id='email'
                            validate={{
                                required: 'Need fill this field',
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: 'Invalid email'
                                }
                            }}
                            style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                        />
                    </div>
                    <div className="col-12">
                        <InputForm
                            label= "Số điện thoại"
                            register={register}
                            errors={errors}
                            id='mobile'
                            validate={{
                                required: 'Need fill this field',
                                pattern: {
                                    value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                                    message: 'Invalid phone number'
                                }
                            }}
                            style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                        />
                    </div>
                    <div className="col-12">
                        <InputForm
                            label= "Địa chỉ"
                            register={register}
                            errors={errors}
                            id='address'
                            validate={{
                                required: 'Need fill this field',
                            }}
                            style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                        />
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>Trạng thái tài khoản:</span>
                        <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>Vai trò:</span>
                        <span>{+current?.role === 0 ? 'Admin' : 'User'}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>Ngày tạo:</span>
                        <span>{ moment(current?.createdAt).fromNow() }</span>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <span className='font-medium'></span>
                        <label htmlFor="file">
                            <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 object-cover rounded-full' />
                        </label>
                        <input type="file" id='file' {...register('avatar')} hidden />
                    </div>
                    {isDirty && <div className='w-full flex justify-end'><button type='submit' className='btn btn-success fw-bold px-5'>Cập nhật thông tin</button></div> }
                </form>
                <div className="text-center mt-4">
                    <p className="mb-0">By updating your information, you agree with our </p>
                    <p className="mb-3">Terms & conditions and Privacy statement </p>
                    <p className="mb-1">All rights reserved.</p>
                    <p className="mb-0">Copyright (2023-2024) - HappyTour.com</p>
                </div>
            </div>
        </>
    );
}

export default ChangeInforAdmin;

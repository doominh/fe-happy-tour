import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useCallback, useEffect, useState } from 'react';
import { apiLogin, apiRegister, apiForgotPassword, apiFinalRegister } from '../apis'
import Swal from 'sweetalert2';
import { login } from '../store/users/userSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { validate } from '../ultils/helpers';

const Dangnhap = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: '',
    });

    const [isVerifiedEmail, setisVerifiedEmail] = useState(false)

    const [invalidFields, setInvalidFields] = useState([])

    const [isRegister, setIsRegister] = useState(false);

    const [isForgotPassword, setIsForgotPassword] = useState(false)

    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: '',
        })
    }

    const [token, setToken] = useState("")
    const [email, setEmail] = useState('')
    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email });
        console.log(response)
        if (response.success) {
            toast.success(response.mes)
        } else toast.info(response.mes)
    }

    useEffect(() => {
        resetPayload()
    }, [isRegister])

    const handleSubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload

        const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)
        if (invalids === 0) {
            if (isRegister) {
                const rsRegister = await apiRegister(payload)
                if (rsRegister.success) {
                    setisVerifiedEmail(true)
                } else Swal.fire('Oops!', rsRegister.mes, 'error')
            } else {
                const rsLogin = await apiLogin(data)
                if (rsLogin.success) {
                    // dispatch action to save token when login
                    dispatch(login({ isLoggedIn: true, token: rsLogin.accessToken }))
                    toast.success('Login succesfully!')
                    navigate('/');
                } else Swal.fire('Oops!', rsLogin.mes, 'error')
            }
        }
    }, [payload, isRegister])

    const finalRegister = async () => {
        const response = await apiFinalRegister(token)
        if (response.success) {
            Swal.fire('Congratulations!', response.response, 'success').then(() => { setIsRegister(false); resetPayload() })
        } else Swal.fire('Oops!', response.response, 'error')
        setisVerifiedEmail(false)
        setToken('')
    }

    return (
        <>
            <div className="container">
                <h3 className="fw-bold mt-5">{isRegister ? 'ĐĂNG KÝ TÀI KHOẢN' : 'ĐĂNG NHẬP TÀI KHOẢN'}</h3>
                {isVerifiedEmail && <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-50 flex flex-col justify-center items-center'>
                    <div className='bg-white w-[500px] rounded-md p-8'>
                        <h5>We have sent a code to your email. Please check your email and enter your code:</h5>
                        <input type="text"
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            className='p-2 border rounded-md outline-none'
                        />
                        <button
                            type='button'
                            className='px-4 py-2 rounded-md ml-4 bg-[#55c255] hover:bg-[#87d587] transition ease-in font-semibold text-white'
                            onClick={finalRegister}
                        >
                            Submit
                        </button>
                    </div>
                </div>}
                {isForgotPassword && <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="email">Nhập email của bạn:</label>
                        <input
                            type="text"
                            id='email'
                            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
                            placeholder='Exp: email@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className='flex justify-end gap-4'>
                            <Button
                                name='Gửi'
                                handleOnClick={handleForgotPassword}
                            />
                            <Button
                                name='Hủy'
                                handleOnClick={() => setIsForgotPassword(false)}
                                style='px-4 py-2.5 rounded-md text-white bg-orange-500 hover:bg-orange-400 text-semibold my-2'
                            />
                        </div>
                    </div>
                </div>}

                <div className="row g-3 justify-content-center">
                    <div className="col-12">
                        {isRegister &&
                            <>
                                <div className='col-12'>
                                    <div className="row">
                                        <div className="col-6">
                                            <InputField
                                                value={payload.firstname}
                                                setValue={setPayload}
                                                nameKey='firstname'
                                                invalidFields={invalidFields}
                                                setInvalidFields={setInvalidFields}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <InputField
                                                value={payload.lastname}
                                                setValue={setPayload}
                                                nameKey='lastname'
                                                invalidFields={invalidFields}
                                                setInvalidFields={setInvalidFields}
                                            />
                                        </div>
                                    </div>


                                </div>
                                <div className="col-12">
                                    <InputField
                                        value={payload.mobile}
                                        setValue={setPayload}
                                        nameKey='mobile'
                                        type='tel'
                                        invalidFields={invalidFields}
                                        setInvalidFields={setInvalidFields}
                                    />
                                </div>
                            </>
                        }
                    </div>
                    <div className="col-12">
                        <InputField
                            value={payload.email}
                            setValue={setPayload}
                            nameKey='email'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                    <div className="col-12">
                        <InputField
                            value={payload.password}
                            setValue={setPayload}
                            nameKey='password'
                            type='password'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                    </div>
                    <div className="col-12">
                        <div className='row'>
                            <div className='col-6'>
                                {!isRegister && (
                                    <>
                                        <span>Chưa có tài khoản?</span>
                                        <span
                                            className="text-blue-500 fw-bold hover:underline cursor-pointer"
                                            onClick={() => setIsRegister(true)}
                                        >
                                            Tạo tài khoản ở đây
                                        </span>
                                    </>
                                )}
                                {isRegister && <span
                                    className="text-blue-500 fw-bold hover:underline cursor-pointer"
                                    onClick={() => setIsRegister(false)}
                                > Về trang đăng nhập</span>}
                            </div>
                            <div className='col-6 d-flex justify-content-end'>
                                {!isRegister && <span
                                    className="text-blue-500 fw-bold hover:underline cursor-pointer"
                                    onClick={() => setIsForgotPassword(true)}
                                > Quên mật khẩu ?</span>}
                            </div>
                            {/* <div className="row">
                                <div className="col-12 flex justify-center mt-3">
                                <Link to={'/'}>Về trang chủ?</Link>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-4">
                        <Button name={isRegister ? 'Đăng ký' : 'Đăng nhập'} handleOnClick={handleSubmit} fw />
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p className="mb-0">By signing in or creating an account, you agree with our </p>
                    <p className="mb-3">Terms & conditions and Privacy statement </p>
                    <p className="mb-1">All rights reserved.</p>
                    <p className="mb-0">Copyright (2023-2024) - HappyTour.com</p>
                </div>
            </div>
        </>
    );
}

export default Dangnhap;

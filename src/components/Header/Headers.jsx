import { useEffect, useState } from 'react';
import styles from './Headers.module.css'; // Import the CSS module
import { Link, useNavigate } from 'react-router-dom';
import videoSource from '../../assets/bn2.mp4';
import { getCurrent } from '../../store/users/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdLogOut } from "react-icons/io";
import { logout, clearMessage } from '../../store/users/userSlice';
import Swal from 'sweetalert2';

const Headers = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleMenuClick = () => {
    setIsMenuActive(!isMenuActive);
  };

  // isLoggedIn become true if we login
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, current, mes } = useSelector(state => state.user)
  // Then useEffect be called to get data
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent())
    }, 300)

    return () => {
      clearTimeout(setTimeoutId)
    }
  }, [dispatch, isLoggedIn])

  useEffect(() => {
    if (mes) Swal.fire('Oops!', mes, 'info').then(() => {
      dispatch(clearMessage())
      navigate('/dangnhap')
    })
  }, [mes])

  return (
    <header>
      <div className={styles.header_top}>
        {isMenuActive
          ? <i className="fas fa-times" onClick={handleMenuClick}></i>
          : <i className="fas fa-bars" onClick={handleMenuClick}></i>
        }

        <ul className={`${isMenuActive ? styles.active : ''}`}>
          <li style={{ '--x': 1 }}><Link to="/">Trang chủ</Link></li>
          <li style={{ '--x': 2 }}><Link to="/tours">Địa điểm</Link></li>
          <li style={{ '--x': 3 }}><Link to="/about">Về chúng tôi</Link></li>
          <li style={{ '--x': 4 }}><Link to="/blog">Blog</Link></li>
          <li style={{ '--x': 5 }}><Link to="/contact">Liên hệ</Link></li>
          <li style={{ '--x': 5 }}>
            {isLoggedIn && current &&
              <Link to="/bookinghistory">Lịch sử đặt vé</Link>}
          </li>
          <li style={{ '--x': 6 }}>
            {isLoggedIn && current
              ? <div className='flex items-center gap-2 bg-[#5dbc5d] rounded-l-[24px] rounded-r-none'>
                <Link to={'/thaydoi'}>{`Welcome, ${current?.lastname} ${current?.firstname}`}</Link>
                <Link onClick={() => dispatch(logout())} className='border-x-2 rounded-[24px] px-3'>
                  <IoMdLogOut size={22} />
                </Link>
              </div>
              : <Link to="/dangnhap">Tài khoản</Link>}
          </li>
        </ul>
      </div>
      <div className={styles.video_container}>
        <video src={videoSource} autoPlay muted loop>phat</video>
      </div>
    </header>
  );
};

export default Headers;

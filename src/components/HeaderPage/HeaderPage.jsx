import styles from './HeaderPage.module.css'; // Import the CSS module
import vietnamFlag  from '../../assets/vietnam-flag-circular-17769.png'
import { Link, useNavigate } from 'react-router-dom';
import { getCurrent } from '../../store/users/asyncActions';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdLogOut } from "react-icons/io";
import { logout, clearMessage } from '../../store/users/userSlice';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const HeaderPage = () => {
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
    if(mes) Swal.fire('Oops!', mes, 'info').then(() => {
      dispatch(clearMessage())
      navigate('/dangnhap')
    })
  },[mes])
  return (
    <header className={styles.navbar}>
      <div className={styles.navbar_left}>
        <Link to='/'><img src="/img/_Travel.png" alt="Logo" className={styles.logo} /></Link>
      </div>
      <nav className={styles.navbar_center}>
        <Link to="/" className={styles.nav_item}><i className="fas fa-home"></i> Trang chủ</Link>
        <Link to="/tours" className={styles.nav_item}><i className="fas fa-map-marker-alt"></i> Địa điểm</Link>
        <a href="#" className={styles.nav_item}><i className="fas fa-users"></i> Về chúng tôi</a>
        <Link to="/blog" className={styles.nav_item}><i className="fas fa-camera"></i> Blog</Link>
        <a href="#" className={styles.nav_item}><i className="fas fa-phone"></i> Liên hệ</a>
      </nav>
      <div className={styles.navbar_right}>
        <img src={vietnamFlag} alt="Vietnam Flag" className={styles.flag} />
        <i className="fas fa-question-circle"></i>
        <span>Đăng chỗ nghỉ của Quý vị</span>
        {isLoggedIn && current
              ? <div  className='flex items-center gap-2'>
                <Link className={styles.btn} to={'/thaydoi'}>{`Welcome, ${current?.lastname} ${current?.firstname}`}</Link>
                <Link  onClick={() => dispatch(logout())} className='text-white p-2'>
                  <IoMdLogOut size={22} />
                </Link>
              </div>
              : <Link className={styles.btn} to="/dangnhap">Tài khoản</Link>}
      </div>
    </header>
  );
};

export default HeaderPage;

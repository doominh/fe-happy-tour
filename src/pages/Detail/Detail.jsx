import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './Detail.module.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { apiGetTour, apiRatings } from '../../apis/tour';
import { useCallback, useEffect } from 'react';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import { useState } from 'react';
import { formatMoney, formatDate, renderStarFromNumber } from '../../ultils/helpers';
import VoteBar from '../../components/VoteBar';
import Button from '../../components/Button';
import VoteOption from '../../components/VoteOption';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../store/app/appSlice';
import Swal from 'sweetalert2'
import Comment from '../../components/Comment';
import moment from 'moment';


const renderRatingStars = (totalRatings) => {
    const stars = [];
    const maxStars = 5; // Số sao tối đa
    for (let i = 0; i < totalRatings; i++) {
        stars.push(<i key={i} className="fas fa-solid fa-star" style={{ color: 'yellow' }}></i>);
    }
    for (let i = totalRatings; i < maxStars; i++) {
        stars.push(<i key={i} className="far fa-star" style={{ color: 'yellow' }}></i>);
    }
    return stars;
};

const Detail = () => {
    const { tourId, name, category } = useParams()
    const [tour, setTour] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.user)
    const [update, setUpdate] = useState(false)

    const fetchTours = async () => {
        const response = await apiGetTour(tourId)
        if (response.success) setTour(response.tourData)
    }
    useEffect(() => {
        if (tourId) fetchTours()
    }, [tourId, update])
    const rerender = useCallback(() => {
        setUpdate(!update)
    }, [update])

    // function to get data from VoteOption Component
    const handleSubmitVoteOption = async ({ comment, score }) => {
        if (!comment || !tour._id || !score) {
            alert('Please vote when click submit')
            return
        }
        await apiRatings({ star: score, comment, tid: tour._id, updatedAt: Date.now() })
        dispatch(showModal({ isShowModal: false, modalChildren: null }))
        rerender()
    }

    // check when user login , then allow to vote
    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go login',
                title: 'Oops!',
                showCancelButton: true
            }).then((rs) => {
                if (rs.isConfirmed) navigate('/dangnhap')
            })
        } else {
            dispatch(showModal({
                isShowModal: true,
                modalChildren: <VoteOption nameProduct={tour?.name}
                    handleSubmitVoteOption={handleSubmitVoteOption}
                />
            }))
        }
    }
    return (
        <div>
            <section className={styles.nice_place}>
                <div className={styles.container}>
                    <div className={styles.tour_content_text_head}>
                        <h3 className='font-semibold'>{name}</h3>
                        <Breadcrumbs name={name} category={category} />
                    </div>
                    <hr />
                    <div className={styles.tour_content} id="row">
                        <div >
                            {tour?.thumb ? (
                                <img src={tour?.thumb} alt={tour?.name} className='h-[458px] w-[458px] border object-cover' />
                            ) : (
                                <img src={tour?.images[0]} alt={tour?.name} className='h-[458px] w-[458px] border object-cover' />
                            )}
                        </div>
                        <div className={styles.tour_content_text}>
                            <h2>{tour?.name}</h2>
                            {(renderRatingStars(tour?.totalRatings).map(star => star))}
                            <hr />

                            <p><i className="fa fa-solid fa-dollar-sign"></i> Giá tour: {`${formatMoney(tour?.price || 0)} VNĐ`} </p>
                            <p><i className="fa fa-regular fa-calendar-check"></i> {`Ngày khởi hành: ${formatDate(tour?.startDate)} - ${formatDate(tour?.endDate)}`}</p>
                            <div className="flex items-center mb-2">
                                <i className="fa fa-solid fa-plane mr-2"></i> Vận Chuyển:
                                <div className="dropdown dropdown-right ml-2">
                                    <div tabIndex={0} role="button" className="no-underline py-2 px-2.5 rounded-lg bg-[#5dbc5d] text-white hover:bg-[#7fd97f] transition ease-in">Hiển thị</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        {tour?.trip?.map(el => (
                                            <li key={el._id} className="mb-2 p-2 border-b border-gray-300">
                                                {`${el.vehicel} ( ${moment(el.departureTime).format("HH:mm")} )`}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center mb-2">
                                <i className="fa fa-solid fa-hotel mr-2"></i>Điểm đến & khách sạn:
                                <div className="dropdown dropdown-right ml-2">
                                    <div tabIndex={0} role="button" className="no-underline py-2 px-2.5 rounded-lg bg-[#5dbc5d] text-white hover:bg-[#7fd97f] transition ease-in">Hiển thị</div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow">
                                        {tour?.destination?.map((el, index) => (
                                            <li key={el._id} className="mb-2 p-2 border-b border-gray-300">
                                                {`Điểm: ${index + 1} ${el.name} - ${el.hotel}`}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <h2>Liên hệ</h2>
                            <Link
                                className='no-underline py-3 px-2.5 rounded-lg bg-[#5dbc5d] text-white hover:bg-[#7fd97f] transition ease-in'
                                to={`/thanhtoan/${tourId}`}><i
                                    className='fa fa-solid fa-cart-plus'></i> ĐẶT NGAY</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.tour}>
                <div className={styles.more}>
                    <div className={styles.container}>
                        <div className={styles.more_title}>
                            <h3 className={styles.title_tour}>
                                <span>Chương trình tour</span>
                            </h3>
                        </div>
                        <div className={styles.more_title_tour}>
                            <h3>Chương trình tour</h3>
                        </div>
                        {tour?.destination?.map((el, index) => (
                            <div key={el._id}>
                                <div className={styles.more_title_day}>
                                    <h3>{`NGÀY ${index + 1}: ${el.name}`}</h3>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.content_text}>
                                        {/* <p><strong className={styles.info}>Buổi sáng:</strong> Trưởng đoàn <span className={styles.highlight}>VIETNET TRAVEL</span> đón quý khách tại sân bay Tân Sơn Nhất – Ga Quốc Nội hỗ trợ làm thủ tục đáp chuyến bay đi Hà Nội.</p>
                                        <p><strong className={styles.info}>Chuyến bay dự kiến:</strong></p>
                                        <p className={styles.flightinfo}><strong>VIETJET AIR: VJ SGN-HAN 07h10 – 09h15</strong></p>
                                        <p>Đoàn về đến Hà Nội nhận phòng khách sạn và ăn trưa.</p>
                                        <p><strong className={styles.info}>Buổi chiều:</strong> Xe đưa đoàn đi tham quan:</p>
                                        <div className={styles.content_list}>
                                            <ul>
                                                <li><strong>Hồ Gươm, tháp Rùa</strong></li>
                                                <li><strong>Đền Ngọc Sơn</strong></li>
                                                <li>Chụp ảnh lưu niệm tại <strong>Nhà Hát Lớn Thành Phố.</strong></li>
                                                <li>Ngồi xe điện tham quan phố cổ <strong>Hà Nội</strong> với <strong>Hàng Ngang, hàng Đào, chợ Đồng Xuân...</strong></li>
                                                <li><strong>Hồ Tây, chùa Trấn Quốc</strong> ngôi chùa cổ lịch sử lâu đời nhất Hà Nội.</li>
                                            </ul>
                                        </div> */}
                                        {/* <p>Sau khi tham quan thành phố đoàn về nhà hàng dùng cơm tối với <strong>tiệc Buffet.</strong></p> */}
                                        <p>{el.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className={styles.content}>
                            <div className={styles.more_title_tour}>
                                <h3>Lịch Khởi Hành</h3>
                            </div>
                            <table className={styles.flight_info}>
                                <thead>
                                    <tr>
                                        <th>Ngày đi: {formatDate(tour?.startDate)}</th>
                                        <td>Chuyến xe: {tour?.trip?.map((el, index) => (
                                            <span key={el._id}>
                                                {el.vehicel}
                                                {index < tour.trip.length - 1 && ' - '}
                                            </span>
                                        ))}</td>
                                        <td>Giờ khởi hành: {tour?.trip?.map((el, index) => (
                                            <span key={el._id}>
                                                {moment(el.departureTime).format('HH:mm')}
                                                {index < tour.trip.length - 1 && ', '}
                                            </span>
                                        ))}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Ngày về: {formatDate(tour?.endDate)}</th>
                                        <td>Chuyến xe: {tour?.trip?.map((el, index) => (
                                            <span key={el._id}>
                                                {el.vehicel}
                                                {index < tour.trip.length - 1 && ' - '}
                                            </span>
                                        ))}</td>
                                        <td>Giờ khởi hành: {tour?.trip?.map((el, index) => (
                                            <span key={el._id}>
                                                {moment(el.departureTime).format('HH:mm')}
                                                {index < tour.trip.length - 1 && ', '}
                                            </span>
                                        ))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.more_title_tour}>
                                <h3>Điều Khoản</h3>
                            </div>
                            <div className={styles.more_title_day}>CHI PHÍ BAO GỒM:</div>
                            <p>- Xe du lịch đời mới máy lạnh (15, 29, 35, 45 chỗ tùy theo số lượng khách từng ngày). </p>
                            <p>- Tàu tham quan trên sông (có trang bị áo phao), xuồng chèo, trái cây, trà mật ong, đờn ca tài tử, xe ngựa. </p>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.content_text}>
                                <p>Ăn trong chương trình:</p>
                                <ul>
                                    <li><strong>Ăn trưa cơm đĩa (tiêu chuẩn thường) hoặc cơm phần 4-5 món. (Các món ăn sẽ thay đổi theo từng bữa).</strong></li>
                                    <li>- Cá tai tượng chiên xù cuốn bánh tráng + bún + rau sống+ mắm me</li>
                                    <li>- Cơm trắng | Trái cây | Trà đá + khăn lạnh</li>
                                    <li>- Xôi chiên phòng</li>
                                    <li>- Thịt kho</li>
                                    <li>- Trứng chiên</li>
                                    <li>- Gỏi Củ hủ dừa tôm thịt</li>
                                    <li>- Rau luộc + kho quẹt</li>
                                </ul>
                            </div>
                            <div className={styles.more_title_day}>TOUR KHÔNG BAO GỒM:</div>
                            <div className={styles.content_text}>
                                <p>Chi phí tham quan ngoài chương trình.</p>
                                <p>Chi phí ăn uống ngoài chương trình.</p>
                                <p>Thuế VAT</p>
                            </div>
                            <div className={styles.more_title_day}>CHI PHÍ DÀNH CHO TRẺ EM:</div>
                            <div className={styles.content_text}>
                                <p>Trẻ em từ 4 tuổi trở xuống miễn phí, gia đình tự túc cho bé</p>
                                <p>Trẻ em từ 4 - Dưới 10 tuổi tính 75% giá người lớn được hưởng: 1 chỗ trên xe, thuyền, 1 suất ăn như người lớn, vé tham quan và ngủ chung giường với ba mẹ.</p>
                                <p>Trẻ em 10 tuổi tính như người lớn.</p>
                            </div>
                            <div className={styles.more_title_day}>ĐIỀU KIỆN HỦY TOUR:</div>
                            <div className={styles.content_text}>
                                <p>Sau khi xác nhận và thanh toán nếu:</p>
                                <p>Hủy tour 10 ngày trước ngày khởi hành: phí hủy 50% tiền vé</p>
                                <p>Hủy tour 5 ngày trước ngày khởi hành: phí hủy 70% tiền vé </p>
                                <p>Hủy tour trước 24h so với khởi hành: phí hủy 100% tiền vé </p>
                            </div>
                        </div>
                        <div className={styles.notes_section}>
                            <h3>MỘT SỐ LƯU Ý KHÁC:</h3>
                            <ul>
                                <li>Các điểm tham quan trong chương trình có thể thay thứ tự để phù hợp với tình hình thực tế.</li>
                            </ul>
                            <p>
                                ** Trong trường hợp khách quan như: khủng bố, thiên tai, ... hoặc do có sự cố, sự thay đổi lịch trình
                                của các phương tiện vận chuyển công cộng như: máy bay, tàu hỏa, ... thì công ty sẽ giữ quyền thay
                                đổi lộ trình chuyến du lịch bất cứ lúc nào vì sự an toàn và thuận tiện cho khách hàng và sẽ không
                                chịu trách nhiệm bồi thường những thiệt hại phát sinh.
                            </p>
                            <p className={styles.highlight}>Chúc quý khách một chuyến đi thú vị và bổ ích!</p>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.more_title_tour}>
                                <h3>Thông tin cần biết</h3>
                            </div>
                            <div className={styles.content_text}>
                                <p>Đặc điểm khí hậu ở miền Bắc thường thay đổi theo từng vùng, từng mùa. Nên các bạn nhớ trang bị quần áo phù hợp theo mùa và điểm đến, ưu tiên gọn nhẹ, nhưng phải đủ ấm. Vào mùa hè thời tiết phụ thuộc vào từng khu vực, có thể ăn mặc thoải mái nhưng vẫn cần một chiếc áo khoác. Mùa đông hơi lạnh lẽo, nên chọn áo ấm, găng tay, khăn, mũ len các loại để chống chọi cái rét lạnh miền Bắc.</p>
                            </div>
                            <div className={styles.button_container}>
                                <Link to={`/thanhtoan/${tourId}`} className={styles.btn_text}>ĐẶT NGAY</Link>
                            </div>
                        </div>
                        <div className='w-full mt-4 border p-4'>
                            <div className="flex flex-col p-4">
                                <div className='flex'>
                                    <div className="basis-3/5 border flex flex-col items-center justify-center">
                                        <span className='font-semibold text-3xl'>{`${Math.round(tour?.totalRatings)}/5`}</span>
                                        <span className='flex items-center gap-1'>{renderStarFromNumber(tour?.totalRatings)?.map((el, index) => (
                                            <span key={index}>{el}</span>
                                        ))}</span>
                                        <span className='text-sm'>{`${tour?.ratings?.length} reviewers and commentors`}</span>
                                    </div>
                                    <div className="basis-full flex flex-col gap-2 border p-4">
                                        {Array.from(Array(5).keys()).reverse().map(el => (
                                            <VoteBar
                                                key={el}
                                                number={el + 1}
                                                ratingTotal={tour?.ratings?.length}
                                                ratingCount={tour?.ratings?.filter(i => i.star === el + 1)?.length}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='p-4 flex items-center justify-center text-sm flex-col gap-2'>
                                    <span>Do you want to rate this Tour?</span>
                                    <Button
                                        name='Rate now!'
                                        handleOnClick={handleVoteNow}
                                    ></Button>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    {tour?.ratings?.map(el => (
                                        <Comment
                                            key={el._id}
                                            star={el.star}
                                            updatedAt={el.updatedAt}
                                            comment={el.comment}
                                            name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Detail;

import styles from './HomePages.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Headers from '../components/Header/Headers';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { createSlug } from '../ultils/helpers'
import { apiGetTours } from '../apis/tour';
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getNewTours } from '../store/tours/asyncAction';
import { useDispatch, useSelector } from 'react-redux';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};

const renderRatingStars = (totalRatings) => {
    const stars = [];
    const maxStars = 5;
    totalRatings = Math.round(totalRatings)
    for (let i = 0; i < totalRatings; i++) {
        stars.push(<i key={i} className="fas fa-solid fa-star"></i>);
    }
    for (let i = totalRatings; i < maxStars; i++) {
        stars.push(<i key={i} className="far fa-star"></i>);
    }
    return stars;
};

const images = [
    "https://static.vinwonders.com/2022/11/phuot-mien-nam-3.jpg",
    "https://vtv1.mediacdn.vn/thumb_w/640/562122370168008704/2023/10/23/phu-quoc-1-1698055838982645990788.jpg",
    "https://www.kkday.com/vi/blog/wp-content/uploads/du-lich-sapa.jpg",
    "https://image.nhandan.vn/w800/Uploaded/2024/igpcvcvjntc8510/2023_02_08/trang-an-5882.jpg.webp"
];

const HomePages = () => {
    const [bestSellers, setBestSellers] = useState(null)
    const dispath = useDispatch()
    const {newTours} = useSelector(state => state.tours)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    // Handle search ridirect to Searchtour Component
    const handleSearch = () => {
      navigate(`/tours?name=${encodeURIComponent(searchTerm)}`);
    };
    // get data of user's reducer in store
    const {isLoggedIn, current} =useSelector(state => state.user)
    // Get categories from store
    const { categories } = useSelector(state => state.app);
    // Get tours by axios
    const fetchTours = async () => {
        const response = await apiGetTours({ sort: '-sold' })
        if (response.success) setBestSellers(response.toursData);
    };
    useEffect(() => {
        fetchTours();
        dispath(getNewTours())
    }, []);
    return (
        <div>
            <Headers />
            <section>
                <div className={styles.booking_search_box}>
                    <input type="text" placeholder="Bạn muốn đi đâu?" onChange={(e) => setSearchTerm(e.target.value)} />
                    <button onClick={handleSearch}>Tìm kiếm</button>
                </div>
            </section>
            <section className={styles.nice_place}>
                <div className={styles.container}>
                    <h1>Địa Điểm Nổi Bật</h1>
                    <div className='' id="row">
                        <Slider {...settings}>
                            {bestSellers?.map(el => (
                                <div key={el._id} className={styles.nice_place_item}>
                                    <div className={styles.nice_place_img}>
                                        <img src={ el.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s'} alt={`hình ảnh ${el.name}`} />
                                    </div>
                                    <div className={styles.nice_place_text}>
                                        <h2 className='truncate'>{el.name}</h2>
                                        {(renderRatingStars(el.totalRatings).map(star => star))}
                                       
                                        <p>{el.description}</p>
                                        <Link to={`/${el.category?.name?.toLowerCase()}/${el._id}/${el.name}`}>
                                            <button>Đặt Tour</button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            <section>
                <div className={styles.more}>
                    <div className={styles.discover}>
                        <div className={styles.discover_img}>
                            <div className={styles.img_right}>
                                <div className={styles.right}>
                                    <div className={styles.right_top}>
                                        <img className={styles.img_right_top} alt=""
                                            src="https://danangairportterminal.vn/media/1693/image.jpg?format=jpg&quality=85&mode=crop&width=442&height=528"
                                        />
                                    </div>
                                    <div className={styles.right_bot}>
                                        <img
                                            className={styles.img_right_bot}
                                            alt=""
                                            src="https://nguyengiahotel.com/wp-content/uploads/2020/04/img8.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.img_center}>
                                <div className={styles.box_center}>
                                    <div className={styles.center_right_top}>
                                        <img className={styles.img_center_right_top} alt="" src="https://dulichduthuyen.com.vn/tour/vnt_upload/tour/du_thuyen_da_nang.jpg" />
                                    </div>
                                    <div className={styles.center_left_top}>
                                        <img className={styles.img_center_left_top} alt="" src="https://image.tinnhanhchungkhoan.vn/1200x630/Uploaded/2024/bpikpjik/2023_06_14/da-nang-5-8014.jpg" />

                                        <div className={styles.box_text}>
                                            <div className={styles.heading_container}>
                                                <span className={styles.head_container}>
                                                    <p className={styles.head_text}>THIÊN ĐƯỜNG NGHỈ DƯỠNG</p>
                                                    <p className={styles.head_text}>đà nẵng</p>
                                                </span>
                                            </div>
                                            <div className={styles.box_content}>
                                                <span className={styles.head_container}>
                                                    <p className={styles.head_text}>
                                                        Địa điểm du lịch xinh đẹp Đà Nẵng nằm tại miền trung
                                                        Việt Nam, khí hậu ôn
                                                    </p>
                                                    <p className={styles.head_text}>
                                                        hòa và thời tiết mát mẻ quanh năm, nơi đây bao gôm các
                                                        địa danh du lịch nổi
                                                    </p>
                                                    <p className={styles.head_text}>tiếng […..]</p>
                                                </span>
                                            </div>
                                            <div className={styles.link}>
                                                <a >Xem Thêm...</a>
                                                <div className={styles.before}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.center_bot_r}>
                                        <img className={styles.img_bot_r} alt="" src="https://www.quangbinhtravel.vn/wp-content/uploads/2013/05/ca-chep-rong.jpg" />
                                    </div>
                                    <div className={styles.center_bot_ct}>
                                        <img className={styles.img_center_bot_ct} alt="" src="https://owa.bestprice.vn/images/articles/uploads/top-15-cac-dia-diem-du-lich-da-nang-hot-nhat-ban-khong-the-bo-qua-5ed9cb93af7eb.jpg" />
                                    </div>
                                    <div className={styles.center_bot_b}>
                                        <img className={styles.img_bot_r} alt="" src="https://duan-sungroup.com/wp-content/uploads/2022/10/khu-vuon-co-tich-giua-long-da-nang-e1665823875574.png" />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.img_left}>
                                <div className={styles.left}>
                                    <div className={styles.right_top}>
                                        <img
                                            className={styles.img_right_top}
                                            alt=""
                                            src="https://vcdn1-dulich.vnecdn.net/2022/06/02/Son-Tra-2238-1654169672.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=FScJfxXuNeEPtYatWhzlZg"
                                        />
                                    </div>
                                    <div className={styles.right_bot}>
                                        <img
                                            className={styles.img_right_bot}
                                            alt=""
                                            src="https://booking.muongthanh.com/images/news/2022/07/original/thumbnail_1657768372.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.discover_text}>
                            <div className={styles.quotes}>
                                <span className={styles.head_container}>
                                    <p className={styles.head_text}>
                                        Bạn quá ngột ngạt với khói bụi thành phố, mệt mỏi với những lo
                                        toan thường ngày.
                                    </p>
                                    <p className={styles.head_text}>
                                        Đặt ngay chuyến du lịch để tạm xa thành phố, hòa mình thiên
                                        nhiên tươi đẹp.
                                    </p>
                                </span>
                            </div>
                            <div className={styles.discover_content}>
                                <div className={styles.h_container}>
                                    <span className={styles.head_container}>
                                        <p className={styles.head_text}>
                                            <span className={styles.ndd}>Những điểm đến </span>
                                            <b className={styles.tv}>THÚ VỊ</b>
                                        </p>
                                        <p className={styles.head_text}>
                                            <span className={styles.ang}>đang </span>
                                            <b className={styles.tv}>CHỜ ĐÓN</b>
                                            <span className={styles.ang}> bạn </span>
                                            <b>KHÁM PHÁ !</b>
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.tour}>
                <div className={styles.container}>
                    <h1>Tour Mới Nhất 2024</h1>
                    <div className={styles.tour_content} id="row">

                    {newTours?.map(el => (
                        <div key={el._id} className={styles.tour_content_item} id="row">
                            <div className={styles.tour_content_item_img}>
                                <img src={ el.thumb || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s'} alt={`hình ảnh ${el.name}`} />
                            </div>
                            <div className={styles.tour_content_item_text}>
                                <h2>{el.name}</h2>
                                <p>{el.description}</p>
                                <Link to={`/${el.category?.name?.toLowerCase()}/${el._id}/${el.name}`}><button>Khám phá</button></Link>
                            </div>
                        </div>
                    ))}

                    </div>

                </div>
            </section>

            <section id="review" className={styles.review}>
                <div className={styles.container}>
                    <h1>Đánh giá trải nghiệm</h1>
                    <div className={styles.review_content} id="row">
                        <div className={styles.review_item}>
                            <div className={styles.review_item_text}>
                                <img src="https://cdn-icons-png.flaticon.com/256/5038/5038992.png" alt="" />

                                <p>
                                    <span>&ldquo;</span>
                                    Đà Lạt về đêm không thể thiếu chợ đêm - điểm đến du khách muốn khám phá sự sôi động của thành phố này. Chợ đêm diễn ra từ chiều tối với một loạt các gian hàng bày bán đủ loại hàng hóa.
                                    <span>&rdquo;</span>
                                </p>
                            </div>
                            <div className={styles.review_item_img} id="row">
                                <img src="https://i.pinimg.com/474x/00/a7/f7/00a7f7a8c0c30c7e3e2ed058694d3dc0.jpg" alt="" />
                                <div className={styles.review_item_img_text}>
                                    <h2>User1</h2>
                                    <p>Ngày 12/2/2024</p>
                                </div>

                            </div>
                        </div>
                        <div className={styles.review_item}>
                            <div className={styles.review_item_text}>
                                <img src="https://cdn-icons-png.flaticon.com/256/5038/5038992.png" alt="" />
                                <p>
                                    <span>&ldquo;</span>
                                    Đà Lạt về đêm không thể thiếu chợ đêm – điểm đến du khách muốn khám phá sự sôi động của thành phố này. Chợ đêm diễn ra từ chiều tối với một loạt các gian hàng bày bán đủ loại hàng hóa.
                                    <span>&rdquo;</span>
                                </p>
                            </div>
                            <div className={styles.review_item_img} id="row">
                                <img src="https://i.pinimg.com/474x/75/38/fa/7538faf4f63892f332e8bcea79b7a930.jpg" alt="" />
                                <div className={styles.review_item_img_text}>
                                    <h2>User2</h2>
                                    <p>Ngày 12/2/2024</p>
                                </div>

                            </div>
                        </div>
                        <div className={styles.review_item}>
                            <div className={styles.review_item_text}>
                                <img src="https://cdn-icons-png.flaticon.com/256/5038/5038992.png" alt="" />
                                <p>
                                    <span>&ldquo;</span>
                                    Đà Lạt về đêm không thể thiếu chợ đêm – điểm đến du khách muốn khám phá sự sôi động của thành phố này. Chợ đêm diễn ra từ chiều tối với một loạt các gian hàng bày bán đủ loại hàng hóa.
                                    <span>&rdquo;</span>
                                </p>
                            </div>
                            <div className={styles.review_item_img} id="row">
                                <img src="https://i.pinimg.com/474x/49/e8/a8/49e8a877294b37f0a16f5ec79b6cb60d.jpg" alt="" />
                                <div className={styles.review_item_img_text}>
                                    <h2>User3</h2>
                                    <p>Ngày 12/2/2024</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </section>


            <section id="contact" className={styles.contact}>
                <div className={styles.container}>
                    <h1>Danh sách tour</h1>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation


                        onSlideChange={() => console.log('slide change')}

                    >
                        {categories?.map((el, index) => (
                            <SwiperSlide key={createSlug(el.name)} className='swiper_container ' >

                                <NavLink to={el.name} href="#the-weeknd" className={styles.event}>
                                    <div className={styles.event__image}>
                                        <img src={images[index % images.length]} alt="The Weeknd" className={styles.zoomImage} />
                                        <div className={`${styles.event__indicator} ${styles.event__date}`}>
                                            {el.name} <div className={styles.event__date__month}>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </SwiperSlide>
                        ))}

                    </Swiper>

                </div>
            </section>

        </div>


    );
};

export default HomePages;

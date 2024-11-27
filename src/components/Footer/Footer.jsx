import styles from './Footer.module.css';
const Footer = () => {
	return (
		<footer id="footer" className={styles.footer}>
			<div className="">
				<div className={styles.footer_top}>
					<div className={styles.rows}>
						<div className="col-md-3 col-sm-6">
							<div className={styles.single_footer_widget}>
								<div className={styles.footer_logo}>
									<img src="./img/_Travel Logo.png" alt="" />
								</div>
								<h4>THÔNG TIN CHUYỂN KHOẢN</h4>
								<div className={styles.footer_contact}>
									<p>1. Chủ tài khoản: | STK: |</p>
									<p>Ngân hàng Ngoại Thương (Vietcombank) - Chi nhánh Bến Thành (Khi quý khách có nhu cầu xuất hoá đơn).</p>
								</div>
							</div>
						</div>
						<div className="col-md-2 col-sm-6">
							<div className={styles.single_footer_widget}>
								<h2>THÔNG TIN LIÊN HỆ</h2>
								<ul>
									<p>Địa chỉ :TP HCM</p>
									<p>Điện thoại : </p>
									<p>Hotline : </p>
									<p>Email : </p>
									<p>Website : </p>
								</ul>
							</div>
						</div>
						<div className="col-md-3 col-xs-12">
							<div className={styles.single_footer_widget}>
								<h2>GIỚI THIỆU</h2>
								<div className="row">
									<div className="col-md-7 col-xs-6">
										<ul>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Về chúng tôi</a></li>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Hướng dẫn thanh toán</a></li>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Hướng dẫn đặt tour</a></li>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Bảng giá</a></li>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Tour khuyến mãi</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-3 col-xs-12">
							<div className={styles.single_footer_widget}>
								<h2>CHÍNH SÁCH</h2>
								<div className="row">
									<div className="col-md-7 col-xs-6">
										<ul>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Chính sách bảo mật</a></li>
											<li><a href="#"><i className="fas fa-thin fa-chevron-right"></i> Điều khoản chung</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</footer>




	)
}

export default Footer;
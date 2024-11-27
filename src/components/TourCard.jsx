import React from 'react'
import styles from '../pages/Searchtour/Searchtour.module.css'
import {formatRating, formatMoney} from '../ultils/helpers'
import { Link } from 'react-router-dom'
function TourCard({price, totalRatings, name, image, description, ratings, category, _id}) {
  return (
    <div className={styles.card}>
                        <img src={image} alt={`${name}'s image`} />
                        <div className={styles.content}>
                            <h3>{name}</h3>
                            <p>{description}</p>
                            <div className={styles.rating}>{formatRating(totalRatings, ratings)}</div>
                            {/* <div className={styles.options}>Có lựa chọn hủy miễn phí</div> */}
                            <div className={styles.price}>{`${formatMoney(price)} VNĐ`}</div>
                            <Link to={`/${category.toLowerCase()}/${_id}/${name}`} >
                            <button className={styles.btn_check}> Đặt tour ngay &#10095;</button>
                            </Link>
                        </div>
                    </div>
  )
}

export default TourCard

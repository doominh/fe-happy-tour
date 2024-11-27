import { Link } from 'react-router-dom';
import styles from './headeruser.module.css'; 
const Headeruser = () => {
    return (
        <div className={styles.box}>
            <div className={styles.headeruser}>
               <Link to={'/'}> <img className={styles.rectangle} src="../../../public/img/_Travel.png" /></Link>
            </div>
        </div>
    )
}
export default Headeruser;
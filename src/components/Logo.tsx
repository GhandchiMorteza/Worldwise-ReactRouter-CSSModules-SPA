import styles from './Logo.module.css';
import imageUrl from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      {' '}
      <img src={imageUrl} alt="WorldWise logo" className={styles.logo} />{' '}
    </Link>
  );
}

export default Logo;

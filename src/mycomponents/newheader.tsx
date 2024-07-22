import Image from 'next/image';
import logo from '../../public/logo.png'; // Replace with the path to your logo image
import styles from '../styles/Header.module.css';

export const Header = () => {
  return (
    <div className={styles.header}>
      <Image src={logo} alt="Logo" width={50} height={50} /> {/* Adjust the width and height as needed */}
      <w3m-button />
    </div>
  );
};

export default Header;
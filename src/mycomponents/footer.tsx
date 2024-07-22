"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/Footer.module.css'; // Adjust the path if needed

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.navLinks}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="#" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className={styles.contactInfo}>
          <p>&copy; 2024 ArbiLearn. All Rights Reserved.</p>
          <p>Email: info@arbilearn.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

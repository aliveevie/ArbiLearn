"use client";

import Image from 'next/image';
import styles from '../styles/section1.module.css'; // Adjust the path if needed
import animation from '../public/animation2.gif'; // Adjust the path if needed

export const Section = () => {
  return (
    <div className={styles.section}>
      <Image src={animation} alt="Background animation" className={styles.backgroundImage} layout="fill" />
      <div className={styles.content}>
        <h1>Discover Your Path to Digital Excellence</h1>
        <p>In Web3 by Learning and Earning ARB</p>
      </div>
    </div>
  );
};

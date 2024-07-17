"use client";

import Image from 'next/image';
import styles from '../styles/section2.module.css'; // Adjust the path if needed
import animation from '../../public/animation1.gif'; // Adjust the path if needed

export const Section2 = () => {
  return (
    <div className={styles.section}>
      <div className={styles.animationContainer}>
        <Image src={animation} alt="Rotating world animation" width={500} height={500} />
      </div>
      <div className={styles.textContainer}>
        <h1>Discover Your Path to Digital Excellence</h1>
        <p>Learning and earning ARB in the world of Web3 is your gateway to future opportunities. Gain in-depth knowledge, participate in innovative projects, and get rewarded with ARB. Embark on this journey to enhance your digital skills and financial potential.</p>
        <a href="#" className={styles.button}>Get Started</a>
      </div>
    </div>
  );
};

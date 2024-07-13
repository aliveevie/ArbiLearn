"use client";
"use client";

import Image from 'next/image';
import styles from '../styles/section3.module.css'; // Adjust the path if needed
import animation from '../public/animation3.gif'; // Adjust the path if needed

export const Section3 = () => {
  return (
    <div className={styles.section}>
      <Image src={animation} alt="Background animation" />
      <div className={styles.content}>
        <h1>Learn More, Earn More</h1>
        <p>The more you learn, the more you can earn in the world of Web3. Enhance your skills, participate in innovative projects, and unlock greater rewards with ARB. Start your journey today and maximize your potential.</p>
        <a href="#" className={styles.button}>Get Started</a>
      </div>
    </div>
  );
};


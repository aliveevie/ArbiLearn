// Web3Section.tsx
import { FC } from "react";
import styles from '../styles/home.module.css';
import { Section } from "./section1";
import { Section2 } from "./section2";
import { Section3 } from "./section3";
import { Footer } from "./footer";

const Web3Section: FC = () => {
  return (
      <>
          <section className={styles.web3Section}>
      <div className="container">
        <h1 className={styles.arbilearn}>
          <span className={styles.arbi}>Arbi</span>
          <span className={styles.learn}>Learn</span>
        </h1>
        <p className={styles.learnearn}>
          <span className={styles.learnbig}>Learn</span> and <span className={styles.earnbig}>Earn ARB</span>
          <br /> The best place for Everybody
        </p>
        <div className={styles.comingsoon} >
          <h2>We are building up the resources for you coming soon!</h2>
        </div>
        <div className={styles.ctabuttons}>
          <a href="#" className={`${styles.btn} ${styles.use}`}>Earn</a>
          <a href="#" className={`${styles.btn} ${styles.build}`}>Learn</a>
        </div>
      </div>
    </section>
    <Section />
    <Section2 />
    <Section3 />
    
      </>
  );
};



const HomePage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Web3Section />
    </div>
  );
};

export default HomePage;
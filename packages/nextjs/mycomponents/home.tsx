// Web3Section.tsx
import { FC } from "react";
import styles from '../styles/home.module.css';

const Web3Section: FC = () => {
  return (
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
        <div className={styles.ctabuttons}>
          <a href="#" className={`${styles.btn} ${styles.use}`}>Earn</a>
          <a href="#" className={`${styles.btn} ${styles.build}`}>Learn</a>
        </div>
      </div>
    </section>
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

import styles from '../../styles/SectionTwo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faGraduationCap, faCube } from '@fortawesome/free-solid-svg-icons';
import phone from '../../../public/Assets/Phone1.png'
import world from '../../../public/Assets/BackgroundView2.png'
import Image from 'next/image';

const HeroSectionTwo = () => {
  return (
    <section className={styles.section2Container}>
      <div className={styles.worldContainer}>
        <Image
          src={world} 
          alt="Rotating World" 
          className={styles.rotatingWorld}
        />
        <div className={styles.featuresContainer}>
          <div className={styles.feature}>
            <FontAwesomeIcon icon={faGamepad} className={styles.icon} />
            <h2 className={styles.threeDText}>Gaming-Based Learning</h2>
            <p>Learn through interactive gaming experiences</p>
            <button className={styles.ctaButton}>Start Learning</button>
          </div>
          
          <div className={styles.feature}>
            <FontAwesomeIcon icon={faGraduationCap} className={styles.icon} />
            <h2 className={styles.threeDText}>Professional Growth</h2>
            <p>Advance your career with expert-led courses</p>
            <button className={styles.ctaButton}>Start Learning</button>
          </div>
          
          <div className={styles.feature}>
            <FontAwesomeIcon icon={faCube} className={styles.icon} />
            <h2 className={styles.threeDText}>Immersive 3D Learning</h2>
            <p>Experience education in a new dimension</p>
            <button className={styles.ctaButton}>Start Learning</button>
          </div>
        </div>
      </div>

      <div className={styles.phoneContainer}>
        <Image 
          src={phone}
          alt="Phone Mockup" 
          className={styles.phone}
        />
        <div className={styles.phoneContent}>
          <h1 className={styles.arbiLearn}>ArbiLearn</h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionTwo;
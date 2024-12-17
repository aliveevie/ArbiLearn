import styles from '../../styles/SectionTwo.module.css';
import Image from 'next/image';
import phone from '../../../public/Assets/Phone1.png';
import world from '../../../public/Assets/BackgroundView2.png';

const HeroSectionTwo = () => {
  return (
    <section className={styles.container}>
      <div className={styles.worldWrapper}>
        <Image 
          src={world}
          alt="Rotating World"
          className={styles.world}
        />
      </div>
      
      <div className={styles.phoneWrapper}>
        <Image 
          src={phone}
          alt="Phone Mockup"
          className={styles.phone}
        />
      </div>
    </section>
  );
};

export default HeroSectionTwo;
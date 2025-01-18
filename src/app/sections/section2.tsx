import React from 'react';
import styles from '../../styles/SectionTwo.module.css'
import Image from 'next/image'
import phone from '../../../public/Assets/Phone1.png'
import world from '../../../public/Assets/BackgroundView2.png'
import { VantaBackground } from './vanta'
import Link from 'next/link';

const HeroSectionTwo = () => {
  return (
    <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
      <VantaBackground
        effectScript="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js" 
        effectName="CLOUDS" 
        threeScript="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" 
        config={{}}       
      />
      <div className={styles.container}>
        <div className={styles.worldWrapper}>
          <Image 
            src={world}
            alt="Rotating World"
            className={styles.world}
            priority
          />
        
        </div>
        <div className={styles.phoneWrapper}>
            <Image 
              src={phone} 
              alt="Phone Mockup" 
              className={styles.phone}
              priority
            />
      <div className={styles.phoneContent}>
        <h2 className={styles.phoneHeading}>ArbiLearn</h2>
        <p className={styles.phoneSubtext}>
          Learn, Peep, and Get Rewarded.<br/>
          Your Web3 Journey Made Simple.
        </p>
        <Link href="/pages/app" className={styles.phoneButton}>
          Get Started
        </Link>
      </div>
    </div>
    </div>
    </section>
  )
}

export default HeroSectionTwo

import React from 'react';
import styles from '../../styles/SectionTwo.module.css'
import Image from 'next/image'
import phone from '../../../public/Assets/Phone1.png'
import world from '../../../public/Assets/BackgroundView2.png'
import { VantaBackground } from './vanta'

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
          <div className={styles.textOverlay}>
            <h1 className={styles.theText}>The</h1>
            <div className={styles.worldTechGroup}>
              <h2 className={styles.worldText}>Web3</h2>
              <div className={styles.techContainer}>
                <h2 className={styles.techText}>Tech</h2>
                <span className={styles.handIcon}>👋</span>
              </div>
            </div>
            <button className={styles.ctaButton}>
              Get Started
            </button>
          </div>
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
          Everything simplified on Telegram.<br/>
          Learn Web3 the easy way.
        </p>
        <button className={styles.phoneButton}>
          Join Now
        </button>
      </div>
    </div>
    </div>
    </section>
  )
}

export default HeroSectionTwo

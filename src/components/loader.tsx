import React from 'react'
import styles from '../styles/LoaderComponent.module.css';

export function LoaderComponent() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.dotsContainer}>
        <div className={`${styles.dot} ${styles.dot1}`}></div>
        <div className={`${styles.dot} ${styles.dot2}`}></div>
        <div className={`${styles.dot} ${styles.dot3}`}></div>
        <div className={`${styles.dot} ${styles.dot4}`}></div>
        <div className={`${styles.dot} ${styles.dot5}`}></div>
      </div>
      <div className={styles.verifyingText}>Verifying</div>
      <div className={styles.logoContainer}>
        <svg className={styles.logo} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#4CAF50" />
          <path d="M30 50 L45 65 L70 40" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="85" fontSize="12" fill="white" textAnchor="middle">ArbiLearn</text>
        </svg>
      </div>
    </div>
  )
}
import React, { useState } from 'react';
import styles from '../Innercss/Ambassadors.module.css';
import { genAmbsRef } from '@/server-comps/Abs-server';

const Ambassadors = ({ wallet } : {wallet : string | undefined}) => {
  const [referralLink, setReferralLink] = useState<string>('');

  const generateReferralLink = async () => {
    
    
    try {
      const result = await genAmbsRef(wallet);
      if (result.success) {
        setReferralLink(result.referralLink);
      }
    } catch (error) {
      console.error('Error generating referral link:', error);
      alert('Failed to generate referral link');
    }
  };

  return (
    <div className={styles.ambassadorsContainer}>
      <h1 className={styles.title}>Your works</h1>
      <div className={styles.referralSection}>
        <h2 className={styles.subtitle}>Generate Your Referral Link</h2>
        <div className={styles.inputGroup}>
          <button onClick={generateReferralLink} className={styles.generateBtn}>
            Generate
          </button>
        </div>
        
        {referralLink && (
          <div className={styles.referralLink}>
            <div className={styles.linkDisplay}>
              <input
                type="text"
                value={referralLink}
                readOnly
                className={styles.linkInput}
              />
              <button
                onClick={() => navigator.clipboard.writeText(referralLink)}
                className={styles.copyBtn}
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.statsDashboard}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Referrals</span>
            <span className={styles.statValue}>0</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Successful Onboarding</span>
            <span className={styles.statValue}>0</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total Earnings</span>
            <span className={styles.statValue}>$0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ambassadors;
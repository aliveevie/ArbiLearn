import React, { useState } from 'react';
import styles from '../Innercss/Ambassadors.module.css';

const Ambassadors: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');

  const generateReferralLink = () => {
    if (!name.trim()) {
      alert('Please enter your name to generate a referral link');
      return;
    }
    const baseUrl = window.location.origin;
    setReferralLink(`${baseUrl}/amb?=${encodeURIComponent(name.trim())}`);
  };

  return (
    <div className={styles.ambassadorsContainer}>
      <h1 className={styles.title}>Ambassador Dashboard</h1>
      
      <div className={styles.referralSection}>
        <h2 className={styles.subtitle}>Generate Your Referral Link</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={styles.nameInput}
          />
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
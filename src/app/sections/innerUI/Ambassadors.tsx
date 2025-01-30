import React, { useState, useEffect } from 'react';
import styles from '../Innercss/Ambassadors.module.css';

interface AmbassadorStats {
  referrals: number;
  successfulOnboarding: number;
  earnings: number;
}

const Ambassadors: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [referralLink, setReferralLink] = useState<string>('');
  const [stats, setStats] = useState<AmbassadorStats>({
    referrals: 0,
    successfulOnboarding: 0,
    earnings: 0,
  });

  const generateReferralLink = () => {
    if (!name.trim()) {
      alert('Please enter your name to generate a referral link');
      return;
    }
    const baseUrl = window.location.origin;
    setReferralLink(`${baseUrl}/amb?=${encodeURIComponent(name.trim())}`);
  };

  // Simulated data fetch - Replace with actual API call
  useEffect(() => {
    // Mock data - Replace with actual API call
    const fetchStats = async () => {
      // Simulate API call
      const mockStats = {
        referrals: 15,
        successfulOnboarding: 8,
        earnings: 450,
      };
      setStats(mockStats);
    };

    if (name) {
      fetchStats();
    }
  }, [name]);

  return (
    <div className={styles.ambassadorsContainer}>
      <h1>Ambassador Dashboard</h1>
      
      <div className={styles.referralSection}>
        <h2>Generate Your Referral Link</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={styles.nameInput}
          />
          <button onClick={generateReferralLink} className={styles.generateBtn}>
            Generate Link
          </button>
        </div>
        
        {referralLink && (
          <div className={styles.referralLink}>
            <p>Your Referral Link:</p>
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

      {name && (
        <div className={styles.statsDashboard}>
          <h2>Your Performance Dashboard</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Total Referrals</h3>
              <p>{stats.referrals}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Successful Onboarding</h3>
              <p>{stats.successfulOnboarding}</p>
            </div>
            <div className={styles.statCard}>
              <h3>Total Earnings</h3>
              <p>${stats.earnings}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ambassadors;
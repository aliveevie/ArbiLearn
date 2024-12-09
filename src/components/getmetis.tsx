import { useState, useEffect } from 'react';
import styles from '../styles/GetMetis.module.css';

const GetMetis = () => {
  const [metisPrice, setMetisPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchMetisPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=metis-token&vs_currencies=usd');
        const data = await response.json();
        setMetisPrice(data['metis-token'].usd);
      } catch (error) {
        console.error('Error fetching Metis price:', error);
      }
    };

    fetchMetisPrice();
    const interval = setInterval(fetchMetisPrice, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How to Get Metis (METIS)</h1>
      
      <div className={styles.priceContainer}>
        <div className={styles.priceBox}>
          <h2 className={styles.priceTitle}>Current METIS Price</h2>
          <p className={styles.price}>
            {metisPrice ? `$${metisPrice.toFixed(2)}` : 'Loading...'}
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.subtitle}>Ways to Acquire METIS</h2>
        
        <div className={styles.methodsGrid}>
          <div className={styles.method}>
            <h3>Centralized Exchanges</h3>
            <p>Purchase METIS on major exchanges like Binance, KuCoin, or Gate.io</p>
          </div>

          <div className={styles.method}>
            <h3>Decentralized Exchanges</h3>
            <p>Trade for METIS on DEXs like NetSwap or Hermes Protocol on the Metis network</p>
          </div>

          <div className={styles.method}>
            <h3>Bridge from Ethereum</h3>
            <p>Use the Metis Bridge to transfer ETH or other assets from Ethereum to Metis</p>
          </div>
        </div>
      </div>
    </div>
)}

export default GetMetis
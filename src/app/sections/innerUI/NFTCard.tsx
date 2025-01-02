import React from 'react';
import styles from '../../../styles/NFTCard.module.css';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

interface NFTCardProps {
  name: string;
  image: StaticImageData;
  description: string;
  price: string;
  isFree: boolean;
}

const NFTCard: React.FC<NFTCardProps> = ({ name, image, description, price, isFree }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={image} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{isFree ? 'Free' : `${price} METIS`}</span>
          <button className={styles.button}>
            {isFree ? 'Mint' : 'Buy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
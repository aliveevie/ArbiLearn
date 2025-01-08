import React from 'react';
import styles from '../../../styles/NFTGallery.module.css';
import NFTCard from './NFTCard';
import { StaticImageData } from 'next/image';

interface NFT {
  id: string;
  name: string;
  image: StaticImageData,
  description: string;
  price: string;
  isFree: boolean;
}

interface NFTGalleryProps {
  title: string;
  nfts: NFT[];
  address: string;
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ title, nfts, address }) => {
  return (
    <div className={styles.gallery}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>
        {nfts.map((nft) => (
          <NFTCard
            key={nft.id}
            name={nft.name}
            image={nft.image}
            description={nft.description}
            price={nft.price}
            isFree={nft.isFree}
            address={address}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;


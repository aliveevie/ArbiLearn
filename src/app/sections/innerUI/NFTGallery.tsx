import React from 'react';
import styles from '../../../styles/NFTGallery.module.css';
import NFTCard from './NFTCard';

interface NFT {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  isFree: boolean;
}

interface NFTGalleryProps {
  title: string;
  nfts: NFT[];
}

const NFTGallery: React.FC<NFTGalleryProps> = ({ title, nfts }) => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default NFTGallery;


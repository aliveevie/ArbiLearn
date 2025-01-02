import React from 'react';
import NFTGallery from './NFTGallery';
import styles from '../../../styles/NFTPage.module.css';
import Daisy from "../../../../public/Assets/Daisy.png"
import Rose from "../../../../public/Assets/Rose.jpg"
import Sunflower from "../../../../public/Assets/Sunflower.jpg"
import Orchid from "../../../../public/Assets/Orchid.jpg"
import Lily from "../../../../public/Assets/Lily.jpg"

const freeNFTs = [
  {
    id: '1',
    name: 'ArbiLearn Daisy',
    image: Daisy,
    description: 'Join our community with this beautiful Daisy NFT.',
    price: '0',
    isFree: true,
  },
  {
    id: '2',
    name: 'Metis Rose',
    image: Rose,
    description: 'A Rose NFT symbolizing growth in the Metis ecosystem.',
    price: '0',
    isFree: true,
  },
  {
    id: '3',
    name: 'Metis Sunflower',
    image: Sunflower,
    description: 'Shine bright with this Metis Sunflower NFT.',
    price: '0',
    isFree: true,
  },
];

const paidNFTs = [
  {
    id: '4',
    name: 'ArbiLearn Pro Orchid',
    image: Orchid,
    description: 'Show your expertise with this exclusive Orchid NFT.',
    price: '0.1',
    isFree: false,
  },
  {
    id: '5',
    name: 'Metis Master Lily',
    image: Lily,
    description: 'A Lily NFT for Metis ecosystem masters.',
    price: '0.15',
    isFree: false,
  },
];

const ArbiLearnNFTS: React.FC = () => {
  return (
    <div className={styles.container}>
      <NFTGallery title="Free Community NFTs" nfts={freeNFTs} />
      <NFTGallery title="Premium Support NFTs" nfts={paidNFTs} />
    </div>
  );
};

export default ArbiLearnNFTS;
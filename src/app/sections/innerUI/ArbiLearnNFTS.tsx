import React from 'react';
import NFTGallery from './NFTGallery';
import styles from '../../../styles/NFTPage.module.css';

const freeNFTs = [
  {
    id: '1',
    name: 'ArbiLearn Daisy',
    image: 'https://picsum.photos/seed/arbidaisy/300/300?flower',
    description: 'Join our community with this beautiful Daisy NFT.',
    price: '0',
    isFree: true,
  },
  {
    id: '2',
    name: 'Metis Rose',
    image: 'https://picsum.photos/seed/metisrose/300/300?flower',
    description: 'A Rose NFT symbolizing growth in the Metis ecosystem.',
    price: '0',
    isFree: true,
  },
  {
    id: '3',
    name: 'Arbitrum Sunflower',
    image: 'https://picsum.photos/seed/arbitrumsunflower/300/300?flower',
    description: 'Shine bright with this Arbitrum Sunflower NFT.',
    price: '0',
    isFree: true,
  },
];

const paidNFTs = [
  {
    id: '4',
    name: 'ArbiLearn Pro Orchid',
    image: 'https://picsum.photos/seed/arbiorchid/300/300?flower',
    description: 'Show your expertise with this exclusive Orchid NFT.',
    price: '0.1',
    isFree: false,
  },
  {
    id: '5',
    name: 'Metis Master Lily',
    image: 'https://picsum.photos/seed/metislily/300/300?flower',
    description: 'A Lily NFT for Metis ecosystem masters.',
    price: '0.15',
    isFree: false,
  },
  {
    id: '6',
    name: 'Arbitrum Ace Tulip',
    image: 'https://picsum.photos/seed/arbitrumtulip/300/300?flower',
    description: 'Celebrate your Arbitrum proficiency with this Tulip NFT.',
    price: '0.2',
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
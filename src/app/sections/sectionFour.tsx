'use client'

import React, { useState } from 'react';
import { Gift, ArrowRight, Coins, Zap, Heart, Star } from 'lucide-react';
import MobilePopup from './popupBox';
import '../../styles/SectionFour.css';

const SectionFour: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({
    url: '',
    header: ''
  });

  const handleFinishReading = () => {
    console.log('Finished reading');
    setIsPopupOpen(false);
  };

  const handleMintNFT = () => {
    console.log('Minting NFT');
  };

  const openPopup = (url: string, header: string) => {
    setPopupContent({ url, header });
    setIsPopupOpen(true);
  };

  const grantProviders = [
    { name: 'Gitcoin', icon: Coins, url: 'https://www.gitcoin.co/' },
    { name: 'Octant', icon: Zap, url: 'https://octant.build/' },
    { name: 'Giveth', icon: Heart, url: 'https://giveth.io/' },
    { name: 'Karma', icon: Star, url: 'https://www.karmaprotocol.xyz/' }
  ];

  return (
    <section className="section-four">
      <div className="container">
        <h2 className="section-title">Get Grants</h2>
        <p className="section-subtitle">Welcome to the world of decentralized funding!</p>
        
        <div className="grants-intro">
          <Gift size={48} className="grants-icon" />
          <h3 className="grants-heading">ArbiLearn Grants</h3>
          <p className="grants-description">
            Peep into the future of project development. ArbiLearn offers you the opportunity to secure grants and bring your ideas to life!
          </p>
        </div>

        <div className="grant-providers">
          {grantProviders.map((provider, index) => (
            <div key={index} className="grant-provider-card">
              <provider.icon size={36} className="provider-icon" />
              <h4>{provider.name}</h4>
              <button className="cta-button" onClick={() => openPopup(provider.url, provider.name)}>
                Apply for Grant <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="apply-section">
          <h3 className="apply-heading">Ready to make an impact?</h3>
          <p className="apply-description">
            Don't miss out on this opportunity to fund your project and contribute to the ecosystem.
          </p>
          <button className="main-cta-button">
            Start Your Grant Journey <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <MobilePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        header={popupContent.header}
        finishReading={handleFinishReading}
        mintNFT={handleMintNFT}
        content={{
          type: 'page',
          url: popupContent.url
        }}
      />
    </section>
  );
};

export default SectionFour;
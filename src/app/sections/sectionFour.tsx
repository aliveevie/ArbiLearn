'use client'

import React, { useState } from 'react';
import { Gift, ArrowRight, Coins, Zap, Heart, Star } from 'lucide-react';
import MobilePopup from './popupBox';
import '../../styles/SectionFour.css';
import Image from 'next/image';
import giveth from "../../../public/Ecosystems/giveth.jpg";
import gitcoin from "../../../public/Ecosystems/gitcoin.jpg";
import octant from "../../../public/Ecosystems/octant.png";
import karma from "../../../public/Ecosystems/Karma.jpg";
import Link from 'next/link';

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
    window.location.href = '/pages/app';
  };

  const openPopup = (url: string, header: string) => {
    setPopupContent({ url, header });
    setIsPopupOpen(true);
  };

  const grantProviders = [
    { name: 'Gitcoin', icon: Image, iconSrc: gitcoin, url: 'https://www.gitcoin.co/' },
    { name: 'Octant', icon: Image, iconSrc: octant, url: 'https://octant.build/' },
    { name: 'Giveth', icon: Image, iconSrc: giveth, url: 'https://giveth.io/' },
    { name: 'Karma', icon: Image, iconSrc: karma, url: 'https://www.karmaprotocol.xyz/' }
  ];

  return (
    <section className="section-four">
      <div className="container">
        <h2 className="section-title">Get Grants</h2>
        <p className="section-subtitle">Welcome to the world of decentralized funding!</p>
        
        <div className="grants-intro">
          <Gift size={48} className="grants-icon" />
          <h3 className="grants-heading">Explore Grants</h3>
          <p className="grants-description">
            Peep into the future of project development. ArbiLearn offers you the opportunity to secure grants and bring your ideas to life!
          </p>
        </div>

        <div className="grant-providers">
          {grantProviders.map((provider, index) => (
            <div key={index} className="grant-provider-card">
              <provider.icon 
                src={provider.iconSrc}
                width={36}
                height={36}
                alt={`${provider.name} icon`}
                className="provider-icon"
              />
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
          <Link href="/pages/app" className="main-cta-button">
            Start Your Journey <ArrowRight size={20} />
          </Link>
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
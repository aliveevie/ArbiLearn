'use client'

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { ArrowRight, Gamepad2, Coins, Zap, Rocket } from 'lucide-react';
import '../../styles/HeroSection3.css';
import MobilePopup from './popupBox'



const HeroSection3: React.FC = () => {
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

  return (
    <>
      <section className="hero-section-3">
        <div className="container">
          <h1>Peep and Earn!</h1>
          <p className="subtitle">Arbilearn offers you the opportunity to glimpse these exciting protocols</p>

          <div className="protocols-grid">
            <div className="protocol-card">
              <Gamepad2 size={48} />
              <h3>Gaming</h3>
              <p>Coming Soon!</p>
              <button className="cta-button" onClick={() => openPopup('#', 'Gaming')}>
                Join Waitlist <ArrowRight size={16} />
              </button>
            </div>
            <div className="protocol-card">
              <Coins size={48} />
              <h3>Thrive Protocols</h3>
              <p>Discover how to contribute and earn across protocols</p>
              <button className="cta-button" onClick={() => openPopup('https://www.thriveprotocol.com/', 'Thrive Protocols')}>
                Peep More <ArrowRight size={16} />
              </button>
            </div>
            <div className="protocol-card">
              <Zap size={48} />
              <h3>Metis</h3>
              <p>Dive into layer-2 scaling solutions</p>
              <button className="cta-button" onClick={() => openPopup('https://www.metis.io/', 'Metis')}>
                Peep More <ArrowRight size={16} />
              </button>
            </div>
            <div className="protocol-card">
              <Image src="/arbitrum-logo.svg" alt="Arbitrum Logo" width={48} height={48} />
              <h3>Arbitrum</h3>
              <p>Master Ethereum scaling with Arbitrum</p>
              <button className="cta-button" onClick={() => openPopup('https://arbitrum.io/', 'Arbitrum')}>
                Peep More <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="speedrun-ethereum">
            <Rocket size={48} />
            <h3>Speedrun Ethereum</h3>
            <p>Stay up-to-date with the latest Web3 developments</p>
            <button className="cta-button">Start Glimpsing <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default HeroSection3;


'use client'

import { useState } from 'react';
import React from 'react';
import Image from 'next/image';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import '../../styles/HeroSection3.css';
import MobilePopup from './popupBox'
import Arb from "../../../public/Ecosystems/Arbitrum.png"
import polygon from "../../../public/Ecosystems/polygon.png"
import metis from "../../../public/Ecosystems/metis_l2.jpg"
import thrive from "../../../public/Ecosystems/Thrive_image.jpg"
import ethereum from "../../../public/Ecosystems/ethereum.png"
import bitcoin from "../../../public/Ecosystems/bitcoin.png"
import near from "../../../public/Ecosystems/near-protocol.png"
import xion from "../../../public/Ecosystems/Xion_icon.jpg"
import stack from "../../../public/Ecosystems/stacks.jpg"
import Link from 'next/link';

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
    window.location.href = '/pages/app';
  };

  const ecosystems = [
    { name: 'Arbitrum', image: Arb, url: 'https://arbitrum.io/' },
    { name: 'Polygon', image: polygon, url: 'https://polygon.technology/' },
    { name: 'Metis', image: metis, url: 'https://www.metis.io/' },
    { name: 'Thrive', image: thrive, url: 'https://www.thriveprotocol.com/' },
    { name: 'Ethereum', image: ethereum, url: 'https://ethereum.org/' },
    { name: 'Bitcoin', image: bitcoin, url: 'https://bitcoin.org/' },
    { name: 'NEAR', image: near, url: 'https://near.org/' },
    { name: 'XION', image: xion, url: 'https://xion.global/' },
    { name: 'Stacks', image: stack, url: 'https://www.stacks.co/' },
  ];

  const openPopup = (url: string, header: string) => {
    setPopupContent({ url, header });
    setIsPopupOpen(true);
  };

  return (
    <>
      <section className="hero-section-3" id='peeps-protocols'>
        <div className="container">
          <h1>Peeps Ecosystem</h1>
          <p className="subtitle">Explore and master the leading blockchain ecosystems with ArbiLearn</p>

          <div className="protocols-grid">
            {ecosystems.map((ecosystem, index) => (
              <div className="protocol-card" key={index}>
                <Image src={ecosystem.image} alt={`${ecosystem.name} Logo`} width={48} height={48} />
                <h3>{ecosystem.name}</h3>
                <p>Explore and master the {ecosystem.name} ecosystem</p>
                <button className="cta-button" onClick={() => openPopup(ecosystem.url, ecosystem.name)}>
                  Peep More <ArrowRight size={16} />
                </button>
              </div>
            ))}
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
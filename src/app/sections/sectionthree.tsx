import React from 'react';
import Image from 'next/image';
import { ArrowRight, Gamepad2, Coins, Zap, Rocket } from 'lucide-react';
import '../../styles/HeroSection3.css';

const HeroSection3: React.FC = () => {
  return (
    <section className="hero-section-3">
      <div className="container">
        <h1>Welcome to Learn and Earn!</h1>
        <p className="subtitle">Arbilearn offers you the opportunity to master these exciting protocols</p>
        
        <div className="protocols-grid">
          <div className="protocol-card">
            <Gamepad2 size={48} />
            <h3>Gaming</h3>
            <p>Explore blockchain gaming opportunities</p>
            <button className="cta-button">Learn More <ArrowRight size={16} /></button>
          </div>
          <div className="protocol-card">
            <Coins size={48} />
            <h3>Thrive Protocols</h3>
            <p>Discover innovative DeFi solutions</p>
            <button className="cta-button">Learn More <ArrowRight size={16} /></button>
          </div>
          <div className="protocol-card">
            <Zap size={48} />
            <h3>Metis</h3>
            <p>Dive into layer-2 scaling solutions</p>
            <button className="cta-button">Learn More <ArrowRight size={16} /></button>
          </div>
          <div className="protocol-card">
            <Image src="/arbitrum-logo.svg" alt="Arbitrum Logo" width={48} height={48} />
            <h3>Arbitrum</h3>
            <p>Master Ethereum scaling with Arbitrum</p>
            <button className="cta-button">Learn More <ArrowRight size={16} /></button>
          </div>
        </div>
        
        <div className="speedrun-ethereum">
          <Rocket size={48} />
          <h3>Speedrun Ethereum</h3>
          <p>Stay up-to-date with the latest Web3 developments</p>
          <button className="cta-button">Start Learning <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection3;


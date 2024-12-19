'use client';

import { VantaBackground } from './vanta'
import './welcome.css';
// Make sure to add Font Awesome or your preferred icon library to your project
import { FaBrain, FaChartLine, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';
import SectionHeader from './headerSection';

export function WelcomeSection() {
  return (
    <>
   <section className="relative h-[calc(100vh-4rem)] overflow-hidden">
      <VantaBackground
        effectScript="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        effectName="GLOBE"
        threeScript="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
        config={{
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x6366f1,
          backgroundColor: 0x0a0a0a,
          size: 1.50,
          speed: 1.00
        }} />
      <div className="absolute inset-0 flex items-center px-16">
        <div className="hero-text">
          <h1 className="hero-title">
            <div className="welcome-text">
              <span className="wel">Hey!</span> <br></br>
              <span className="come">This is</span>
            </div>
            <br />
            <div className="welcome-text">
              <span className="arbi">Arbi</span>
              <span className="learn">Learn</span>{' '}
              <BsLightningChargeFill className="inline-block text-yellow-400 text-4xl ml-2" />
            </div>
          </h1>

          <p className="subtitle">
            <span className="icon-wrapper">
              <FaBrain className="text-blue-400" />
            </span>
            Learn Web3 Development
          </p>

          <p className="subtitle">
            <span className="icon-wrapper">
              <FaChartLine className="text-green-400" />
            </span>
            Grow Your User Base
          </p>

          <p className="subtitle">
            <span className="icon-wrapper">
              <FaGraduationCap className="text-purple-400" />
            </span>
            Play & Earn Rewards
          </p>

          <button className="cta-button">
            <FaRocket className="text-xl" />
            Start Now
          </button>
        </div>
      </div>
    </section>
  </>
  );
}
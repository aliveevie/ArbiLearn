'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import '../../styles/Header.css';
import arbilearn from '../../../public/logo.png'
import PeepComponent from './start-peep'


const SectionHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPeepComponent, setShowPeepComponent] = useState(false); // New state for PeepComponent


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleStartPeepsClick = () => {
    setShowPeepComponent(true); // Show PeepComponent when button is clicked
    toggleMenu(); // Optionally close the menu
  };


  return (
    <><div>
      
      <header className="header">
      <div className="header-container">
        <Link href="/" className="logo-link">
          <Image src={arbilearn} alt="ArbiLearn Logo" width={50} height={50} />
        </Link>
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/peeps" className="nav-link" onClick={toggleMenu}>
            Peeps
          </Link>
          <Link href="/join-program" className="nav-link" onClick={toggleMenu}>
            Join Program
          </Link>
          <button className="nav-link cta-button" onClick={handleStartPeepsClick}>
            Start Peeps
          </button>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
       {showPeepComponent && <PeepComponent />} {/* Conditionally render PeepComponent */}
    </div>
    </>
  );
};

export default SectionHeader;


'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import '../../styles/Header.css';
import arbilearn from '../../../public/logo.png'


const SectionHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
          <Link href="/start-peeps" className="nav-link cta-button" onClick={toggleMenu}>
            Start Peeps
          </Link>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default SectionHeader;


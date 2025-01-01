'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import '../../styles/Header.css'
import arbilearn from '../../../public/logo.png'
import PeepsComponent from  './start-peep'


const SectionHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPeepOpen, setIsPeepOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleStartPeepsClick = () => {
    setIsPeepOpen(true)
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  const handleClosePeep = () => {
    setIsPeepOpen(false)
  }

  return (
    <>
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
            <Link href="/pages/app" className="nav-link cta-button">
              Start Peeps
            </Link>
          </nav>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>
      {/* {isPeepOpen && <PeepsComponent onClose={handleClosePeep} />} */}
    </>
  )
}

export default SectionHeader


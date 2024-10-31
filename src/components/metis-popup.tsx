'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, ArrowLeft } from 'lucide-react'
import './MetisPopup.css'
import metiNFT from '../../public/MetilNFT.png'
import MintNFTComponent from './mint-nft-component'

const MetisPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showMintComponent, setShowMintComponent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)
  const handleMint = () => setShowMintComponent(true)
  const handleBack = () => setShowMintComponent(false)

  if (!isOpen) return null

  return (
    <div className="popup-overlay">
      <div className={`popup-container ${showMintComponent ? 'mint-mode' : ''}`}>
        <div className="popup-header" />
        {showMintComponent ? (
          <div className="mint-wrapper">
            <button onClick={handleBack} className="popup-back-button">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <MintNFTComponent />
          </div>
        ) : (
          <>
            <button onClick={handleClose} className="popup-close">
              <X size={24} />
            </button>
            <div className="popup-content">
              <div className="popup-image-container">
                <div className="popup-image-overlay" />
                <Image
                  src={metiNFT}
                  alt="MetilLearn NFT Concept"
                  width={400}
                  height={200}
                  className="popup-image"
                />
              </div>

              <h2 className="popup-title">
                Discover MetilLearn NFT
              </h2>

              <p className="popup-description">
                Embark on a journey to master Metis blockchain technology and mint your
                exclusive MetilLearn NFT. Join our community of learners and unlock
                unprecedented opportunities in the decentralized ecosystem!
              </p>

              <div className="popup-buttons">
                <button
                  onClick={handleClose}
                  className="popup-button popup-button-secondary"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleMint}
                  className="popup-button popup-button-primary"
                >
                  Mint NFT
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MetisPopup
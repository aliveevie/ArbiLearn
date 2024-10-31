'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ArrowLeft } from 'lucide-react'
import './MetisPopup.css'
import metiNFT from '../../public/MetilNFT.png'

const MetisPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showMintInterface, setShowMintInterface] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)
  const handleMint = () => setShowMintInterface(true)
  const handleBack = () => setShowMintInterface(false)

  if (!isOpen) return null

  return (
    <div className="popup-overlay">
      <div className={`popup-container ${showMintInterface ? 'mint-mode' : ''}`}>
        <div className="popup-header" />
        {showMintInterface ? (
          <div className="mint-wrapper">
            <button onClick={handleBack} className="popup-back-button">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <iframe
              src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x4de4F5eCad3d6B145450467d6B592b58F6aB7F6f&chain=%7B%22name%22%3A%22Metis+Sepolia+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F59902.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22tMetis%22%2C%22symbol%22%3A%22tMETIS%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22metis-sepolia%22%2C%22chainId%22%3A59902%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22metis-sepolia-testnet%22%7D&clientId=e4d51769fcc92b76042b7b13f041e01e&theme=dark&primaryColor=purple"
              className="w-full h-[calc(100%-3rem)] border-none"
            />
          </div>
        ) : (
          <div className="popup-content">
            <button onClick={handleClose} className="popup-close">
              <X size={24} />
            </button>

            <div className="popup-image-container">
              <div className="popup-image-overlay" />
              <Image
                src={metiNFT}
                alt="MetilLearn NFT"
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
        )}
      </div>
    </div>
  )
}

export default MetisPopup
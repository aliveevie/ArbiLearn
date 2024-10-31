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
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4 bg-blue">
      <div className={`relative w-full max-w-lg rounded-xl overflow-hidden ${showMintInterface ? 'h-[80vh]' : ''}`}>
        {/* Gradient header line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-20" />
        
        {showMintInterface ? (
          <div className="relative h-full bg-[#1a1b1f]">
            <button 
              onClick={handleBack}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 text-white-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="h-full pt-14">
              <iframe
                src="https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0x4de4F5eCad3d6B145450467d6B592b58F6aB7F6f&chain=%7B%22name%22%3A%22Metis+Sepolia+Testnet%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F59902.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22tMetis%22%2C%22symbol%22%3A%22tMETIS%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22metis-sepolia%22%2C%22chainId%22%3A59902%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22metis-sepolia-testnet%22%7D&clientId=e4d51769fcc92b76042b7b13f041e01e&theme=dark&primaryColor=purple"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        ) : (
          <div className="popup-content popup-container">
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

export default MetisPopup;
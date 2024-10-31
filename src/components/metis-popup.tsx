'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import metifNFT from '../../public/MetilNFT.png'

const MetisPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)
  const handleMint = () => router.push('/metil-learn')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-b from-purple-400/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 rounded-xl" />
            <Image
              src={metifNFT}
              alt="MetilLearn NFT Concept"
              width={400}
              height={200}
              className="w-full h-[200px] object-cover rounded-xl"
            />
          </div>

          <h2 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Discover MetilLearn NFT
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Embark on a journey to master Metis blockchain technology and mint your
            exclusive MetilLearn NFT. Join our community of learners and unlock
            unprecedented opportunities in the decentralized ecosystem!
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 rounded-xl font-medium transition-colors"
            >
              Maybe Later
            </button>
            <button
              onClick={handleMint}
              className="flex-1 px-6 py-3 text-white font-medium bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-colors"
            >
              Mint NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetisPopup
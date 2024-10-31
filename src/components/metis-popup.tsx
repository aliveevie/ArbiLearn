'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const MetisPopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)
  const handleContinue = () => router.push('/metil-learn')

  const handleImageError = () => {
    console.error('Failed to load image')
    setImageError(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="mb-4">
          {!imageError ? (
            <Image
              src="/placeholder.svg?height=300&width=400&text=MetilLearn+NFT"
              alt="MetilLearn NFT Concept"
              width={400}
              height={300}
              className="w-full h-auto rounded-lg shadow-md"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
              <p className="text-gray-500">Failed to load image</p>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Discover MetilLearn NFT
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Embark on a journey to master Metis blockchain technology and mint your
          exclusive MetilLearn NFT. Unlock a world of opportunities in the
          decentralized ecosystem!
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
          >
            Maybe Later
          </button>
          <button
            onClick={handleContinue}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default MetisPopup
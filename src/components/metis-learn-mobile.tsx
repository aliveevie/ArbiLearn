'use client'

import React from 'react'
import { motion } from 'framer-motion'

const MetisLearnMobile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden relative">
      {/* Metis decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="metisGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#metisGradient)" />
          <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <path d="M0,70 Q35,20 70,70 T100,70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8">
        <header className="text-center mb-8">
          <motion.h1 
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to MetisLearn
          </motion.h1>
          <motion.p 
            className="text-lg text-blue-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Master everything about Metis blockchain
          </motion.p>
        </header>

        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Learn Metis Essentials</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Metis Blockchain Fundamentals</li>
            <li>• Smart Contract Development</li>
            <li>• Decentralized Applications (DApps)</li>
            <li>• Layer 2 Scaling Solutions</li>
          </ul>
        </motion.div>

        <motion.div 
          className="bg-blue-700 rounded-lg shadow-lg p-6 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Why Choose MetisLearn?</h2>
          <ul className="space-y-2">
            <li>✓ Comprehensive curriculum</li>
            <li>✓ Hands-on projects</li>
            <li>✓ Expert instructors</li>
            <li>✓ Community support</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default MetisLearnMobile
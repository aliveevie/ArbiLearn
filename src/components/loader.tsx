'use client'

import React from 'react'

export function LoaderComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-8">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-300"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-500"></div>
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-4">Verifying</div>
      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="#4CAF50" />
          <path d="M30 50 L45 65 L70 40" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="50" y="85" fontSize="12" fill="white" textAnchor="middle">ArbiLearn</text>
        </svg>
      </div>
    </div>
  )
}

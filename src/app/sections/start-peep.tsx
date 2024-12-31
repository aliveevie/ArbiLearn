'use client'

import { useState, useEffect } from 'react'
import { LoginFormComponent } from "@/components/login-form"
import '../../styles/peepComp.css'
import AndroidBackgrond from './androidBack'

interface PeepComponentProps {
  onClose: () => void;
}

export default function PeepComponent({ onClose }: PeepComponentProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [showPhones, setShowPhones] = useState(false)

  useEffect(() => {
    document.body.classList.add('peep-active')
    return () => {
      document.body.classList.remove('peep-active')
    }
  }, [])

  useEffect(() => {
    if (isRegistering) {
      setShowPhones(true)
    }
  }, [isRegistering])

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    setIsExpanded(false)
  }
  
  const handleExpand = () => {
    setIsExpanded(!isExpanded)
    setIsMinimized(false)
  }

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    if (option === 'browser') {
      setIsRegistering(true)
    }
  }

  const doubleBackBrowserButton = () => {
    setIsRegistering(false)
    setSelectedOption(null)
  }

  return (
    <div className="peep-overlay">
      <div 
        className={`peep-container ${isMinimized ? 'minimized' : ''} ${
          isExpanded ? 'expanded' : ''
        }`}
      >
        <div className="status-bar">
          <div className="status-bar-left" />
          <div className="status-controls">
            <button 
              className="status-dot dot-close"
              onClick={onClose}
              aria-label="Close"
            />
            <button 
              className="status-dot dot-minimize"
              onClick={handleMinimize}
              aria-label="Minimize"
            />
            <button 
              className="status-dot dot-expand"
              onClick={handleExpand}
              aria-label="Expand"
            />
          </div>
        </div>

        <div className="peep-content">
          {!selectedOption && !isRegistering && (
            <>
              <h2 className="peep-title">Where would you like to continue?</h2>
              <div className="peep-buttons">
                <button
                  className="peep-button"
                  onClick={() => handleOptionClick('farcaster')}
                >
                  Farcaster
                </button>
                <button
                  className="peep-button"
                  onClick={() => handleOptionClick('telegram')}
                >
                  Telegram
                </button>
                <button
                  className="peep-button"
                  onClick={() => handleOptionClick('browser')}
                >
                  Stay on Browser
                </button>
              </div>
            </>
          )}

          {selectedOption && selectedOption !== 'browser' && (
            <>
              <h2 className="peep-title">Feature in Progress</h2>
              <p className="text-white/60 mb-6">
                We're currently working on integrating with {selectedOption}. 
                Please check back soon!
              </p>
              <button
                className="peep-button"
                onClick={() => setSelectedOption(null)}
              >
                Go Back
              </button>
            </>
          )}

          {isRegistering && (
            <div className="profile-container">
              <LoginFormComponent />
      
            </div>
          )}
        </div>

        <div className="home-indicator">
          <div className="home-indicator-bar" />
        </div>
      </div>
    </div>
  )
}

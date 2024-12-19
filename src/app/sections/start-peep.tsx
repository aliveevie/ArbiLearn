'use client'

import { useState } from 'react'
import { X, Minus, Maximize2 } from 'lucide-react'
import '../../styles/peepComp.css'

export default function PeepComponent() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  const handleClose = () => setIsOpen(false)
  
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

  if (!isOpen) return null

  return (
    <div className="peep-overlay">
      <div 
        className={`peep-container ${isMinimized ? 'minimized' : ''} ${
          isExpanded ? 'expanded' : ''
        }`}
      >
        <div className="peep-controls">
          <button onClick={handleClose} className="peep-control-btn">
            <X />
          </button>
          <button onClick={handleMinimize} className="peep-control-btn">
            <Minus />
          </button>
          <button onClick={handleExpand} className="peep-control-btn">
            <Maximize2 />
          </button>
        </div>

        <div className="peep-content">
          {!selectedOption && !isRegistering && (
            <>
              <h2 className="peep-title">Where would you like to continue?</h2>
              <div className="peep-buttons">
                <button
                  className="peep-button farcaster"
                  onClick={() => handleOptionClick('farcaster')}
                >
                  Farcaster
                </button>
                <button
                  className="peep-button telegram"
                  onClick={() => handleOptionClick('telegram')}
                >
                  Telegram
                </button>
                <button
                  className="peep-button browser"
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
                className="peep-button browser"
                onClick={() => setSelectedOption(null)}
              >
                Go Back
              </button>
            </>
          )}

          {isRegistering && (
            <div className="peep-form">
              <h2 className="peep-title">Register</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="peep-form-group">
                  <label className="peep-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="peep-input"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="peep-form-group">
                  <label className="peep-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="peep-input"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="peep-form-group">
                  <label className="peep-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="peep-input"
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="peep-button browser">
                  Register
                </button>
                <div className="peep-divider">or</div>
                <button type="button" className="peep-button farcaster">
                  Connect Wallet
                </button>
                <button
                  type="button"
                  className="peep-button telegram mt-4"
                  onClick={() => setIsRegistering(false)}
                >
                  Go Back
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


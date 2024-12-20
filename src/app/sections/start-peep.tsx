'use client'

import { useState, useEffect } from 'react'
import { X, Minus, Maximize2 } from 'lucide-react'
import '../../styles/peepComp.css'
import { LoginFormComponent } from "@/components/login-form";

interface PeepComponentProps {
  onClose: () => void;
}

export default function PeepComponent({ onClose }: PeepComponentProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    document.body.classList.add('peep-active')
    return () => {
      document.body.classList.remove('peep-active')
    }
  }, [])

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
    <div className={`peep-overlay ${isMinimized ? 'minimized' : ''}`}>
      <div 
        className={`peep-container ${isMinimized ? 'minimized' : ''} ${
          isExpanded ? 'expanded' : ''
        }`}
      >
        <div className="peep-controls">
          <button onClick={onClose} className="peep-control-btn">
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

          {isRegistering &&  (
            <div className="peep-form">
            <LoginFormComponent />

                <button
                  type="button"
                  className="peep-button telegram mt-4"
                  onClick={doubleBackBrowserButton}
                >
                  Go Back
                </button>
             
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


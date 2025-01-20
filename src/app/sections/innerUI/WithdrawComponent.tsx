'use client'

import React from 'react'
import { X } from 'lucide-react'
import '../../../styles/withdraw.css'

interface WithdrawComponentProps {
  onClose: () => void
}

const WithdrawComponent: React.FC<WithdrawComponentProps> = ({ onClose }) => {
  // Mock data - replace with actual data from your state management
  const totalPoints = 500 // Example points
  const totalEarnings = 5.00
  const minimumPoints = 1000

  const canWithdraw = totalPoints >= minimumPoints

  return (
    <div className="withdraw-overlay">
      <div className="withdraw-modal">
        <div className="modal-header">
          <h2>Withdraw Earnings</h2>
          <button 
            onClick={onClose}
            className="close-button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div className="stats-container">
            <div className="stats-row">
              <span>Total Points:</span>
              <span className="bold">{totalPoints}</span>
            </div>
            <div className="stats-row">
              <span>Total Earnings:</span>
              <span className="bold">${totalEarnings.toFixed(2)}</span>
            </div>
          </div>

          {!canWithdraw ? (
            <div className="warning-box">
              <h3>
                Not Eligible for Withdrawal
              </h3>
              <p>
                You need at least {minimumPoints} points to withdraw. 
                Here's what you can do to earn more points:
              </p>
              <ul>
                <li>Complete more courses</li>
                <li>Participate in community activities</li>
                <li>Earn achievement badges</li>
                <li>Refer friends to ArbiLearn</li>
              </ul>
            </div>
          ) : (
            <button
              className="withdraw-button"
              onClick={() => {
                // Implement withdrawal logic here
                console.log('Processing withdrawal...')
              }}
            >
              Withdraw Earnings
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default WithdrawComponent
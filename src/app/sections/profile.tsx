'use client'

import { useState } from 'react'
import { useActiveAccount, useWalletBalance } from "thirdweb/react"
import { Edit, Book, Award, Gift, CheckCircle, Layers, Coins, Upload, ArrowLeft } from 'lucide-react'
import { ConnectThirdWebWallet } from '@/thirdweb/thirdwebwallet'
import Courses from './innerUI/course'
import ArbiLearnNFTS from './innerUI/ArbiLearnNFTS'
import ALearnTokenSale from './innerUI/tokenSale'
import EarnPoints from './innerUI/Points'
import { createThirdwebClient } from 'thirdweb'
import '../../styles/profileSection.css'
import { client } from '@/thirdweb/thirdwebwallet'

interface UserAction {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  hoverButtons: string[]
  onclick?: () => void
}

export default function ProfileSection() {
  const account = useActiveAccount()
  const address = account?.address

   // @ts-ignore
  const { data: balance } = useWalletBalance({
    address: account?.address,
    client
  })

  const [activeView, setActiveView] = useState<'main' | 'courses' | 'nfts' | 'tokens' | 'points'>('main')
  const [isEditing, setIsEditing] = useState(false)

  const userActions: UserAction[] = [
    {
      id: 1,
      title: 'Courses Enrolled',
      description: 'Web3 fundamentals, Smart Contracts',
      icon: <Book size={20} />,
      hoverButtons: ['Browse Courses'],
      onclick: () => setActiveView('courses')
    },
    {
      id: 2,
      title: 'Get NFTs',
      description: 'Get your free and paid NFTs',
      icon: <Layers size={20} />,
      hoverButtons: ['Get NFTs'],
      onclick: () => setActiveView('nfts')
    },
    {
      id: 3,
      title: 'Token Sale',
      description: 'Support ArbiLearn on their mission',
      icon: <Coins size={20} />,
      hoverButtons: ['Buy Tokens'],
      onclick: () => setActiveView('tokens')
    },
    {
      id: 4,
      title: 'Earn Points',
      description: 'Complete actions to earn points and unlock valuable tokens and NFTs',
      icon: <CheckCircle size={20} />,
      hoverButtons: ['Earn Points'],
      onclick: () => setActiveView('points')
    },
  ]

  const renderView = () => {
    switch (activeView) {
      case 'courses':
        return (
          <div>
            <button className="back-button" onClick={() => setActiveView('main')}>
              <ArrowLeft size={18} /> Back to Profile
            </button>
            <Courses
            address={address}
            />
          </div>
        )
      case 'nfts':
        return (
          <div>
            <button className="back-button" onClick={() => setActiveView('main')}>
              <ArrowLeft size={18} /> Back to Profile
            </button>
            {address ? (
              <ArbiLearnNFTS 
                address={address}
              />
            ) : (
              <div>Please provide a valid address.</div>
            )}
          </div>
        )
      case 'tokens':
        return (
          <div>
            <button className="back-button" onClick={() => setActiveView('main')}>
              <ArrowLeft size={18} /> Back to Profile
            </button>
            <ALearnTokenSale />
          </div>
        )
      case 'points':
        return (
          <div>
            <button className="back-button" onClick={() => setActiveView('main')}>
              <ArrowLeft size={18} /> Back to Profile
            </button>
            <EarnPoints />
          </div>
        )
      default:
        return (
          <div>
            <div className="profile-stats">
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">NFTs Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {balance ? balance.displayValue : '0'}
                </div>
                <div className="stat-label">Tokens Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Points Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Courses Completed</div>
              </div>
            </div>

            <div className="action-list">
              {userActions.map((action) => (
                <div 
                  key={action.id} 
                  className="action-item"
                  onClick={action.onclick}
                >
                  <div className="action-icon">
                    {action.icon}
                  </div>
                  <div className="action-content">
                    <div className="action-title">{action.title}</div>
                    <div className="action-description">{action.description}</div>
                  </div>
                  <div className="action-hover">
                    {action.hoverButtons.map((button, index) => (
                      <button 
                        key={index} 
                        className="hover-button"
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            <ConnectThirdWebWallet />
          </div>
          
        </div>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          <Edit size={18} />
        </button>
      </div>
      {account ? renderView() : (
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">--</div>
            <div className="stat-label">NFTs Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">--</div>
            <div className="stat-label">Tokens Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">--</div>
            <div className="stat-label">Points Earned</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">--</div>
            <div className="stat-label">Courses Completed</div>
          </div>
        </div>
      )}
    </div>
  )
}
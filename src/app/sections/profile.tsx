'use client'

import { useEffect, useState } from 'react'
import { Edit, Book, Award, Gift, CheckCircle, Layers, Coins, Upload, ArrowLeft } from 'lucide-react'
import { ConnectThirdWebWallet } from '@/thirdweb/thirdwebwallet'
import Courses from './innerUI/course'
import ArbiLearnNFTS from './innerUI/ArbiLearnNFTS'
import ALearnTokenSale from './innerUI/tokenSale'
import EarnPoints from './innerUI/Points'
import { createThirdwebClient } from 'thirdweb'
import '../../styles/profileSection.css'
import Image from 'next/image'
import WithdrawComponent from './innerUI/WithdrawComponent'

import type React from "react";
import { claimTo, getOwnedNFTs } from "thirdweb/extensions/erc1155";
import {
	TransactionButton,
	useActiveAccount,
	useReadContract,
  useWalletBalance
} from "thirdweb/react";
import {
	client,
	editionDropContract,
	editionDropTokenId,
} from "@/thirdweb/constant";

import { getWalletAddress } from '@/server-comps/wallet'

interface UserAction {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  hoverButtons: string[]
  onclick?: () => void
}

export default function ProfileSection() {
  const smartAccount = useActiveAccount()
  const address = smartAccount?.address
  const [mintingSuccess, setMintingSuccess] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [mintingError, setMintingError] = useState<string>('')
  const [showNFTDetails, setShowNFTDetails] = useState(false)

  const { data: ownedNfts, refetch: refetchNfts } = useReadContract(getOwnedNFTs, {
    contract: editionDropContract,
    address: smartAccount?.address!,
    queryOptions: { enabled: !!smartAccount },
  });

  const isMember = ownedNfts && ownedNfts.length > 0;

  // @ts-ignore
  const { data: balance } = useWalletBalance({
    address: smartAccount?.address,
    client
  })

  const [activeView, setActiveView] = useState<'main' | 'courses' | 'nfts' | 'tokens' | 'points'>('main')
  const [isEditing, setIsEditing] = useState(false)
  const [showWithdraw, setShowWithdraw] = useState(false)

  //@ts-ignore
  getWalletAddress(smartAccount?.address)

  const handleNFTClick = () => {
    setShowNFTDetails(!showNFTDetails)
  }

  const renderNFTDetails = () => {
    if (!showNFTDetails || !ownedNfts) return null;

    return (
      <div className="nft-details-modal">
        <div className="nft-details-content">
          <button className="close-button" onClick={() => setShowNFTDetails(false)}>×</button>
          <h3>ArbiClub Membership NFT</h3>
          <div className="nft-image">
            <img
              src={ownedNfts[0].metadata.image}
              alt="Membership NFT"
            />
          </div>
        
            <a 
              href={`https://andromeda-explorer.metis.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transaction-link"
            >
              View Mint Transaction
            </a>   
        </div>
      </div>
    );
  };

  const renderMintingSuccess = () => {
    return (
      <div className="minting-success">
        <h2>🎉 Congratulations!</h2>
        <p>You are now an ArbiClub Member</p>
        {transactionHash && (
          <a 
            href={`https://andromeda-explorer.metis.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transaction-link"
          >
            View Transaction
          </a>
        )}
      </div>
    );
  };

  const renderMintingError = () => {
    return (
      <div className="minting-error">
        <p>Error minting: {mintingError}</p>
        <p>Please try again</p>
      </div>
    );
  };

  const renderNoMembership = () => {
    return (
      <div className="no-membership">
        <h2>No Membership NFT</h2>
        <p>You need to mint an ArbiLearn Membership NFT to access the platform features.</p>
        <TransactionButton
          transaction={() =>
            claimTo({
              contract: editionDropContract,
              tokenId: editionDropTokenId,
              to: smartAccount?.address!,
              // @ts-ignore
              quantity: 1n,
            })
          }
          onError={(error) => {
            setMintingError(error.message);
            setTimeout(() => setMintingError(''), 5000);
          }}
          onTransactionConfirmed={async (result) => {
            setTransactionHash(result.transactionHash);
            setMintingSuccess(true);
            await refetchNfts();
            setTimeout(() => {
              setMintingSuccess(false);
             // setTransactionHash('');
            }, 5000);
          }}
        >
          Mint Membership NFT
        </TransactionButton>
        {mintingError && renderMintingError()}
        {mintingSuccess && renderMintingSuccess()}
      </div>
    );
  };

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
    if (!isMember) {
      return renderNoMembership();
    }

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
            <EarnPoints 
            smartAccount={smartAccount?.address}
            />
          </div>
        )
      default:

        return (
          <div>
            <div className="profile-stats">
              <div 
                className="stat-item clickable"
                onClick={handleNFTClick}
                title="Click to view NFT details"
              >
                <div className="stat-value">
                  {ownedNfts?.length || 0}
                  {isMember && <span className="member-indicator">✓</span>}
                </div>
                <div className="stat-label">Membership NFT</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Points Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">0</div>
                <div className="stat-label">Courses Completed</div>
              </div>
              <div 
                  className="stat-item clickable"
                  onClick={() => setShowWithdraw(true)}
                  title="Click to withdraw earnings"
                >
                  <div className="stat-value">$5.00</div>
                  <div className="stat-label">Rewards</div>
                </div>
                {showWithdraw && <WithdrawComponent onClose={() => setShowWithdraw(false)} />}

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
      </div>
      {smartAccount ? renderView() : (
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
      {renderNFTDetails()}
    </div>
  )
}
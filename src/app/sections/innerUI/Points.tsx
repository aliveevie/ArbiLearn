'use client'

import React, { useState } from 'react'
import { UserCircle, BookOpen, MessageCircle, Share2, Copy, Check, ExternalLink, X } from 'lucide-react'
import '../../../styles/EarnPoints.css'

interface UserProfile {
  name: string;
  email: string;
  xHandle: string;
  discord: string;
  telegram: string;
  bio: string;
}

interface EarnOption {
  icon: React.ReactNode
  title: string
  points: number
  description: string
  action: () => void
}

export default function EarnPoints() {
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const profileData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      xHandle: formData.get('xHandle') as string,
      discord: formData.get('discord') as string,
      telegram: formData.get('telegram') as string,
      bio: formData.get('bio') as string,
    };

    // Log the data to server (you'll need to implement the actual API endpoint)
    console.log('Profile data submitted:', profileData);
    setProfile(profileData);
    setIsProfileComplete(true);
    setShowProfileForm(false);
  };

  const generateReferralLink = () => {
    // Replace with actual user ID or referral code generation
    const referralCode = Math.random().toString(36).substring(7);
    return `https://arbilearn.com/refer/${referralCode}`;
  };

  const handleCopyReferral = async () => {
    const referralLink = generateReferralLink();
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = {
    discord: 'https://discord.gg/4ZZKRYVE',
    x: 'https://x.com/ArbiLearn',
    telegram: 'https://t.me/+Ygy97nUwmpRjNTk0'
  };

  const earnOptions: EarnOption[] = [
    {
      icon: <UserCircle className="card-icon" />,
      title: isProfileComplete ? 'View Profile' : 'Complete Your Profile',
      points: 100,
      description: isProfileComplete 
        ? 'Your profile is complete. Click to view or edit.'
        : 'Fill out all sections of your profile to earn points and help us personalize your experience.',
      action: () => setShowProfileForm(true)
    },
    {
      icon: <BookOpen className="card-icon" />,
      title: 'Enroll in Programs',
      points: 1000,
      description: 'Sign up for educational programs to earn points and expand your knowledge.',
      action: () => alert('Please visit the courses section to enroll in programs.')
    },
    {
      icon: <MessageCircle className="card-icon" />,
      title: 'Join Our Community',
      points: 50,
      description: 'Connect with fellow learners and earn points by joining our vibrant communities.',
      action: () => setShowCommunityModal(true)
    },
    {
      icon: <Share2 className="card-icon" />,
      title: 'Refer Friends',
      points: 500,
      description: 'Share ArbiLearn with friends and earn rewards when they join.',
      action: () => setShowReferralModal(true)
    }
  ];

  return (
    <div className="earn-points-container">
      <header className="earn-points-header">
        <h1 className="earn-points-title">Earn Points</h1>
        <p className="earn-points-subtitle">Complete actions to earn points and unlock valuable tokens and NFTs</p>
      </header>

      {showProfileForm && (
        <div className="profile-form-overlay">
          <div className="profile-form-container">
            <button className="close-button" onClick={() => setShowProfileForm(false)}>×</button>
            <h2>{isProfileComplete ? 'Edit Profile' : 'Complete Your Profile'}</h2>
            <form onSubmit={handleProfileSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                defaultValue={profile?.name || ''}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={profile?.email || ''}
                required
              />
              <input
                type="text"
                name="xHandle"
                placeholder="X Handle"
                defaultValue={profile?.xHandle || ''}
                required
              />
              <input
                type="text"
                name="discord"
                placeholder="Discord Username"
                defaultValue={profile?.discord || ''}
                required
              />
              <input
                type="text"
                name="telegram"
                placeholder="Telegram Username"
                defaultValue={profile?.telegram || ''}
                required
              />
              <textarea
                name="bio"
                placeholder="Short Bio"
                defaultValue={profile?.bio || ''}
                required
              ></textarea>
              <button type="submit">
                {isProfileComplete ? 'Update Profile' : 'Complete Profile'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showReferralModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Share ArbiLearn</h2>
              <button 
                className="close-button" 
                onClick={() => setShowReferralModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="referral-content">
              <p>Share your unique referral link and earn 500 points for each friend who joins!</p>
              <div className="referral-link-container">
                <input 
                  type="text" 
                  value={generateReferralLink()} 
                  readOnly 
                  className="referral-input"
                />
                <button 
                  className="copy-button"
                  onClick={handleCopyReferral}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <div className="social-share-buttons">
                <button onClick={() => window.open(`https://x.com/intent/tweet?text=Join me on ArbiLearn!&url=${generateReferralLink()}`)}>
                  Share on X
                </button>
                <button onClick={() => window.open(`https://t.me/share/url?url=${generateReferralLink()}&text=Join me on ArbiLearn!`)}>
                  Share on Telegram
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCommunityModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Join Our Communities</h2>
              <button 
                className="close-button" 
                onClick={() => setShowCommunityModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="community-links">
              <a 
                href={socialLinks.discord} 
                target="_blank" 
                rel="noopener noreferrer"
                className="community-link discord"
              >
                <img src="/discord-icon.svg" alt="Discord" />
                <span>Join Discord</span>
                <ExternalLink size={16} />
              </a>
              <a 
                href={socialLinks.x} 
                target="_blank" 
                rel="noopener noreferrer"
                className="community-link x"
              >
                <img src="/x-icon.svg" alt="X" />
                <span>Follow on X</span>
                <ExternalLink size={16} />
              </a>
              <a 
                href={socialLinks.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="community-link telegram"
              >
                <img src="/telegram-icon.svg" alt="Telegram" />
                <span>Join Telegram</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="earn-points-grid">
        {earnOptions.map((option, index) => (
          <div 
            key={index} 
            className="earn-points-card"
            onClick={option.action}
            role="button"
            tabIndex={0}
          >
            {option.icon}
            <h2 className="card-title">{option.title}</h2>
            <p className="card-points">{option.points} Points</p>
            <p className="card-description">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
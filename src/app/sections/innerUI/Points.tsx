'use client'

import React from 'react'
import { UserCircle, BookOpen, GraduationCap, MessageCircle, Share2, Award } from 'lucide-react'
import '../../../styles/EarnPoints.css'

interface EarnOption {
  icon: React.ReactNode
  title: string
  points: number
  description: string
}

const earnOptions: EarnOption[] = [
  {
    icon: <UserCircle className="card-icon" />,
    title: 'Complete Your Profile',
    points: 100,
    description: 'Fill out all sections of your profile to earn points and help us personalize your experience.'
  },
  {
    icon: <BookOpen className="card-icon" />,
    title: 'Enroll in Programs',
    points: 1000,
    description: 'Sign up for educational programs to earn points and expand your knowledge.'
  },
  {
    icon: <GraduationCap className="card-icon" />,
    title: 'Complete Programs',
    points: 1000,
    description: 'Finish your enrolled programs to earn points and gain valuable skills.'
  },
  {
    icon: <MessageCircle className="card-icon" />,
    title: 'Participate in Discussions',
    points: 50,
    description: 'Engage in community discussions to earn points and share your insights.'
  },
  {
    icon: <Share2 className="card-icon" />,
    title: 'Refer a Friend',
    points: 500,
    description: 'Invite your friends to join ArbiLearn and earn points when they sign up.'
  },
  {
    icon: <Award className="card-icon" />,
    title: 'Earn Certifications',
    points: 2000,
    description: 'Complete certification exams to earn major points and showcase your expertise.'
  }
]

export default function EarnPoints() {
  return (
    <div className="earn-points-container">
      <header className="earn-points-header">
        <h1 className="earn-points-title">Earn Points</h1>
        <p className="earn-points-subtitle">Complete actions to earn points and unlock valuable tokens and NFTs</p>
      </header>
      <div className="earn-points-grid">
        {earnOptions.map((option, index) => (
          <div key={index} className="earn-points-card">
            {option.icon}
            <h2 className="card-title">{option.title}</h2>
            <p className="card-points">{option.points} Points</p>
            <p className="card-description">{option.description}</p>
          </div>
        ))}
      </div>
      <footer className="earn-points-footer">
        <p>Start earning points today and level up your learning journey!</p>
        <p>
          Learn more about our <a href="#" className="earn-points-link">rewards program</a> and how to redeem your points.
        </p>
      </footer>
    </div>
  )
}
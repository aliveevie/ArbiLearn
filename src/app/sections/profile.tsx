'use client'

import { useState } from 'react'
import { Edit, Book, Award, Gift, CheckCircle, Layers, GitBranch, Upload } from 'lucide-react'
import '../../styles/profileSection.css'

interface UserStats {
  grantsApplied: number
  coursesCompleted: number
  rewardsEarned: number
  tasksCompleted: number
  tabsOpened: number
  nftsEarned: number
  tokensEarned: number
  pointsEarned: number
}

interface UserAction {
  id: number
  title: string
  description: string
  value: number
  icon: React.ReactNode
  hoverButtons: string[]
}

interface UserProfile {
  name: string
  username: string
  email: string
  twitter: string
  github: string
  discord: string
  avatar: string
}

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: 'No name',
    username: '@name',
    email: 'noname@example.com',
    twitter: '@noname',
    github: 'noname',
    discord: '#noname',
    avatar: 'Award'
  })
  
  const userStats: UserStats = {
    grantsApplied: 2,
    coursesCompleted: 3,
    rewardsEarned: 150,
    tasksCompleted: 12,
    tabsOpened: 25,
    nftsEarned: 5,
    tokensEarned: 100,
    pointsEarned: 750
  }

  const userActions: UserAction[] = [
    {
      id: 1,
      title: 'Courses Enrolled',
      description: 'Web3 fundamentals, Smart Contracts',
      value: 2,
      icon: <Book size={20} />,
      hoverButtons: ['Browse Courses', 'Enroll']
    },
    {
      id: 2,
      title: 'Tabs Opened',
      description: 'Recent learning materials',
      value: userStats.tabsOpened,
      icon: <Layers size={20} />,
      hoverButtons: ['View History', 'Clear Tabs']
    },
    {
      id: 3,
      title: 'Grants Applied',
      description: 'Gitcoin, Giveth',
      value: userStats.grantsApplied,
      icon: <GitBranch size={20} />,
      hoverButtons: ['View Grants', 'Apply New']
    },
    {
      id: 4,
      title: 'Tasks Completed',
      description: 'Recent achievements',
      value: userStats.tasksCompleted,
      icon: <CheckCircle size={20} />,
      hoverButtons: ['View Tasks', 'Start New']
    },
  ]

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile)
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Here you would typically upload the file to your server or cloud storage
      console.log('File selected:', file.name)
      // For demonstration, we're just updating the avatar URL locally
      setProfile(prev => ({ ...prev, avatar: URL.createObjectURL(file) }))
    }
  }

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-info">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
          <div className="profile-name-username">
            <h2 className="profile-name">{profile.name}</h2>
            <span className="profile-username">{profile.username}</span>
          </div>
        </div>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          <Edit size={18} />
        </button>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-value">{userStats.nftsEarned}</div>
          <div className="stat-label">NFTs Earned</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{userStats.tokensEarned}</div>
          <div className="stat-label">Tokens Earned</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{userStats.pointsEarned}</div>
          <div className="stat-label">Points Earned</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{userStats.coursesCompleted}</div>
          <div className="stat-label">Courses Completed</div>
        </div>
      </div>

      <div className="action-list">
        {userActions.map((action) => (
          <div key={action.id} className="action-item">
            <div className="action-icon">{action.icon}</div>
            <div className="action-content">
              <div className="action-title">{action.title}</div>
              <div className="action-description">{action.description}</div>
            </div>
            <div className="action-value">{action.value}</div>
            <div className="action-hover">
              {action.hoverButtons.map((button, index) => (
                <button key={index} className="hover-button">{button}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <form className="profile-form" onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name</label>
            <input 
              className="form-input"
              type="text" 
              id="name" 
              name="name" 
              value={profile.name} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input 
              className="form-input"
              type="email" 
              id="email" 
              name="email" 
              value={profile.email} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="twitter">Twitter</label>
            <input 
              className="form-input"
              type="text" 
              id="twitter" 
              name="twitter" 
              value={profile.twitter} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="github">GitHub</label>
            <input 
              className="form-input"
              type="text" 
              id="github" 
              name="github" 
              value={profile.github} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="discord">Discord</label>
            <input 
              className="form-input"
              type="text" 
              id="discord" 
              name="discord" 
              value={profile.discord} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="form-group">
            <label className="file-input-label" htmlFor="profile-pic">
              <Upload size={18} /> Upload Profile Picture
            </label>
            <input 
              className="file-input"
              type="file" 
              id="profile-pic" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>
          <button className="form-submit" type="submit">Save Changes</button>
        </form>
      )}
    </div>
  )
}


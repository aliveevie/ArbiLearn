'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CuboidIcon as Cube, Code, Layout, Layers, ChevronRight, ChevronLeft, X, Trophy, Zap, Award, CoinsIcon as Coin, Image, User, Target } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { BadgeDisplay } from './badge-display'

// Mock data for the current user
const currentUser = {
  name: 'Charlie',
  rank: 3,
  points: 1100,
  streak: 3,
  badges: 3,
  nfts: 2,
  tokens: 500,
  tasksCompleted: 15,
  level: 4
}

// Mock data for leaderboard
const leaderboardData = [
  { id: 1, name: 'Alice', points: 1200, streak: 7, badges: 5 },
  { id: 2, name: 'Bob', points: 1150, streak: 5, badges: 4 },
  { id: 3, name: 'Charlie', points: 1100, streak: 3, badges: 3 },
  { id: 4, name: 'David', points: 1050, streak: 4, badges: 3 },
  { id: 5, name: 'Eve', points: 1000, streak: 2, badges: 2 },
]

const UserProfileComponent: React.FC<{ user: typeof currentUser; onIconClick: (icon: string) => void }> = ({ user, onIconClick }) => (
  <div className="bg-blue rounded-lg shadow-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Your MetisLearn Profile</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('rank')}>
        <Trophy size={24} className="text-yellow-500 mb-2" />
        <span className="text-sm text-gray-600">Rank</span>
        <span className="text-lg font-semibold">{user.rank}</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('points')}>
        <Target size={24} className="text-blue-500 mb-2" />
        <span className="text-sm text-gray-600">Points</span>
        <span className="text-lg font-semibold">{user.points}</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('streak')}>
        <Zap size={24} className="text-orange-500 mb-2" />
        <span className="text-sm text-gray-600">Streak</span>
        <span className="text-lg font-semibold">{user.streak} days</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('badges')}>
        <Award size={24} className="text-purple-500 mb-2" />
        <span className="text-sm text-gray-600">Badges</span>
        <span className="text-lg font-semibold">{user.badges}</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('nfts')}>
        <Image size={24} className="text-green-500 mb-2" />
        <span className="text-sm text-gray-600">NFTs</span>
        <span className="text-lg font-semibold">{user.nfts}</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('tokens')}>
        <Coin size={24} className="text-yellow-600 mb-2" />
        <span className="text-sm text-gray-600">Tokens</span>
        <span className="text-lg font-semibold">{user.tokens}</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('tasks')}>
        <Layout size={24} className="text-indigo-500 mb-2" />
        <span className="text-sm text-gray-600">Tasks</span>
        <span className="text-lg font-semibold">{user.tasksCompleted}</span>
      </div>
      <div className="flex flex-col items-center p-2 bg-blue-50 rounded-lg" onClick={() => onIconClick('level')}>
        <User size={24} className="text-red-500 mb-2" />
        <span className="text-sm text-gray-600">Level</span>
        <span className="text-lg font-semibold">{user.level}</span>
      </div>
    </div>
  </div>
)

//

const LeaderboardComponent: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Leaderboard</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Rank</th>
            <th className="pb-2">Name</th>
            <th className="pb-2"><Trophy size={16} className="inline mr-1" /> Points</th>
            <th className="pb-2"><Zap size={16} className="inline mr-1" /> Streak</th>
            <th className="pb-2"><Award size={16} className="inline mr-1" /> Badges</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.id} className={user.name === currentUser.name ? "bg-blue-100 font-semibold" : ""}>
              <td className="py-2">{index + 1}</td>
              <td>{user.name}{user.name === currentUser.name && " (You)"}</td>
              <td>{user.points}</td>
              <td>{user.streak}</td>
              <td>{user.badges}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const RankView: React.FC<{ user: typeof currentUser; leaderboard: typeof leaderboardData }> = ({ user, leaderboard }) => (
  <div>
    <p>Your Rank: {user.rank}</p>
    {/* Add more details as needed */}
  </div>
)

const PointsView: React.FC<{ points: number }> = ({ points }) => (
  <div>
    <p>Your Points: {points}</p>
    {/* Add more details as needed */}
  </div>
)

const StreakView: React.FC<{ streak: number }> = ({ streak }) => (
  <div>
    <p>Your Streak: {streak} days</p>
    {/* Add more details as needed */}
  </div>
)

const BadgesView: React.FC = () => (
  <BadgeDisplay />
)

const NFTsView: React.FC<{ nfts: number }> = ({ nfts }) => (
  <div>
    <p>Your NFTs: {nfts}</p>
    {/* Add more details as needed */}
  </div>
)

const TokensView: React.FC<{ tokens: number }> = ({ tokens }) => (
  <div>
    <p>Your Tokens: {tokens}</p>
  </div>
)

const TasksView: React.FC<{ tasks: number }> = ({ tasks }) => (
  <div>
    <p>Tasks Completed: {tasks}</p>
  </div>
)

const LevelView: React.FC<{ level: number }> = ({ level }) => (
  <div>
    <p>Your Level: {level}</p>
  </div>
)

const MetisLearnMobile: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedView, setSelectedView] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setShowSidebar(!isMobile)
  }, [isMobile])

  const handleIconClick = (icon: string) => {
    setSelectedView(icon)
    setSelectedTopic(null)
  }

  const topics = [
    { id: 'fundamentals', title: 'Metis Blockchain Fundamentals', icon: Cube, content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Metis Blockchain Fundamentals</h3>
        <p className="mb-4">Metis is a Layer 2 blockchain solution built on Ethereum. It aims to solve scalability issues while maintaining security and decentralization.</p>
        <h4 className="text-lg font-semibold mb-2">Key Concepts:</h4>
        <ul className="list-disc list-inside mb-4">
          <li>Optimistic Rollups</li>
          <li>Decentralized Autonomous Companies (DACs)</li>
          <li>Metis Virtual Machine (MVM)</li>
        </ul>
        <p className="mb-4">Metis provides faster and cheaper transactions compared to the Ethereum mainnet, making it ideal for DApps and DeFi projects.</p>
        <Button onClick={() => alert('NFT Minted!')} className="w-full mt-4">Mint Completion NFT</Button>
      </>
    )},
    { id: 'smart-contracts', title: 'Smart Contract Development', icon: Code, content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Smart Contract Development on Metis</h3>
        <p className="mb-4">Developing smart contracts on Metis is similar to Ethereum, but with some key differences to leverage Metis' unique features.</p>
        <h4 className="text-lg font-semibold mb-2">Topics Covered:</h4>
        <ul className="list-disc list-inside mb-4">
          <li>Solidity basics for Metis</li>
          <li>Interacting with Metis-specific features</li>
          <li>Optimizing for Layer 2 performance</li>
        </ul>
        <p className="mb-4">Learn to write, test, and deploy smart contracts that take full advantage of Metis' scalability and low fees.</p>
        <Button onClick={() => alert('NFT Minted!')} className="w-full mt-4">Mint Completion NFT</Button>
      </>
    )},
    { id: 'dapps', title: 'Decentralized Applications (DApps)', icon: Layout, content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Building DApps on Metis</h3>
        <p className="mb-4">Create powerful decentralized applications that leverage Metis' high throughput and low latency.</p>
        <h4 className="text-lg font-semibold mb-2">DApp Development Process:</h4>
        <ol className="list-decimal list-inside mb-4">
          <li>Setting up the development environment</li>
          <li>Integrating Metis wallet connections</li>
          <li>Interacting with smart contracts on Metis</li>
          <li>Optimizing user experience for Layer 2</li>
        </ol>
        <p className="mb-4">By the end of this module, you'll be able to build and deploy full-stack DApps on the Metis network.</p>
        <Button onClick={() => alert('NFT Minted!')} className="w-full mt-4">Mint Completion NFT</Button>
      </>
    )},
    { id: 'layer2', title: 'Layer 2 Scaling Solutions', icon: Layers, content: (
      <>
        <h3 className="text-xl font-semibold mb-4">Layer 2 Scaling with Metis</h3>
        <p className="mb-4">Understand how Metis provides scalability as a Layer 2 solution and how it compares to other scaling technologies.</p>
        <h4 className="text-lg font-semibold mb-2">Key Topics:</h4>
        <ul className="list-disc list-inside mb-4">
          <li>Optimistic Rollups vs. other L2 solutions</li>
          <li>Metis' unique approach to scalability</li>
          <li>Bridging assets between Ethereum and Metis</li>
          <li>Future roadmap and scalability improvements</li>
        </ul>
        <p className="mb-4">Gain insights into the technical aspects of Layer 2 scaling and how Metis is pushing the boundaries of blockchain performance.</p>
        <Button onClick={() => alert('NFT Minted!')} className="w-full mt-4">Mint Completion NFT</Button>
      </>
    )},
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div 
            className="bg-white w-full md:w-64 h-screen fixed md:sticky top-0 left-0 z-50 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-800">Learn Metis Essentials</h2>
                {isMobile && (
                  <button onClick={() => setShowSidebar(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                )}
              </div>
              <ul className="space-y-2">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      onClick={() => {
                        setSelectedTopic(topic.id)
                        setSelectedView(null)
                        if (isMobile) setShowSidebar(false)
                      }}
                      className="w-full text-left flex items-center p-2 rounded-md hover:bg-blue-50 transition-colors duration-200"
                    >
                      <topic.icon className="mr-2 text-blue-500" size={20} />
                      <span className="text-gray-700">{topic.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 p-4 md:p-8 ${showSidebar && !isMobile ? 'md:ml-64' : ''} transition-all duration-300`}>
        <header className="text-center mb-8 relative">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="absolute top-0 left-0 bg-blue-500 text-white p-2 rounded-full shadow-lg z-50"
            aria-label={showSidebar ? "Close sidebar" : "Open sidebar"}
          >
            {showSidebar ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
          <motion.h1 
            className="text-3xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to MetisLearn
          </motion.h1>
          <motion.p 
            className="text-lg text-blue-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Master everything about Metis blockchain
          </motion.p>
        </header>

        {/* User Profile and Detailed Views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UserProfileComponent user={currentUser} onIconClick={handleIconClick} />
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedView || selectedTopic || 'default'}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {selectedView === 'rank' && <RankView user={currentUser} leaderboard={leaderboardData} />}
              {selectedView === 'points' && <PointsView points={currentUser.points} />}
              {selectedView === 'streak' && <StreakView streak={currentUser.streak} />}
              {selectedView === 'badges' && <BadgesView />}
              {selectedView === 'nfts' && <NFTsView nfts={currentUser.nfts} />}
              {selectedView === 'tokens' && <TokensView tokens={currentUser.tokens} />}
              {selectedView === 'tasks' && <TasksView tasks={currentUser.tasksCompleted} />}
              {selectedView === 'level' && <LevelView level={currentUser.level} />}
              {selectedTopic && topics.find(t => t.id === selectedTopic)?.content}
              {!selectedView && !selectedTopic && (
                <>
                  <h2 className="text-xl font-semibold text-blue-800 mb-4">Get Started</h2>
                  <p className="text-gray-700">Select a topic from the sidebar to begin your Metis learning journey!</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="bg-blue-700 rounded-lg shadow-lg p-6 text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Why Choose MetisLearn?</h2>
          <ul className="space-y-2">
            <li>✓ Comprehensive curriculum</li>
            <li>✓ Hands-on projects</li>
            <li>✓ Expert instructors</li>
            <li>✓ Community support</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default MetisLearnMobile


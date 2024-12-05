import React from 'react';
import { X, Trophy, Target, Zap, Award, ImageIcon, Coins, LayoutIcon, UserIcon, ArrowUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BadgeDisplay } from './BadgeDisplay';
import { User } from '../types';

interface DetailedViewProps {
  setSelectedView: (view: string | null) => void;
}

export const RankView: React.FC<DetailedViewProps & { user: User; leaderboard: User[] }> = ({ user, leaderboard, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Trophy className="mr-2 text-yellow-500" />
        Your Ranking Details
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="mb-4 p-4 bg-blue-100 rounded-lg">
        <p className="text-2xl font-bold text-blue-800">Rank #{user.rank}</p>
        <p className="text-gray-600">Out of {leaderboard.length} participants</p>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Points to Next Rank:</span>
          <span className="font-semibold">{100 - (user.points % 100)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Ranking Trend:</span>
          <span className="text-green-500 flex items-center">
            <ArrowUp className="h-4 w-4 mr-1" />
            Improving
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const PointsView: React.FC<DetailedViewProps & { points: number }> = ({ points, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Target className="mr-2 text-blue-500" />
        Points Overview
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-blue-600">{points}</p>
        <p className="text-gray-500 mt-2">Total Points Earned</p>
      </div>
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800">Recent Achievements</h4>
          <p className="text-sm text-gray-600">+50 points from daily challenges</p>
          <p className="text-sm text-gray-600">+100 points from quiz completion</p>
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800">Available Points</h4>
          <p className="text-sm text-gray-600">Complete daily tasks to earn more!</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StreakView: React.FC<DetailedViewProps & { streak: number }> = ({ streak, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Zap className="mr-2 text-orange-500" />
        Streak Status
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center">
        <p className="text-4xl font-bold text-orange-500">{streak}</p>
        <p className="text-gray-600 mt-2">Days Streak</p>
      </div>
    </CardContent>
  </Card>
);

export const BadgesView: React.FC<DetailedViewProps> = ({ setSelectedView }) => (
  <div className="fixed inset-0 m-auto w-full max-w-md h-fit">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <BadgeDisplay />
  </div>
);

export const NFTsView: React.FC<DetailedViewProps & { nfts: number }> = ({ nfts, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <ImageIcon className="mr-2 text-purple-500" />
        Your NFT Collection
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-center">{nfts} NFTs</p>
    </CardContent>
  </Card>
);

export const TokensView: React.FC<DetailedViewProps & { tokens: number }> = ({ tokens, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Coins className="mr-2 text-yellow-500" />
        Token Balance
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-center">{tokens} Tokens</p>
    </CardContent>
  </Card>
);

export const TasksView: React.FC<DetailedViewProps & { tasks: number }> = ({ tasks, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <LayoutIcon className="mr-2 text-indigo-500" />
        Task Progress
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-center">{tasks} Tasks Completed</p>
    </CardContent>
  </Card>
);

export const LevelView: React.FC<DetailedViewProps & { level: number }> = ({ level, setSelectedView }) => (
  <Card className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-lg shadow-lg">
    <div className="absolute top-4 right-4">
      <X className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSelectedView(null)} />
    </div>
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <UserIcon className="mr-2 text-red-500" />
        Level Status
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold text-center">Level {level}</p>
    </CardContent>
  </Card>
);

Finally, let's create our main MetisLearnMobile component:

```tsx file="MetisLearnMobile.tsx"
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CuboidIcon as Cube, Code, Layout, Layers, ChevronRight, ChevronLeft, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import UserProfileComponent from './components/UserProfileComponent'
import LeaderboardComponent from './components/LeaderboardComponent'
import { RankView, PointsView, StreakView, BadgesView, NFTsView, TokensView, TasksView, LevelView } from './components/DetailedViews'
import { currentUser, leaderboardData } from './types'

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
              {selectedView === 'rank' && <RankView user={currentUser} leaderboard={leaderboardData} setSelectedView={setSelectedView} />}
              {selectedView === 'points' && <PointsView points={currentUser.points} setSelectedView={setSelectedView} />}
              {selectedView === 'streak' && <StreakView streak={currentUser.streak} setSelectedView={setSelectedView} />}
              {selectedView === 'badges' && <BadgesView setSelectedView={setSelectedView} />}
              {selectedView === 'nfts' && <NFTsView nfts={currentUser.nfts} setSelectedView={setSelectedView} />}
              {selectedView === 'tokens' && <TokensView tokens={currentUser.tokens} setSelectedView={setSelectedView} />}
              {selectedView === 'tasks' && <TasksView tasks={currentUser.tasksCompleted} setSelectedView={setSelectedView} />}
              {selectedView === 'level' && <LevelView level={currentUser.level} setSelectedView={setSelectedView} />}
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


import React from 'react'
import { Trophy, Target, Zap, Award, ImageIcon, CoinsIcon, LayoutIcon, UserIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  rank: number;
  points: number;
  name: string;
}

interface LeaderboardEntry {
  id: React.Key | null | undefined;
  name: string;
  points: number;
}

export const RankView: React.FC<{ user: User; leaderboard: LeaderboardEntry[] }> = ({ user, leaderboard }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Trophy className="mr-2 text-yellow-500" />
        Leaderboard
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="mb-4 p-4 bg-blue-100 rounded-lg">
        <p className="font-semibold">Your Rank: {user.rank}</p>
        <p>Points: {user.points}</p>
      </div>
      <ul className="space-y-2">
        {leaderboard.map((entry, index) => (
          <li key={entry.id} className={`p-2 ${entry.name === user.name ? 'bg-blue-100 font-semibold' : 'bg-gray-50'} rounded-lg`}>
            <span className="mr-2">{index + 1}.</span>
            <span>{entry.name}</span>
            <span className="float-right">{entry.points} pts</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export const PointsView: React.FC<{ points: number }> = ({ points }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Target className="mr-2 text-blue-500" />
        Your Points
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-blue-600">{points}</p>
      <p className="mt-4 text-gray-600">Keep learning to earn more points!</p>
    </CardContent>
  </Card>
)

export const StreakView: React.FC<{ streak: number }> = ({ streak }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Zap className="mr-2 text-orange-500" />
        Your Streak
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-orange-600">{streak} days</p>
      <p className="mt-4 text-gray-600">Keep your streak going by learning every day!</p>
    </CardContent>
  </Card>
)

export const BadgesView: React.FC<{ badges: number }> = ({ badges }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <Award className="mr-2 text-purple-500" />
        Your Badges
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-purple-600">{badges}</p>
      <p className="mt-4 text-gray-600">Collect more badges by completing challenges!</p>
    </CardContent>
  </Card>
)

export const NFTsView: React.FC<{ nfts: number }> = ({ nfts }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <ImageIcon className="mr-2 text-green-500" />
        Your NFTs
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-green-600">{nfts}</p>
      <p className="mt-4 text-gray-600">Earn more NFTs by completing courses!</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[...Array(nfts)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg p-4 aspect-square flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-500">NFT {index + 1}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

export const TokensView: React.FC<{ tokens: number }> = ({ tokens }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <CoinsIcon className="mr-2 text-yellow-600" />
        Your Tokens
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-yellow-600">{tokens}</p>
      <p className="mt-4 text-gray-600">Use tokens to unlock special content and features!</p>
    </CardContent>
  </Card>
)

export const TasksView: React.FC<{ tasks: number }> = ({ tasks }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <LayoutIcon className="mr-2 text-indigo-500" />
        Completed Tasks
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-indigo-600">{tasks}</p>
      <p className="mt-4 text-gray-600">Great job! Keep completing tasks to level up!</p>
    </CardContent>
  </Card>
)

export const LevelView: React.FC<{ level: number }> = ({ level }) => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <CardTitle className="flex items-center text-blue-800">
        <UserIcon className="mr-2 text-red-500" />
        Your Level
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-4xl font-bold text-red-600">{level}</p>
      <p className="mt-4 text-gray-600">Keep learning and completing tasks to reach higher levels!</p>
    </CardContent>
  </Card>
)


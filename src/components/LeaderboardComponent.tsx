import React from 'react';
import { Trophy, Zap, Award } from 'lucide-react';
import { User, currentUser } from '../types';

interface LeaderboardComponentProps {
  leaderboardData: User[];
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ leaderboardData }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Leaderboard</h2>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-2">Rank</th>
            <th className="pb-2">Name</th>
            <th className="pb-2"><Trophy size={16} className="inline mr-1 cursor-pointer hover:scale-110 transition-transform" /> Points</th>
            <th className="pb-2"><Zap size={16} className="inline mr-1 cursor-pointer hover:scale-110 transition-transform" /> Streak</th>
            <th className="pb-2"><Award size={16} className="inline mr-1 cursor-pointer hover:scale-110 transition-transform" /> Badges</th>
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
);

export default LeaderboardComponent;


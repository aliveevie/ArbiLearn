import { Trophy, Award, Medal } from "lucide-react"

interface LeaderboardProps {
  leaderboard: {
    username: string
    points: number
  }[]
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-blue-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-900">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} className="border-b border-blue-700">
                <td className="p-3 flex items-center">
                  {index === 0 && <Trophy className="mr-2 h-5 w-5 text-yellow-400" />}
                  {index === 1 && <Award className="mr-2 h-5 w-5 text-gray-300" />}
                  {index === 2 && <Medal className="mr-2 h-5 w-5 text-yellow-600" />}
                  {index + 1}
                </td>
                <td className="p-3">{player.username}</td>
                <td className="p-3">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard


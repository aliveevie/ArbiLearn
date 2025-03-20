import { Trophy, Award, Medal } from "lucide-react"
import styles from "../styles/Exam.module.css"

interface LeaderboardProps {
  leaderboard: {
    username: string
    points: number
  }[]
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
      <div className={styles.leaderboardTable}>
        <table className={styles.leaderboardTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>Rank</th>
              <th className={styles.tableHeaderCell}>Username</th>
              <th className={styles.tableHeaderCell}>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCellRank}>
                  {index === 0 && <Trophy className="mr-2 h-5 w-5 text-yellow-400" />}
                  {index === 1 && <Award className="mr-2 h-5 w-5 text-gray-300" />}
                  {index === 2 && <Medal className="mr-2 h-5 w-5 text-yellow-600" />}
                  {index + 1}
                </td>
                <td className={styles.tableCell}>{player.username}</td>
                <td className={styles.tableCell}>{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard


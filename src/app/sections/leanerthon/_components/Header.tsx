import { User, Star } from "lucide-react"
import styles from "../styles/Exam.module.css"

interface HeaderProps {
  username: string
  points: number
}

const Header = ({ username, points }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerUser}>
        <User className="mr-2 h-6 w-6" />
        <h1 className={styles.headerUsername}>{username}</h1>
      </div>
      <div className={styles.headerPoints}>
        <Star className="mr-2 h-6 w-6 text-yellow-400" />
        <span className={styles.headerPointsText}>{points} Points</span>
      </div>
    </div>
  )
}

export default Header
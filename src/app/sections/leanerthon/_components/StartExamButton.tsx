import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "../styles/Exam.module.css"

interface StartExamButtonProps {
  onStart: () => void
  attempts: number
  maxAttempts: number
}

const StartExamButton = ({ onStart, attempts, maxAttempts }: StartExamButtonProps) => {
  return (
    <div className={styles.startExamButton}>
      <button
        onClick={onStart}
        disabled={attempts >= maxAttempts}
        className={styles.startButton}
      >
        <Play className="mr-2 h-5 w-5" />
        Start Exam
      </button>
      <p className={styles.attemptsText}>Attempts left: {maxAttempts - attempts}</p>
    </div>
  )
}

export default StartExamButton
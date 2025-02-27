"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ExamSummaryProps {
  score: number
  totalQuestions: number
  newPosition: number
  rankPoints: number
  attemptsLeft: number
  onBack: () => void
  onRetake: () => void
}

const ExamSummary = ({
  score,
  totalQuestions,
  newPosition,
  rankPoints,
  attemptsLeft,
  onBack,
  onRetake,
}: ExamSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Exam Summary</h2>
      <div className="space-y-4 mb-6">
        <p className="text-xl">
          Total Score: {score} / {totalQuestions}
        </p>
        <p className="text-xl">New Leaderboard Position: {newPosition}</p>
        <p className="text-xl">Rank Points Earned: {rankPoints}</p>
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack}>Back to Dashboard</Button>
        {attemptsLeft > 0 && <Button onClick={onRetake}>Retake Exam ({attemptsLeft} attempts left)</Button>}
      </div>
    </motion.div>
  )
}

export default ExamSummary


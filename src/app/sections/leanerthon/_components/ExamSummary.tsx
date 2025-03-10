"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { logExamResults } from "../_server/queries"
import React from "react"

interface ExamSummaryProps {
  score: number
  questionsAnswered: number
  questionPoints: number
  attemptPoints: number
  totalPoints: number
  newPosition: number
  attemptsLeft: number
  username: string
  walletAddress: string | undefined
  onBack: () => void
  onRetake: () => void
}

const ExamSummary = ({
  score,
  questionsAnswered,
  questionPoints,
  attemptPoints,
  totalPoints,
  newPosition,
  attemptsLeft,
  username,
  walletAddress,
  onBack,
  onRetake,
}: ExamSummaryProps) => {
  
  React.useEffect(() => {
    logExamResults({
      username,
      walletAddress: walletAddress || '',
      score,
      questionsAnswered,
      questionPoints,
      attemptPoints,
      totalPoints,
      position: newPosition,
      attemptsLeft
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: '#1e40af', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: 'large' }}
    >
      <h2 className="text-2xl font-bold mb-4">Exam Summary</h2>
      <div className="space-y-4 mb-6">
        <p className="text-xl">Score: {score} 🎯</p>
        <p className="text-xl">Questions Answered: {questionsAnswered} 📝</p>
        <p className="text-xl">Question Points: {questionPoints} 🌟</p>
        <p className="text-xl">Attempt Points: {attemptPoints} 🔄</p>
        <p className="text-xl">Total Points: {totalPoints} 🏆</p>
      </div>
      <div className="flex justify-between">
        <Button onClick={onBack}>Back to Dashboard</Button>
        {attemptsLeft > 0 && <Button onClick={onRetake}>Retake Exam ({attemptsLeft} attempts left)</Button>}
      </div>
    </motion.div>
  )
}

export default ExamSummary


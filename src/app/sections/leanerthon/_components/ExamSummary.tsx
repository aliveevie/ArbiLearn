"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { logExamResults } from "../_server/queries"
import React from "react"
import styles from "../styles/Exam.module.css"

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
      className={styles.examSummary}
      as="div"
    >
      <h2 className={styles.examSummaryTitle}>Exam Summary</h2>
      <div className={styles.examSummaryContent}>
        <p className={styles.examSummaryText}>Score: {score} 🎯</p>
        <p className={styles.examSummaryText}>Questions Answered: {questionsAnswered} 📝</p>
        <p className={styles.examSummaryText}>Question Points: {questionPoints} 🌟</p>
        <p className={styles.examSummaryText}>Attempt Points: {attemptPoints} 🔄</p>
        <p className={styles.examSummaryText}>Total Points: {totalPoints} 🏆</p>
      </div>
      <div className={styles.examSummaryActions}>
        <Button onClick={onBack}>Back to Dashboard</Button>
        {attemptsLeft > 0 && <Button onClick={onRetake}>Retake Exam ({attemptsLeft} attempts left)</Button>}
      </div>
    </motion.div>
  )
}

export default ExamSummary


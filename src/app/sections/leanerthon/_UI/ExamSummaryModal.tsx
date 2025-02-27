"use client"

import type React from "react"

import { motion } from "framer-motion"
import styles from "../styles/Exam.module.css"

interface ExamSummaryModalProps {
  score: number
  answeredQuestions: number
  attempts: number
  onClose: () => void
  onRetake: () => void
}

const ExamSummaryModal: React.FC<ExamSummaryModalProps> = ({
  score,
  answeredQuestions,
  attempts,
  onClose,
  onRetake,
}) => {
  const questionPoints = answeredQuestions * 10
  const attemptPoints = attempts * 5
  const totalPoints = questionPoints + attemptPoints

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.modalOverlay}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className={styles.modalContent}>
        <h2 className="text-2xl font-bold mb-4">Exam Summary 📊</h2>
        <p className="text-lg mb-2">Score: {score} 🎯</p>
        <p className="text-lg mb-2">Questions Answered: {answeredQuestions} 📝</p>
        <p className="text-lg mb-2">Question Points: {questionPoints} 🌟</p>
        <p className="text-lg mb-2">Attempt Points: {attemptPoints} 🔄</p>
        <p className="text-lg mb-4">Total Points: {totalPoints} 🏆</p>
        <p className="text-lg mb-4">Great job! Keep practicing to improve your knowledge! 📚</p>
        <div className="flex justify-between">
          <button onClick={onRetake} className={`${styles.button} ${styles.buttonSecondary}`}>
            Retake Exam 🔄
          </button>
          <button onClick={onClose} className={`${styles.button} ${styles.buttonPrimary}`}>
            Close 👍
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ExamSummaryModal


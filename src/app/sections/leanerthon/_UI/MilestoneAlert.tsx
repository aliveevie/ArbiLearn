"use client"

import type React from "react"

import { motion } from "framer-motion"
import styles from "../styles/Exam.module.css"

interface MilestoneAlertProps {
  score: number
  questionsAnswered: number
  onClose: () => void
}

const MilestoneAlert: React.FC<MilestoneAlertProps> = ({ score, questionsAnswered, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <h2 className="text-2xl font-bold mb-4">Milestone Reached! 🎉</h2>
        <p className="text-lg mb-2">You've answered {questionsAnswered} questions!</p>
        <p className="text-lg mb-4">Your current score: {score} 🌟</p>
        <p className="text-lg mb-4">
          Keep up the great work! 💪 The more questions you answer, the more points you can earn!
        </p>
        <div className="flex justify-end">
          <button onClick={onClose} className={`${styles.button} ${styles.buttonPrimary}`}>
            Continue 🚀
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default MilestoneAlert
"use client"

import type React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import styles from "../styles/Exam.module.css"

interface ConfirmModalProps {
  message: string
  onConfirm: () => void
  onCancel: () => void
  onRetake: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel, onRetake }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className={styles.modalOverlay}
    >
      <motion.div 
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }} 
        exit={{ scale: 0.9 }} 
        className={styles.modalContent}
      >
        <p className={styles.modalText}>{message}</p>
        <div className={styles.modalButtons}>
          <button onClick={onRetake} className={`${styles.button} ${styles.buttonSecondary}`}>
            Retake Exam 🔄
          </button>
          <button onClick={onCancel} className={`${styles.button} ${styles.buttonPrimary}`}>
            Continue Exam ▶️
          </button>
          <button onClick={onConfirm} className={`${styles.button} ${styles.buttonDestructive}`}>
            Stop Exam 🛑
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConfirmModal


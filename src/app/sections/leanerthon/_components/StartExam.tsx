"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, StopCircle } from "lucide-react"
import { playSound } from "../_utils/sound"
import ConfirmModal from "../_UI/ConfirmModal"
import ExamSummaryModal from "../_UI/ExamSummaryModal"
import MilestoneAlert from "../_UI/MilestoneAlert"
import Balloons from "../_UI/Ballons"
import { getExamQuestions } from "../_server/queries"
import { Loader2 } from "lucide-react"
import styles from "../styles/Exam.module.css"

interface StartExamProps {
  onEnd: (results: any) => void
  attempts: number
  wallet: string
}

// Define a proper interface for the question type
interface ExamQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const StartExam: React.FC<StartExamProps> = ({ onEnd, attempts, wallet }) => {
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(20)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [examFinished, setExamFinished] = useState(false)
  const [showMilestoneAlert, setShowMilestoneAlert] = useState(false)

  // Fetch questions when component mounts
  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true)
        const fetchedQuestions = await getExamQuestions(wallet, attempts)
        setQuestions(fetchedQuestions)
      } catch (error) {
        console.error("Error loading questions:", error)
        // Fallback to static questions if needed
        const { default: staticQuestions } = await import("../_UI/questions")
        setQuestions(staticQuestions)
      } finally {
        setLoading(false)
      }
    }
    
    loadQuestions()
  }, [wallet, attempts])

  const finishExam = useCallback(() => {
    setExamFinished(true)
    playSound("exam-finish")
    setShowSummaryModal(true)
  }, [])

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion((prev) => prev + 1)
    setSelectedAnswer(null)
    setTimeLeft(20)

    // Check if we've reached a multiple of 10 questions
    if ((currentQuestion + 1) % 10 === 0 && currentQuestion !== 0) {
      setShowMilestoneAlert(true)
    }
  }, [currentQuestion])

  const handleAnswer = useCallback(
    (index: number) => {
      if (!questions.length) return
      
      setSelectedAnswer(index)
      setUserAnswers((prev) => [...prev, index])
      if (index === questions[currentQuestion % questions.length].correctAnswer) {
        setScore((prev) => prev + 1)
        playSound("correct-answer")
      } else {
        playSound("wrong-answer")
      }

      setTimeout(handleNextQuestion, 1000)
    },
    [currentQuestion, handleNextQuestion, questions]
  )

  const retakeExam = useCallback(() => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setTimeLeft(20)
    setUserAnswers([])
    setExamFinished(false)
    setShowSummaryModal(false)
    setShowConfirmModal(false)
    playSound("exam-start")
  }, [])

  useEffect(() => {
    if (!loading) {
      playSound("exam-start")
    }
  }, [loading])

  useEffect(() => {
    if (loading) return
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNextQuestion()
          return 20
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [handleNextQuestion, loading])

  const stopExam = useCallback(() => {
    setShowConfirmModal(true)
  }, [])

  const confirmStopExam = useCallback(() => {
    playSound("exam-stop")
    setShowConfirmModal(false)
    finishExam()
  }, [finishExam])

  const closeModals = useCallback(() => {
    setShowConfirmModal(false)
    setShowSummaryModal(false)
    onEnd({ questions, userAnswers, score, attempts })
  }, [onEnd, userAnswers, score, attempts, questions])

  const closeMilestoneAlert = useCallback(() => {
    setShowMilestoneAlert(false)
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.loadingSpinner} />
        <p className={styles.loadingText}>Loading exam questions...</p>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Error loading questions. Please try again.</p>
      </div>
    )
  }

  return (
    <div className={styles.examContainer}>
      <div className={styles.examHeader}>
        <h2 className={styles.examTitle}>Exam in Progress 🚀</h2>
        <div className={styles.examControls}>
          <div className={styles.timerContainer}>
            <Clock className={styles.timerIcon} />
            <span className={styles.timerText}>{timeLeft}s</span>
          </div>
          <button onClick={stopExam} className={styles.stopButton}>
            <StopCircle className={styles.stopIcon} />
          </button>
        </div>
      </div>
      <div className={styles.questionContainer}>
        <h3 className={styles.questionText}>{questions[currentQuestion % questions.length].question}</h3>
        <div className={styles.optionsContainer}>
          {questions[currentQuestion % questions.length].options.map((option: string, index: number) => {
            let optionClass = styles.optionButton;
            
            if (selectedAnswer !== null) {
              if (selectedAnswer === index) {
                optionClass = index === questions[currentQuestion % questions.length].correctAnswer 
                  ? styles.correctOption 
                  : styles.incorrectOption;
              } else {
                optionClass = styles.disabledOption;
              }
            }
            
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                //@ts-ignore
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={optionClass}
                as="button"
              >
                {option}
              </motion.button>
            );
          })}
        </div>
      </div>
      <div className={styles.scoreContainer}>
        <p className={styles.scoreText}>Score: {score} 🏆</p>
        <p className={styles.encouragementText}>Keep going! Answer more questions to earn more points! 💪</p>
      </div>

      <AnimatePresence>
        {showConfirmModal && (
          <ConfirmModal
            message="Are you sure you want to stop the exam? 🛑"
            onConfirm={confirmStopExam}
            onCancel={() => setShowConfirmModal(false)}
            onRetake={retakeExam}
          />
        )}
        {showSummaryModal && (
          <ExamSummaryModal
            score={score}
            answeredQuestions={userAnswers.length}
            attempts={attempts}
            onClose={closeModals}
            onRetake={retakeExam}
          />
        )}
        {showMilestoneAlert && (
          <MilestoneAlert score={score} questionsAnswered={userAnswers.length} onClose={closeMilestoneAlert} />
        )}
      </AnimatePresence>

      {examFinished && <Balloons />}
    </div>
  )
}

export default StartExam
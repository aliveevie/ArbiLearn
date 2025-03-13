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
  const [timeLeft, setTimeLeft] = useState(30)
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
    setTimeLeft(30)

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
    setTimeLeft(30)
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
          return 30
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
      <div className="flex flex-col items-center justify-center h-64 bg-blue-800 p-6 rounded-lg shadow-lg">
        <Loader2 className="w-12 h-12 animate-spin text-white mb-4" />
        <p className="text-xl font-medium text-white">Loading exam questions...</p>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
        <p className="text-xl text-center">Error loading questions. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="relative bg-blue-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Exam in Progress 🚀</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="mr-2" />
            <span className="text-xl">{timeLeft}s</span>
          </div>
          <button onClick={stopExam} className="text-red-500 hover:text-red-600">
            <StopCircle className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl mb-4">{questions[currentQuestion % questions.length].question}</h3>
        <div className="space-y-4">
          {questions[currentQuestion % questions.length].options.map((option: string, index: number) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              //@ts-ignore
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedAnswer === null
                  ? "bg-blue-700 hover:bg-blue-600"
                  : selectedAnswer === index
                    ? index === questions[currentQuestion % questions.length].correctAnswer
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-blue-700 opacity-50"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl mt-2">Score: {score} 🏆</p>
        <p className="text-lg mt-2">Keep going! Answer more questions to earn more points! 💪</p>
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
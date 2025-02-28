"use client"

import { useState } from "react"
import Header from "./_components/Header"
import Leaderboard from "./_components/Leaderboad"
import StartExamButton from "./_components/StartExamButton"
import StartExam from "./_components/StartExam"
import ExamSummary from "./_components/ExamSummary"
import { Button } from "@/components/ui/button"

const initialLeaderboard = [
  { username: "Winner123", points: 500 },
  { username: "Runner456", points: 450 },
  { username: "ThirdPlace789", points: 400 },
  { username: "FourthUser", points: 350 },
  { username: "FifthPlayer", points: 300 },
]

const MAX_ATTEMPTS = 3

const LearnethonProfile = ({ wallet, onClose }: { wallet: string | undefined; onClose: () => void }) => {
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [isExamCompleted, setIsExamCompleted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [examResults, setExamResults] = useState<any>(null)
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard)
  const [userPoints, setUserPoints] = useState(250)
  const [username] = useState("Player1")

  const startExam = () => {
    if (attempts < MAX_ATTEMPTS) {
      setIsExamStarted(true)
      setAttempts(attempts + 1)
    }
  }

  const endExam = (results: any) => {
    setIsExamStarted(false)
    setIsExamCompleted(true)
    setExamResults(results)

    const newPoints = userPoints + results.score * 10 + attempts * 5
    setUserPoints(newPoints)

    const newLeaderboard = [...leaderboard, { username, points: newPoints }]
      .sort((a, b) => b.points - a.points)
      .slice(0, 5)

    setLeaderboard(newLeaderboard)
  }

  const backToDashboard = () => {
    setIsExamCompleted(false)
    setExamResults(null)
  }

  const retakeExam = () => {
    setIsExamCompleted(false)
    setExamResults(null)
    startExam()
  }

  const newPosition = leaderboard.findIndex((player) => player.username === username) + 1

  return (
    <div className="container mx-auto px-4 py-8">
      <Header username={username} points={userPoints} />
      {!isExamStarted && !isExamCompleted && (
        <>
          <Leaderboard leaderboard={leaderboard} />
          <StartExamButton onStart={startExam} attempts={attempts} maxAttempts={MAX_ATTEMPTS} />
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </>
      )}
      {isExamStarted && <StartExam onEnd={endExam} attempts={attempts} />}
      {isExamCompleted && examResults && (
        <ExamSummary
          score={examResults.score}
          totalQuestions={examResults.questions.length}
          // @ts-expect-error
          answeredQuestions={examResults.userAnswers.length}
          attempts={attempts}
          newPosition={newPosition}
          onBack={backToDashboard}
          onRetake={retakeExam}
        />
      )}
    </div>
  )
}

export default LearnethonProfile
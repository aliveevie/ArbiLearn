"use client"

import { useState, useEffect } from "react"
import { Dialog } from "@/components/ui/dialog"
import Header from "./_components/Header"
import Leaderboard from "./_components/Leaderboad"
import StartExamButton from "./_components/StartExamButton"
import StartExam from "./_components/StartExam"
import ExamSummary from "./_components/ExamSummary"
import { Button } from "@/components/ui/button"
import { leaderboardData } from "./_server/queries"

const initialLeaderboard = [
  { username: "Winner123", points: 0 },
]

const MAX_ATTEMPTS = 3

const LearnethonProfile = ({ wallet, onClose, profile }: { wallet: string | undefined; onClose: () => void; profile: { success: boolean, message: string } }) => {
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [isExamCompleted, setIsExamCompleted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [examResults, setExamResults] = useState<any>(null)
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard)
  const [userPoints, setUserPoints] = useState(250)
  const [username, setUsername] = useState("")
  const [showProfileModal, setShowProfileModal] = useState(false)

  useEffect(() => {
    try {
      if (profile.success) {
        const firstName = profile.message.split(' ')[0]
        setUsername(firstName)
        async function getData() {
          const leaders = await leaderboardData()
          setLeaderboard(leaders)
          console.log(leaders)
        }
        getData()
      } else {
        setShowProfileModal(true)
      }
    } catch (error) {
      setShowProfileModal(true)
    }
  }, [profile])

  console.log(leaderboard)

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
      {showProfileModal ? (
        <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Profile Required</h2>
            <p className="mb-4">Please update your profile or apply via the Learnerthon form to continue.</p>
            <a 
              href="https://forms.gle/7LodFsd6Y6gyDtZ89" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Apply for Learnerthon
            </a>
            <Button onClick={onClose} className="mt-4 ml-4">
              Close
            </Button>
          </div>
        </Dialog>
      ) : (
        <>
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
              questionsAnswered={examResults.userAnswers?.length || 0}
              questionPoints={examResults.score * 10}
              attemptPoints={attempts * 5}
              totalPoints={examResults.score * 10 + attempts * 5}
              newPosition={newPosition}
              attemptsLeft={MAX_ATTEMPTS - attempts}
              onBack={backToDashboard}
              onRetake={retakeExam}
              username={username}
              walletAddress={wallet}
            />
          )}
        </>
      )}
    </div>
  )
}

export default LearnethonProfile
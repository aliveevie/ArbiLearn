"use client"

import { useState, useEffect } from "react"
import { Dialog } from "@/components/ui/dialog"
import Header from "./_components/Header"
import Leaderboard from "./_components/Leaderboad"
import StartExamButton from "./_components/StartExamButton"
import StartExam from "./_components/StartExam"
import ExamSummary from "./_components/ExamSummary"
import { Button } from "@/components/ui/button"
import { leaderboardData, getUserExamData } from "./_server/queries"
import styles from "./styles/Exam.module.css"

const initialLeaderboard = [
  { username: "Winner123", points: 0, wallet_address: "0x0" },
]

const MAX_ATTEMPTS = 3

const LearnethonProfile = ({ wallet, onClose, profile }: { wallet: string | undefined; onClose: () => void; profile: { success: boolean, message: string } }) => {
  const safeWalletAddress = wallet || "0x0"
  const [isExamStarted, setIsExamStarted] = useState(false)
  const [isExamCompleted, setIsExamCompleted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [examResults, setExamResults] = useState<any>(null)
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard)
  const [userPoints, setUserPoints] = useState(0)
  const [username, setUsername] = useState("")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [attemptsLeft, setAttemptsLeft] = useState(3)

  useEffect(() => {
    try {
      if (profile.success) {
        const firstName = profile.message.split(' ')[0]
        setUsername(firstName)
        
        async function getData() {
          // Get leaderboard data
          const leaders = await leaderboardData()
          
          // Map the results to ensure wallet_address is always a string
          const safeLeaders = leaders.map(leader => ({
            ...leader,
            wallet_address: leader.wallet_address || "0x0"
          }))
          
          setLeaderboard(safeLeaders)
          
          // Get user-specific data
          if (wallet) {
            const userData = await getUserExamData(wallet)
            if (userData) {
              setUserPoints(userData.totalPoints)
              setAttemptsLeft(userData.attemptsLeft)
              setAttempts(3 - userData.attemptsLeft)
            }
          }
        }
        getData()
      } else {
        setShowProfileModal(true)
      }
    } catch (error) {
      setShowProfileModal(true)
    }
  }, [profile, wallet])

  console.log(leaderboard)

  const startExam = () => {
    if (attemptsLeft > 0) {
      setIsExamStarted(true)
      setAttempts(attempts + 1)
      setAttemptsLeft(attemptsLeft - 1)
    }
  }

  const endExam = (results: any) => {
    setIsExamStarted(false)
    setIsExamCompleted(true)
    setExamResults(results)

    const newPoints = userPoints + results.score * 10 + attempts * 5
    setUserPoints(newPoints)

    const newLeaderboard = [...leaderboard.filter(item => item.wallet_address !== safeWalletAddress), 
      { username, points: newPoints, wallet_address: safeWalletAddress }]
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

  const newPosition = leaderboard.findIndex((player) => player.wallet_address === safeWalletAddress) + 1

  return (
    <div className={styles.gamingDashboard}>
      {showProfileModal ? (
        <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
          <div className={styles.profileModal}>
            <h2 className={styles.profileModalTitle}>Profile Required</h2>
            <p className={styles.profileModalText}>Please update your profile or apply via the Learnerthon form to continue.</p>
            <a 
              href="https://forms.gle/7LodFsd6Y6gyDtZ89" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.profileModalLink}
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
          <div className={styles.dashboardContent}>
            <Header username={username} points={userPoints} />
            {!isExamStarted && !isExamCompleted && (
              <>
                <Leaderboard leaderboard={leaderboard} />
                <div className={styles.dashboardActions}>
                  <StartExamButton onStart={startExam} attempts={attempts} maxAttempts={MAX_ATTEMPTS} />
                  <Button onClick={onClose} className={styles.closeButton}>
                    Close
                  </Button>
                </div>
              </>
            )}
            {isExamStarted && <StartExam onEnd={endExam} attempts={attempts} wallet={safeWalletAddress} />}
            {isExamCompleted && examResults && (
              <ExamSummary
                score={examResults.score}
                questionsAnswered={examResults.userAnswers?.length || 0}
                questionPoints={examResults.score * 10}
                attemptPoints={attempts * 5}
                totalPoints={examResults.score * 10 + attempts * 5}
                newPosition={newPosition}
                attemptsLeft={attemptsLeft}
                onBack={backToDashboard}
                onRetake={retakeExam}
                username={username}
                walletAddress={safeWalletAddress}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default LearnethonProfile
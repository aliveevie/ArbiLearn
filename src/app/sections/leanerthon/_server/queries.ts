"use server"

import { createLeaderBoadTable } from "@/lib/db-tables"
import { sql } from "@/server-comps/neon"

type LeaderboardEntry = {
    username: string;
    points: number;
    attempts: number;
    wallet_address: string | undefined;
}

type ExamResult = {
  username: string
  walletAddress: string
  score: number
  questionsAnswered: number
  questionPoints: number
  attemptPoints: number
  totalPoints: number
  position: number
  attemptsLeft: number
}

export async function leaderboardData(): Promise<LeaderboardEntry[]> {
    await createLeaderBoadTable()
    try {
        const result = await sql`
            SELECT *
            FROM leaderboard 
        `
        return result as LeaderboardEntry[]
    } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        throw error
    }
}

export async function logExamResults(data: ExamResult) {
  console.log("Exam Results:", {
    username: data.username,
    walletAddress: data.walletAddress,
    stats: {
      score: data.score,
      questionsAnswered: data.questionsAnswered,
      questionPoints: data.questionPoints,
      attemptPoints: data.attemptPoints,
      totalPoints: data.totalPoints,
      position: data.position,
      attemptsLeft: data.attemptsLeft
    }
  })
}
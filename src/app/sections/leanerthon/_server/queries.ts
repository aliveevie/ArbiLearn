"use server"

import { createLeaderBoadTable, createLearnthonResultsTable } from "@/lib/db-tables"
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
      SELECT username, points, attempts, wallet_address
      FROM leaderboard 
      ORDER BY points DESC
    `;
    return result as LeaderboardEntry[];
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    throw error;
  }
}

export async function getUserExamData(walletAddress: string): Promise<ExamResult | null> {
  try {
    const result = await sql`
      SELECT 
        username, 
        wallet_address as "walletAddress",
        score,
        questions_answered as "questionsAnswered",
        question_points as "questionPoints",
        attempt_points as "attemptPoints",
        total_points as "totalPoints",
        position,
        attempts_left as "attemptsLeft"
      FROM learnthon_results
      WHERE wallet_address = ${walletAddress}
    `;
    
    if (result.length > 0) {
      return result[0] as ExamResult;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user exam data:", error);
    return null;
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
  });
  
  // Create the tables if they don't exist
  await createLearnthonResultsTable();
  await createLeaderBoadTable();
  
  // Get existing user data, if any
  const existingUser = await getUserExamData(data.walletAddress);
  
  try {
    if (existingUser) {
      // User exists - update with cumulative values
      await sql`
        UPDATE learnthon_results
        SET 
          username = ${data.username},
          score = score + ${data.score},
          questions_answered = questions_answered + ${data.questionsAnswered},
          question_points = question_points + ${data.questionPoints},
          attempt_points = attempt_points + ${data.attemptPoints},
          total_points = total_points + ${data.totalPoints},
          position = ${data.position},
          attempts_left = ${data.attemptsLeft},
          updated_at = CURRENT_TIMESTAMP
        WHERE wallet_address = ${data.walletAddress}
      `;
    } else {
      // First time user - insert new record
      await sql`
        INSERT INTO learnthon_results (
          username,
          wallet_address,
          score,
          questions_answered,
          question_points,
          attempt_points,
          total_points,
          position,
          attempts_left
        ) VALUES (
          ${data.username},
          ${data.walletAddress},
          ${data.score},
          ${data.questionsAnswered},
          ${data.questionPoints},
          ${data.attemptPoints},
          ${data.totalPoints},
          ${data.position},
          ${data.attemptsLeft}
        )
      `;
    }
    
    // Update leaderboard with cumulative points
    const totalPoints = existingUser 
      ? existingUser.totalPoints + data.totalPoints 
      : data.totalPoints;
      
    const remainingAttempts = data.attemptsLeft;
    
    try {
      await sql`
        INSERT INTO leaderboard (
          username, 
          wallet_address, 
          points,
          attempts
        ) VALUES (
          ${data.username}, 
          ${data.walletAddress}, 
          ${totalPoints},
          ${3 - remainingAttempts}
        )
        ON CONFLICT (wallet_address) 
        DO UPDATE SET 
          username = ${data.username},
          points = ${totalPoints},
          attempts = ${3 - remainingAttempts},
          updated_at = CURRENT_TIMESTAMP
      `;
    } catch (leaderboardError) {
      console.error("Error updating leaderboard:", leaderboardError);
    }
    console.log("Exam results saved successfully");
  } catch (error) {
    console.error("Error saving exam results:", error);
  }
}
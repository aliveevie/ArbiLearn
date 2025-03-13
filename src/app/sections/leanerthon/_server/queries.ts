"use server"

import { createLeaderBoadTable, createLearnthonResultsTable, createQuestionsTable, populateQuestionsTable } from "@/lib/db-tables"
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

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
}

export async function leaderboardData(): Promise<LeaderboardEntry[]> {
  // await createLeaderBoadTable()
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

export async function getExamQuestions(walletAddress: string, attemptNumber: number): Promise<Question[]> {
  try {
    // Create and populate the questions table if needed
    await createQuestionsTable();
    await populateQuestionsTable();
    
    // Get all questions from the database
    const allQuestions = await sql`
      SELECT question_text as question, options, correct_answer as "correctAnswer", category
      FROM exam_questions
    `;
    
    // Convert from DB format to expected format
    const questions = allQuestions.map(q => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer
    }));
    
    // Shuffle questions based on attempt number
    const shuffledQuestions = shuffleQuestions(questions, attemptNumber, walletAddress);
    
    return shuffledQuestions;
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    // Fallback to static questions if database fails
    const { questions } = await import("@/app/sections/leanerthon/_UI/questions");
    return shuffleQuestions(questions, attemptNumber, walletAddress);
  }
}

// Function to shuffle questions based on attempt number and wallet address
function shuffleQuestions(questions: Question[], attemptNumber: number, walletAddress: string): Question[] {
  // Create a deterministic but different seed for each attempt and wallet
  const seed = walletAddress.slice(-8) + attemptNumber.toString();
  
  // Create a copy of the questions array
  const shuffled = [...questions];
  
  // Fisher-Yates shuffle with deterministic randomness based on seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Use a simple hash of the seed and current index for deterministic randomness
    const hash = simpleHash(`${seed}-${i}`);
    const j = hash % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // For different attempts, select different subsets or arrangements
  if (attemptNumber === 1) {
    // First attempt: use first 50 questions
    return shuffled.slice(0, 50);
  } else if (attemptNumber === 2) {
    // Second attempt: use next 50 questions
    return shuffled.slice(50, 100);
  } else {
    // Third attempt: use a mix of questions
    return [...shuffled.slice(25, 50), ...shuffled.slice(75, 100)];
  }
}

// Simple string hash function for deterministic randomness
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
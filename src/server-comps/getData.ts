'use server'
import { sql } from './neon'

export async function getAllDatabaseData() {
    try {
      const data = {
        // Non-sensitive tables
        wallets: await sql`SELECT * FROM wallets ORDER BY created_at DESC`,
        profiles: await sql`SELECT * FROM profiles ORDER BY created_at DESC`,
        courseVerifications: await sql`SELECT * FROM course_verification ORDER BY created_at DESC`,
        referrals: await sql`SELECT * FROM referrals ORDER BY created_at DESC`,
        points: await sql`SELECT * FROM points ORDER BY created_at DESC`,
        ambassadors: await sql`SELECT * FROM ambassadors ORDER BY created_at DESC`,
        ambassadorEarnings: await sql`SELECT * FROM ambassador_earnings ORDER BY created_at DESC`,
        feedback: await sql`SELECT * FROM feedback ORDER BY created_at DESC`,
      }
  
      return {
        success: true,
        data,
        message: "Data retrieved successfully"
      };
  
    } catch (error) {
      console.error("Error fetching database data:", error);
      return {
        success: false,
        error: "Failed to fetch database data",
        details: error instanceof Error ? error.message : "Unknown error"
      };
    }
  }
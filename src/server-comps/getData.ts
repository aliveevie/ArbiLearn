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
  export async function approveVerification(wallet: string | undefined) {
    try {
      console.log("Approving")
        await sql`
            UPDATE course_verification 
            SET 
                status = 'approved',
                reviewed_at = CURRENT_TIMESTAMP,
                reviewed_by = 'admin',
                updated_at = CURRENT_TIMESTAMP
            WHERE wallet_address = ${wallet}
        `;
        console.log("Approving done!")
        return { success: true, message: 'Approved' };
    } catch (error) {
        console.error('Error approving verification:', error);
        return { success: false, message: 'Failed' };
    }
}

export async function rejectVerification(wallet: string | undefined) {
    try {
      console.log("Working on it to reject")
        await sql`
            UPDATE course_verification 
            SET 
                status = 'rejected',
                reviewed_at = CURRENT_TIMESTAMP,
                reviewed_by = 'admin',
                updated_at = CURRENT_TIMESTAMP
            WHERE wallet_address = ${wallet}
        `;
        console.log("Rejected!")
        return { success: true, message: 'Verification rejected successfully' };
    } catch (error) {
        console.error('Error rejecting verification:', error);
        return { success: false, message: 'Failed to reject verification' };
    }
}
"use server"

import { createLeaderBoadTable } from "@/lib/db-tables"
import { sql } from "@/server-comps/neon"

type LeaderboardEntry = {
    username: string;
    points: number;
    attempts: number;
    wallet_address: string;
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
'use server'
import { revalidatePath } from "next/cache"
import { createWalletsTable } from "@/lib/db-tables"
import { sql } from "@vercel/postgres";

export async function getWalletAddress(wallet: string) {
    try {
        // Create wallets table if it doesn't exist
       // await createWalletsTable();
        if(wallet){
            const existingWallet = await sql`
            SELECT wallet_address FROM wallets 
            WHERE wallet_address = ${wallet}
        `;

        if (existingWallet.rows.length > 0) {
            return { wallet: wallet, success: true, exists: true };
        }

        // Insert new wallet into the table
        await sql`
            INSERT INTO wallets (wallet_address, created_at, updated_at)
            VALUES (${wallet}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;

       
            return { wallet: wallet, success: true, exists: false };
        }else{
        }
        // Check if wallet address already exists
       
    } catch (error) {
        console.error("Error handling wallet:", error);
        return { error: "Failed to handle wallet", success: false };
    }
}




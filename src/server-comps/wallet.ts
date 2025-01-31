'use server'
import { revalidatePath } from "next/cache"
import { createWalletsTable } from "@/lib/db-tables"
// import { sql } from "@vercel/postgres";
import { neon } from '@neondatabase/serverless';
const sql = neon(`${process.env.DATABASE_URL}`);

export async function getWalletAddress(wallet: string) {
    try {
        // Create wallets table if it doesn't exist
       // await createWalletsTable();
        if(wallet){
            const existingWallet = await sql`
            SELECT wallet_address FROM wallets 
            WHERE wallet_address = ${wallet}
        `;
        console.log("Checking if Wallet Address Exist....!!!")
        if (existingWallet.length > 0) {
            return { wallet: wallet, success: true, exists: true };
        }
        console.log("Wallet Address does not exist")

        // Insert new wallet into the table
        await sql`
            INSERT INTO wallets (wallet_address, created_at, updated_at)
            VALUES (${wallet}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;
            console.log("Wallet inserted successfully");
       
            return { wallet: wallet, success: true, exists: false };
        }else{
            console.log("")
            return { wallet: wallet, success: false, exists: false };
        }
        // Check if wallet address already exists
       
    } catch (error) {
        console.error("Error handling wallet:", error);
        return { error: "Failed to handle wallet", success: false };
    }
}




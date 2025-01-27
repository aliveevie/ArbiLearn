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
            console.log("Wallet address already exists");
            return { wallet: wallet, success: true, exists: true };
        }

        // Insert new wallet into the table
        await sql`
            INSERT INTO wallets (wallet_address, created_at, updated_at)
            VALUES (${wallet}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `;

        console.log("Wallet created successfully");
            return { wallet: wallet, success: true, exists: false };
        }else{

            console.log("Wallet is coming stay patiently!");
           
        }
        // Check if wallet address already exists
       
    } catch (error) {
        console.error("Error handling wallet:", error);
        return { error: "Failed to handle wallet", success: false };
    }
}




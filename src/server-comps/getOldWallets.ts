"use server"

import { sql } from "@vercel/postgres";
import { neon } from '@neondatabase/serverless';
export const sql2 = neon(`${process.env.DATABASE_URL}`);
// ... existing code ...

export async function getOldWallets() {
    try {
        // Fetch wallets from Vercel Postgres
        console.log('Fetching wallets from Vercel Postgres...');
        const oldWallets = await sql`
            SELECT 
                wallet_address,
                created_at,
                updated_at
            FROM wallets
        `;
        console.log(`Found ${oldWallets.rows.length} wallets in Vercel Postgres`);

        let insertedCount = 0;
        let duplicateCount = 0;

        // For each wallet, check if it exists in Neon DB and insert if it doesn't
        for (const wallet of oldWallets.rows) {
            console.log(`Processing wallet wallet_address: ${wallet.wallet_address}`);
            
            // Check for existing wallet in Neon DB
            const existingWallet = await sql2`
                SELECT wallet_address FROM wallets 
                WHERE wallet_address = ${wallet.wallet_address}
            `;

            if (existingWallet.length === 0) {
                // Insert wallet with exact same timestamps
                await sql2`
                    INSERT INTO wallets (
                        wallet_address, 
                        created_at, 
                        updated_at, 
                        
                    ) VALUES (
                        ${wallet.wallet_address}, 
                        ${wallet.created_at || new Date()}, 
                        ${wallet.updated_at || new Date()},
                    )
                `;
                console.log(`Inserted wallet: ${wallet.wallet_address} (created: ${wallet.created_at}, updated: ${wallet.updated_at}})`);
                insertedCount++;
            } else {
                console.log(`Skipping duplicate wallet: ${wallet.wallet_address}`);
                duplicateCount++;
            }
        }

        console.log('Migration completed:');
        console.log(`- Total wallets processed: ${oldWallets.rows.length}`);
        console.log(`- New wallets inserted: ${insertedCount}`);
        console.log(`- Duplicates skipped: ${duplicateCount}`);

        return {
            total: oldWallets.rows.length,
            inserted: insertedCount,
            duplicates: duplicateCount
        };

    } catch (error) {
        console.error('Error in getOldWallets:', error);
        throw error;
    }
}
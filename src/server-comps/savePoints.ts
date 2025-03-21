"use server";

import { sql } from './neon';
import { createUserPointsDetailsTable } from '../lib/db-tables';
import { getWalletID } from './getWalletId';

export async function updateUserPoints() {
    try {
        // First ensure the table exists
        await createUserPointsDetailsTable();

        // Get all wallet addresses from wallets table
        const wallets = await sql`
            SELECT wallet_address 
            FROM wallets
        `;

        // Process each wallet
        for (const wallet of wallets) {
            // Check if user already has points
            const existingPoints = await sql`
                SELECT wallet_address 
                FROM user_points_details 
                WHERE wallet_address = ${wallet.wallet_address}
            `;

            // Skip if user already has points
            if (existingPoints.length > 0) {
                continue;
            }

            // Get user_id for the wallet
            const walletIdResult = await getWalletID(wallet.wallet_address);
            
            if (!walletIdResult.success) {
                console.error(`Failed to get user_id for wallet: ${wallet.wallet_address}`);
                continue;
            }

            // Insert initial points record with signup_bonus instead of profile_completion
            await sql`
                INSERT INTO user_points_details (
                    user_id,
                    wallet_address,
                    signup_bonus
                ) VALUES (
                    ${walletIdResult.user_id},
                    ${wallet.wallet_address},
                    50
                )
            `;
        }

        return { success: true, message: "User points updated successfully" };
    } catch (error) {
        console.error("Error updating user points:", error);
        return { success: false, error: "Failed to update user points" };
    }
}
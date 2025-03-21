"use server";

import { sql } from './neon';
import { createUserPointsDetailsTable } from '../lib/db-tables';
import { getWalletID } from './getWalletId';

export async function updateUserPoints() {
    try {
     
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

export async function addUserSignupBonus(walletAddress: string) {
    console.log('🚀 Starting signup bonus process for wallet:', walletAddress);
    
    try {
   
        // Check if user already has points
        console.log('🔍 Checking if user already has points...');
        const existingPoints = await sql`
            SELECT * FROM user_points_details 
            WHERE wallet_address = ${walletAddress}
        `;
        console.log('📊 Existing points check result:', {
            found: existingPoints.length > 0,
            recordsFound: existingPoints.length
        });

        // If user already has points, return early
        if (existingPoints.length > 0) {
            console.log('⚠️ User already has points, aborting bonus addition');
            return {
                success: false,
                message: "User already has points registered"
            };
        }

        // Get user_id for the wallet
        console.log('🔑 Fetching user_id for wallet...');
        const walletIdResult = await getWalletID(walletAddress);
        console.log('👤 Wallet ID result:', JSON.stringify(walletIdResult, null, 2));
        
        if (!walletIdResult.success) {
            console.error('❌ Failed to get user_id for wallet:', walletAddress);
            return {
                success: false,
                error: `Failed to get user_id for wallet: ${walletAddress}`
            };
        }

        // Insert initial points record with signup bonus
        console.log('💰 Attempting to insert signup bonus points...');
        await sql`
            INSERT INTO user_points_details (
                user_id,
                wallet_address,
                signup_bonus
            ) VALUES (
                ${walletIdResult.user_id},
                ${walletAddress},
                50
            )
        `;
        console.log('✅ Successfully inserted signup bonus points');

        const result = {
            success: true,
            message: "Signup bonus points added successfully",
            data: {
                walletAddress,
                bonusPoints: 50,
                userId: walletIdResult.user_id
            }
        };
        console.log('🎉 Operation completed successfully:', JSON.stringify(result, null, 2));
        return result;

    } catch (error) {
        console.error('❌ Error in addUserSignupBonus:', error);
        console.error('📜 Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
        console.error('🔍 Error details:', {
            message: error instanceof Error ? error.message : String(error),
            walletAddress,
            timestamp: new Date().toISOString()
        });
        return {
            success: false,
            error: "Failed to add signup bonus points",
            details: error instanceof Error ? error.message : String(error)
        };
    }
}
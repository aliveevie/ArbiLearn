"use server"

import { createAmbassadorTable } from "@/lib/db-tables";
import { getWalletID } from "./getWalletId";
import { sql } from "./neon";

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

export async function genAmbsRef(wallet: string | undefined) {
    if (!wallet) {
        console.log("Debug: No wallet provided");
        return { error: "No wallet address provided" };
    }

    try {
        // Get wallet ID and extract just the user_id number
        const walletData = await getWalletID(wallet);
        if (!walletData.success) {
            console.log("Debug: Wallet not found in database");
            return { error: "Wallet not registered" };
        }
        
        const userId = walletData.user_id; // Extract the actual user_id number
        console.log("Debug: User ID:", userId);

        // Check if ambassador already exists
        const existingAmbassador = await sql`
            SELECT referral_code 
            FROM ambassadors 
            WHERE user_id = ${userId}
        `;

        if (existingAmbassador.length > 0) {
            console.log("Debug: Returning existing ambassador code");
            const referralLink = `${baseUrl}/pages/app?amb=${existingAmbassador[0].referral_code}`;
            return { success: true, referralLink };
        }

        // Generate new referral code
        const referralCode = `AMB${Math.random().toString(36).substring(2, 8).toLowerCase()}`;
        console.log("Debug: Generated new code:", referralCode);

        // Insert new ambassador
        await sql`
            INSERT INTO ambassadors (user_id, referral_code)
            VALUES (${userId}, ${referralCode})
        `;
        console.log("Debug: New ambassador code inserted successfully");

        const referralLink = `${baseUrl}/pages/app?amb=${referralCode}`;
        return { success: true, referralLink };

    } catch (error) {
        console.log("Debug: Error occurred:", error);
        return { error: "Failed to generate ambassador referral code" };
    }
}
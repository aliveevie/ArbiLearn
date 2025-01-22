"use server"

import { revalidatePath } from "next/cache"
import { createProfileTable, createReferralTable, updateReferralPoints } from "@/lib/db-tables"
import { sql } from "@vercel/postgres";


export async function submitProfile(profileData: any) {
  try {
    // Create profile table if it doesn't exist
    // await createProfileTable();

    // Get user_id from wallets table using wallet address
    const userResult = await sql`
      SELECT user_id FROM wallets 
      WHERE wallet_address = ${profileData.wallet}
    `;

    if (userResult.rows.length === 0) {
        console.log("Wallet NOT found")
        return;
    }

    const userId = userResult.rows[0].user_id;

    // Check if profile already exists for this user
    const existingProfile = await sql`
      SELECT profile_id FROM profiles 
      WHERE user_id = ${userId}
    `;

    if (existingProfile.rows.length > 0) {
      // Update existing profile
      await sql`
        UPDATE profiles 
        SET 
          name = ${profileData.name},
          email = ${profileData.email},
          x_handle = ${profileData.xHandle},
          discord = ${profileData.discord},
          telegram = ${profileData.telegram},
          bio = ${profileData.bio},
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `;
      console.log("Profile updated successfully");
    } else {
      // Insert new profile
      await sql`
        INSERT INTO profiles (
          user_id,
          name,
          email,
          x_handle,
          discord,
          telegram,
          bio
        ) VALUES (
          ${userId},
          ${profileData.name},
          ${profileData.email},
          ${profileData.xHandle},
          ${profileData.discord},
          ${profileData.telegram},
          ${profileData.bio}
        )
      `;
      console.log("Profile created successfully");
    }

    // Revalidate the path to update the UI
   // revalidatePath("/earn-points");
    return { 
      success: true, 
      message: existingProfile.rows.length > 0 ? "Profile updated" : "Profile created" 
    };

  } catch (error) {
    console.error("Error handling profile:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to handle profile" 
    };
  }
}

export async function generateReferralLink(wallet: string | undefined) {

  // Generate a unique referral code
  await createReferralTable();
  const referralCode = Math.random().toString(36).substring(7)
  console.log("Wallet address:", wallet)

  // In a real application, you would save this code to the database
  console.log("Generated referral code:", referralCode)

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  return `${baseUrl}/pages/app?ref=${referralCode}`
}

export async function processReferral(referralCode: string) {
  // In a real application, you would validate the referral code and update the database
  console.log("Processing referral code:", referralCode)

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the path to update the UI
  revalidatePath("/earn-points")

  return { success: true, message: "Referral processed successfully" }
}


"use server"

import { revalidatePath } from "next/cache"
import { createProfileTable, createReferralTable, updateReferralPoints, createPointsTable,updateReferralTable } from "@/lib/db-tables"
import { sql } from "@vercel/postgres";
import { getWalletID } from "./getWalletId";
const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'


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

//  const referralCode = Math.random().toString(36).substring(7)

export async function generateReferralLink(wallet: string) {
  try {
      // Ensure referral table exists
     
      // Get user_id from wallet
      const walletResult = await getWalletID(wallet);
      if (!walletResult.success) {
          console.log("Wallet not found");
          return
      }

      const userId = walletResult.user_id;

      // Check if user already has a referral code
      const existingReferral = await sql`
          SELECT referall_code
          FROM referrals 
          WHERE user_id = ${userId}
      `;

    
      if (existingReferral.rows.length > 0) {
          // Return existing referral code
       let referralCode = existingReferral.rows[0].referall_code;
          console.log("Existing referral code retrieved");
          console.log(referralCode)
          return {
            success: true,
            exists: false,
            referralCode: referralCode,
            referralLink: `${baseUrl}/pages/app?ref=${referralCode}`
        };
      }

      // Generate new unique referral code
    let  referralCode = Math.random().toString(36).substring(7);
      // Save new referral code
      await sql`
          INSERT INTO referrals (
              user_id, 
              referall_code, 
              referral_wallet,
              points
          ) VALUES (
              ${userId}, 
              ${referralCode}, 
              ${wallet},
              0
          )
      `;

      console.log("New referral code generated and saved");
      return {
        success: true,
        exists: false,
        referralCode: referralCode,
        referralLink: `${baseUrl}/pages/app?ref=${referralCode}`
    };

  } catch (error) {
      console.error("Error generating referral link:", error);
      return "Failed to generate referral link" 
  }
}

export async function processReferral(referralCode: string, refWallet: string) {
  try {
      // Get referral details from the referrals table
      const referralResult = await sql`
          SELECT user_id, referral_wallet 
          FROM referrals 
          WHERE referall_code = ${referralCode}
      `;

      if (referralResult.rows.length === 0) {
          return { 
              success: false, 
              message: "Invalid referral code" 
          };
      }

      const referrer = referralResult.rows[0];

      // Check if referrer's wallet matches the referred wallet (prevent self-referral)
      if (referrer.referral_wallet.toLowerCase() === refWallet.toLowerCase()) {
          return { 
              success: false, 
              message: "Cannot refer yourself" 
          };
      }

      // Check if this wallet has already been referred
      const existingReferralCheck = await sql`
          SELECT referred_wallet 
          FROM referrals 
          WHERE referred_wallet = ${refWallet}
      `;

      if (existingReferralCheck.rows.length > 0) {
          return { 
              success: false, 
              message: "Wallet has already been referred" 
          };
      }

      // Update referrals table with the referred wallet
      await sql`
          UPDATE referrals 
          SET 
              referred_wallet = ${refWallet},
              updated_at = CURRENT_TIMESTAMP
          WHERE referall_code = ${referralCode}
      `;

      // Update points for the referrer
      await sql`
          INSERT INTO points (user_id, points)
          VALUES (${referrer.user_id}, 10)
          ON CONFLICT (user_id) 
          DO UPDATE SET 
              points = points.points + 10,
              updated_at = CURRENT_TIMESTAMP
      `;
      console.log("Referral processed successfully");
      return { 
          success: true, 
          message: "Referral processed successfully" 
      };

  } catch (error) {
      console.error("Error processing referral:", error);
      return { 
          success: false, 
          message: "Failed to process referral" 
      };
  }
}

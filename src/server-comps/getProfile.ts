"use server"
import { sql } from "./neon";
import { getWalletID } from "./getWalletId";

export async function getProfile(wallet: string | undefined, email: string | undefined) {
    if (!wallet) {
        console.log("No wallet address provided");
        return { success: false, message: "Please provide a wallet address." };
    }

    try {
        const user_id = (await getWalletID(wallet)).user_id;

        // Check if the wallet exists in the profiles table
        const profileResult = await sql`
            SELECT * FROM profiles WHERE user_id = ${user_id}
        `;

        if (profileResult.length > 0) {
            const profile = profileResult[0];
            console.log("Profile found in profiles table:", profile);
            return {
                success: true,
                message: profile.name,
                data: profile
            }
        } else if (email) {
            // Try to find by email if user_id lookup failed
            const emailProfileResult = await sql`
                SELECT * FROM profiles WHERE email = ${email}
            `;
            
            if (emailProfileResult.length > 0) {
                const profile = emailProfileResult[0];
                console.log("Profile found by email:", profile);
                return {
                    success: true,
                    message: profile.name,
                    data: profile
                }
            }
            
            const learnethonResult = await sql`
                SELECT * FROM learnethon_participants WHERE email = ${email}
            `;

            if (learnethonResult.length > 0) {
                const learnethonProfile = learnethonResult[0];
             
                // Insert the profile into the profiles table
                await sql`
                    INSERT INTO profiles (user_id, name, email, x_handle, discord, telegram)
                    VALUES (${user_id}, ${learnethonProfile.name}, ${learnethonProfile.email}, ${learnethonProfile.x_username}, ${learnethonProfile.discord_username}, ${learnethonProfile.telegram_username})
                `;

                // Return the name and email from the newly created profile
                return {
                    success: true,
                    message: learnethonProfile.name,
                    data: learnethonProfile
                }
            }
        }
        
        console.log("No profile found for this wallet");
        return {
            success: false,
            message: "Create a profile or apply via the learnethon form."
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        return { 
            success: false, 
            message: "An error occurred while fetching the profile." 
        };
    }
}
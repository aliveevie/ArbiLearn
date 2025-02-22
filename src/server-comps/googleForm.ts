"use server"

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
import { createLearnethonTable } from "@/lib/db-tables";
import { sql } from "./neon";
import { getProfile } from "./getProfile";
import { create } from "node:domain";

// Set up authentication
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function insertParticipant(participant: any) {
  try {
    const result = await sql`
      INSERT INTO learnethon_participants (
        name, 
        email, 
        x_username, 
        telegram_username, 
        discord_username, 
        membership_status,
        source_referral
      )
      VALUES (
        ${participant.name},
        ${participant.email},
        ${participant.x_username},
        ${participant.telegram_username},
        ${participant.discord_username},
        ${participant.membership_status},
        ${participant.source_referral}
      )
      ON CONFLICT (email) 
      DO UPDATE SET
        name = EXCLUDED.name,
        x_username = EXCLUDED.x_username,
        telegram_username = EXCLUDED.telegram_username,
        discord_username = EXCLUDED.discord_username,
        membership_status = EXCLUDED.membership_status,
        source_referral = EXCLUDED.source_referral,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
   // console.log(`Processed participant: ${participant.email}`);
    return result;
  } catch (error) {
    console.error(`Error processing participant ${participant.email}:`, error);
    return null;
  }
}

export async function getGoogleFormData() {
 // await createLearnethonTable();
  try {
    const spreadsheetId = process.env.sheet_id;
    const range = 'A:I';
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      console.log('No new data found.');
      return;
    }

    // Skip the header row
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const participant = {
        name: row[1],
        email: row[2],
        x_username: row[3],
        telegram_username: row[4],
        discord_username: row[5],
        membership_status: row[7], // 'Already minted', 'Newly minted', or 'Never Minted'
        source_referral: row[8]
      };

    //  console.log(participant);

      await insertParticipant(participant);
    }

    console.log(`Processed ${rows.length - 1} participants`);
  } catch (error) {
    console.error('Error processing Google Form data:', error);
  }
}

// Function to run every 5 minutes
// export async function startPeriodicCheck() {
//   console.log('Starting periodic check for new participants...');
  
//   // Run immediately on start
//   await getGoogleFormData();
  
  
//   // Then run every 5 minutes
//   setInterval(async () => {
//     console.log('Running scheduled check for new participants...');
//     await getGoogleFormData();
//   }, 5 * 60 * 1000); // 5 minutes in milliseconds
// }

// // Start the periodic check
// startPeriodicCheck().catch(console.error);

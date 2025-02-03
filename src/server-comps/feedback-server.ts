"use server"

import { sql } from './neon';
import { getWalletID } from './getWalletId';

export type FeedbackData = {
  wallet: string | undefined;
  name: string;
  twitter: string;
  generalFeedback: string;
  satisfaction: 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very_dissatisfied';
  rating: number;
  smartAccountExperience: string;
  testimony: string;
};

export async function submitFeedback(data: FeedbackData): Promise<boolean> {
  try {
    // For now, just logging the received data
    
    const userId = await getWalletID(data.wallet)
    const user_id = userId.user_id

    // TODO: Uncomment and use this when ready to save to database
    
    console.log("Inserting Data...")

    await sql`
      INSERT INTO feedback (
        user_id,
        name,
        twitter,
        general_feedback,
        satisfaction,
        rating,
        smart_account_experience,
        testimony
      ) VALUES (
        ${user_id},
        ${data.name},
        ${data.twitter},
        ${data.generalFeedback},
        ${data.satisfaction},
        ${data.rating},
        ${data.smartAccountExperience},
        ${data.testimony}
      )
    `;

    console.log("Data Inserted Successfully!")

    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
}


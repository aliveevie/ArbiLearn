"use server"

import { sql } from './neon';
import { createFeedbackForm } from '@/lib/db-tables';

export type FeedbackData = {
  userId: number;
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
    await createFeedbackForm();
    console.log('Received feedback data on server:', {
      timestamp: new Date().toISOString(),
      ...data
    });

    // TODO: Uncomment and use this when ready to save to database
    /*
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
        ${data.userId},
        ${data.name},
        ${data.twitter},
        ${data.generalFeedback},
        ${data.satisfaction},
        ${data.rating},
        ${data.smartAccountExperience},
        ${data.testimony}
      )
    `;
    */

    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
}

// Optional: Helper function to get feedback by user ID
export async function getFeedbackByUserId(userId: number) {
  try {
    // For now, just logging the request
    console.log('Attempting to fetch feedback for user:', userId);

    // TODO: Uncomment and use this when ready to fetch from database
    /*
    const feedback = await sql`
      SELECT * FROM feedback 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;
    return feedback.rows;
    */

    return null;
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return null;
  }
}
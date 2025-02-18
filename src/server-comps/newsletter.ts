'use server'

import { sql } from "./neon";
import { createNewsletterTable } from "@/lib/db-tables";
import { sendWelcomeEmail } from "@/lib/functions/newsletterEmail";

export async function newsletters(email: string) {
   // await createNewsletterTable()
    try {
        // Check if email already exists
        const existingEmail = await sql`
            SELECT email FROM newsletters WHERE email = ${email}
        `;

        if (existingEmail.length > 0) {
            return { status: 'subscribed', message: 'Email already subscribed' };
        }

        // If email doesn't exist, insert it
        await sql`
            INSERT INTO newsletters (email) VALUES (${email})
        `;
        
        // Send welcome email to new subscriber
        await sendWelcomeEmail(email);
        
        return { status: 'success', message: 'Successfully subscribed to newsletter' };
    } catch (error) {
        throw new Error("Error managing newsletter subscription");
    }
}
'use server'

import { revalidatePath } from 'next/cache'
import { sql } from "@vercel/postgres";
import { createVerificationsTable } from '@/lib/db-tables';

const MAX_FILE_SIZE = 200 * 1024; // 200KB in bytes

export async function verifyForm(formData: FormData) {
 // await createVerificationsTable();
  try {
    // Get form data
    const resource = formData.get('resource') as string;
    const completionType = formData.get('completionType') as string;
    const details = formData.get('details') as string;
    const evidence = formData.get('evidence') as File;
    const walletAddress = formData.get('address') as string;
    const evidenceType = formData.get('evidenceType') as string;
    const evidenceLink = formData.get('evidenceLink') as string;
    
    // Validate file size for file uploads
    if (evidenceType === 'file' && evidence.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 200KB limit. Please upload a smaller file or use a link instead.');
    }

    let fileUrl = '';
    let isLink = false;
    
    if (evidenceType === 'link' && evidenceLink) {
      // If it's a link submission, just use the link directly
      fileUrl = evidenceLink;
      isLink = true;
    } else if (evidenceType === 'file' && evidence) {
      // Convert the file to an array buffer for database storage
      const buffer = await evidence.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);
      
      // For reference only (the actual file is stored in the file_data column)
      fileUrl = `db://file-${Date.now()}-${evidence.name}`;
    }
    
    // Create a userId for this verification
    const userId = Math.random().toString(36).substring(2);

    if (isLink) {
      // For links, just store the URL
      await sql`
        INSERT INTO course_verification (
          user_id,
          resource_name,
          resource_type,
          resource_size,
          resource_path,
          is_link,
          completion_type,
          details,
          evidence_url,
          wallet_address,
          file_data
        ) VALUES (
          ${userId},
          ${resource},
          'link',
          0,
          ${fileUrl},
          ${isLink},
          ${completionType},
          ${details},
          ${fileUrl},
          ${walletAddress},
          null
        )
      `;
    } else if (evidenceType === 'file' && evidence) {
      // Convert the file to an array buffer for database storage
      const buffer = await evidence.arrayBuffer();
      const fileBuffer = Buffer.from(buffer);
      
      // Encode the buffer for PostgreSQL bytea type
      const hexString = '\\x' + fileBuffer.toString('hex');
      
      // Insert everything including the file data in one operation
      await sql.query(`
        INSERT INTO course_verification (
          user_id,
          resource_name,
          resource_type,
          resource_size,
          resource_path,
          is_link,
          completion_type,
          details,
          evidence_url,
          wallet_address,
          file_data
        ) VALUES (
          '${userId}',
          '${resource}',
          '${evidence.type}',
          ${evidence.size},
          '${fileUrl}',
          ${isLink},
          '${completionType}',
          '${details}',
          '${fileUrl}',
          '${walletAddress}',
          '${hexString}'::bytea
        )
      `);
    }

    console.log('Data Submitted Successfully');
    revalidatePath('/courses');
    return { success: true };

  } catch (error) {
    // Log the detailed error server-side
    console.error("Error processing form:", error);
    
    // Return a user-friendly error message
    return { 
      success: false, 
      error: error instanceof Error && error.message.includes("200KB") 
        ? error.message // Only pass through file size errors
        : "An internal server error occurred. Please try again later."
    };
  }
}
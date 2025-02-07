'use server'

import { revalidatePath } from 'next/cache'
import { sql } from "@vercel/postgres";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes
const UPLOAD_DIR = 'public/courses_files';

export async function verifyForm(formData: FormData) {
  try {
    // Get form data
    const resource = formData.get('resource') as string;
    const completionType = formData.get('completionType') as string;
    const details = formData.get('details') as string;
    const evidence = formData.get('evidence') as File;
    const walletAddress = formData.get('address') as string;
    
    // Validate file size
    if (evidence.size > MAX_FILE_SIZE) {
      throw new Error('File size exceeds 100kb limit');
    }

    // Create upload directory if it doesn't exist
    await mkdir(UPLOAD_DIR, { recursive: true });

    // Generate unique filename and path
    const fileExtension = path.extname(evidence.name);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const publicPath = `/courses_files/${fileName}`;

    // Save file
    const bytes = await evidence.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save to database
   const result =  await sql`
      INSERT INTO course_verification (
        user_id,
        resource_name,
        resource_type,
        resource_size,
        resource_path,
        completion_type,
        details,
        evidence_url,
        wallet_address
      ) VALUES (
        ${Math.random().toString(36).substring(2)}, /* temporary user_id generation */
        ${resource},
        ${evidence.type},
        ${evidence.size},
        ${publicPath},
        ${completionType},
        ${details},
        ${publicPath},
        ${walletAddress}
      )
    `;

    if(result){
      console.log('Data Submitted Successfully');
    }

    revalidatePath('/courses');
    return { success: true };

  } catch (error) {
    console.error('Error processing form:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}
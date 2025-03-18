import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (!id) {
    return new NextResponse('File ID is required', { status: 400 });
  }
  
  try {
    // Extract the ID from the path
    const fileId = id.split('-')[1]; // Extract the timestamp part as ID
    
    // Get the file from the database
    const result = await sql`
      SELECT file_data, resource_type 
      FROM course_verification 
      WHERE resource_path LIKE ${'%' + fileId + '%'}
    `;
    
    if (result.length === 0 || !result[0].file_data) {
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Get the file data
    const fileBuffer = result[0].file_data;
    const contentType = result[0].resource_type || 'application/octet-stream';
    
    // Return the file
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline',
      },
    });
  } catch (error) {
    console.error('Error retrieving file:', error);
    return new NextResponse('Server error', { status: 500 });
  }
} 
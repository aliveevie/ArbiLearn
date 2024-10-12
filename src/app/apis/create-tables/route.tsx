import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { createUsersTable, createTestTable } from "@/lib/db-tables";

export async function GET() {
  try {
   // await createUsersTable();
  //  await createTestTable();
    
    return NextResponse.json({
      message: "Tables created successfully"
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating tables:", error);
    return NextResponse.json({
      message: "Error creating tables"
    }, { status: 500 });
  }
}
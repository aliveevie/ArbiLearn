import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create the test_table
    await sql`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        text_column TEXT
      )
    `;

    console.log("Table created successfully");

    // Get the list of all tables
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    const tableNames = result.rows.map(row => row.table_name);

    return NextResponse.json({
      message: "Tables created successfully",
      tables: tableNames
    }, { status: 200 });

  } catch (error) {
    console.error("Error creating table:", error);
    return NextResponse.json({
      message: "Error creating table"
    }, { status: 500 });
  }
}
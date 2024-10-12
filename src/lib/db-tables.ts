import { sql } from "@vercel/postgres";

export async function createUsersTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log("Users table created successfully");
}

export async function createTestTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS test_table (
      id SERIAL PRIMARY KEY,
      text_column TEXT
    )
  `;
  console.log("Test table created successfully");
}
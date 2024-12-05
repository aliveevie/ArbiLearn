import { sql } from "@vercel/postgres";

/**
 * Creates a users table in the database if it doesn't exist.
 * The table contains columns for:
 * - id: Auto-incrementing primary key
 * - username: Unique username limited to 50 characters
 * - email: Unique email address limited to 100 characters
 * - password: Hashed password string
 * - created_at: Timestamp of when the user was created
 */
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

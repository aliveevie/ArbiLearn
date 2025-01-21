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

export async function createVerificationsTable() {
  // Create the table
  await sql`
    CREATE TABLE IF NOT EXISTS course_verification (
      user_id VARCHAR(255) PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      resource_name VARCHAR(255) NOT NULL,
      resource_type VARCHAR(100) NOT NULL,
      resource_size BIGINT NOT NULL,
      resource_path TEXT NOT NULL,
      completion_type VARCHAR(50) NOT NULL,
      details TEXT NOT NULL,
      evidence_url TEXT NOT NULL,
      wallet_address VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      reviewed_at TIMESTAMP WITH TIME ZONE,
      reviewed_by VARCHAR(255),
      CONSTRAINT verifications_status_check 
        CHECK (status IN ('pending', 'approved', 'rejected'))
    )
  `;

  // Create wallet address index
  // await sql`
  //   CREATE INDEX IF NOT EXISTS idx_verifications_wallet_address 
  //   ON verifications(wallet_address)
  // `;

  // // Create status index
  // await sql`
  //   CREATE INDEX IF NOT EXISTS idx_verifications_status 
  //   ON verifications(status)
  // `;

  console.log("Verifications table created successfully");
}

export async function createWalletsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS wallets (
      user_id SERIAL PRIMARY KEY,
      wallet_address VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
  console.log("Wallets table created successfully");
}

export async function createProfileTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      profile_id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      name VARCHAR(255),
      email VARCHAR(255),
      x_handle VARCHAR(255),
      discord VARCHAR(255), 
      telegram VARCHAR(255),
      bio TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES wallets(user_id)
    )
  `;
  console.log("Profiles table created successfully");
}
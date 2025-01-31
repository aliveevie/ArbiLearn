// import { sql } from "@vercel/postgres";
import { neon } from '@neondatabase/serverless';
const sql = neon(`${process.env.DATABASE_URL}`);

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


export async function createReferralTable() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS referrals (
                referral_id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                referall_code VARCHAR(255) NOT NULL,
                referral_wallet VARCHAR(255),
                points INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES wallets(user_id),
                UNIQUE(referral_wallet)
            )
        `;
        console.log("Referrals table created successfully");
    } catch (error) {
        console.error("Error creating referrals table:", error);
        throw error;
    }
}

// Helper function to update points for a referral
export async function updateReferralPoints(userId: number, referralWallet: string) {
    try {
        await sql`
            INSERT INTO referrals (user_id, referral_wallet, points)
            VALUES (${userId}, ${referralWallet}, 10)
            ON CONFLICT (referral_wallet)
            DO UPDATE SET 
                points = referrals.points + 10,
                updated_at = CURRENT_TIMESTAMP
        `;
        console.log("Referral points updated successfully");
    } catch (error) {
        console.error("Error updating referral points:", error);
        throw error;
    }
}

export async function createPointsTable() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS points (
                point_id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL UNIQUE,
                points INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES wallets(user_id)
            )
        `;
        console.log("Points table created successfully");
    } catch (error) {
        console.error("Error creating points table:", error);
    }
}

export async function updateReferralTable() {
  try {
      // Remove points column if it exists
      await sql`
          ALTER TABLE referrals 
          DROP COLUMN IF EXISTS points;
      `;

      // Add referred_wallet column if it doesn't exist
      await sql`
          DO $$ 
          BEGIN 
              IF NOT EXISTS (
                  SELECT 1 
                  FROM information_schema.columns 
                  WHERE table_name = 'referrals' 
                  AND column_name = 'referred_wallet'
              ) THEN 
                  ALTER TABLE referrals 
                  ADD COLUMN referred_wallet VARCHAR(255);
              END IF;
          END $$;
      `;

      console.log("Referrals table updated successfully");
  } catch (error) {
      console.error("Error updating referrals table:", error);
      throw error;
  }
}

export async function createAmbassadorTable() {
  try {
      await sql`
          CREATE TABLE IF NOT EXISTS ambassadors (
              ambassador_id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              referral_code VARCHAR(255),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES wallets(user_id),
              UNIQUE(referral_code)
          )
      `;
      console.log("Ambassadors table created successfully");
  } catch (error) {
      console.error("Error creating ambassadors table:", error);
      throw error;
  }
}

export async function createAmbassadorsEarnings() {
  try {
      await sql`
          CREATE TABLE IF NOT EXISTS ambassador_earnings (
              earning_id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              ambassador_id INTEGER NOT NULL,
              referrals INTEGER,
              successful_onboarding INTEGER,
              earnings DECIMAL(10, 2),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (ambassador_id) REFERENCES ambassadors(ambassador_id),
              FOREIGN KEY (user_id) REFERENCES wallets(user_id)
          )
      `;
      console.log("Ambassadors earnings table created successfully");
  } catch (error) {
      console.error("Error creating ambassadors earnings table:", error);
      throw error;
  }
}

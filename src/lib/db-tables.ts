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
  // Create the table with file data storage
  await sql`DROP TABLE IF EXISTS course_verification CASCADE`;
  console.log("Course verification table dropped successfully");
  await sql`
    CREATE TABLE IF NOT EXISTS course_verification (
      user_id VARCHAR(255) PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      resource_name VARCHAR(255) NOT NULL,
      resource_type VARCHAR(100) NOT NULL,
      resource_size BIGINT NOT NULL,
      resource_path TEXT,
      file_data BYTEA,  -- Binary data to store files directly
      is_link BOOLEAN DEFAULT FALSE, -- Flag to indicate if it's a link or file
      completion_type VARCHAR(50) NOT NULL,
      details TEXT NOT NULL,
      evidence_url TEXT,
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

export async function createFeedbackForm() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        feedback_id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        twitter VARCHAR(255),
        general_feedback TEXT,
        satisfaction VARCHAR(50) CHECK (
          satisfaction IN (
            'very_satisfied',
            'satisfied',
            'neutral',
            'dissatisfied',
            'very_dissatisfied'
          )
        ),
        rating INTEGER CHECK (rating >= 0 AND rating <= 5),
        smart_account_experience TEXT,
        testimony TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES wallets(user_id),
        CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
      )
    `;

    // Create an index on user_id for faster lookups

    console.log("Feedback table created successfully");
  } catch (error) {
    console.error("Error creating feedback table:", error);
    throw error;
  }
}

export async function createNewsletterTable() { 
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS newsletters (
        newsletter_id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Newsletters table created successfully");
  } catch (error) {
    console.error("Error creating newsletters table:", error);
    throw error;
  }
}

export async function createLearnethonTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS learnethon_participants (
        participant_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        wallet_id INTEGER,
        x_username VARCHAR(255),
        telegram_username VARCHAR(255),
        discord_username VARCHAR(255),
        membership_status VARCHAR(50) CHECK (
          membership_status IN ('Already minted', 'Newly minted', 'Never Minted')
        ),
        source_referral VARCHAR(100),
        wallet_address VARCHAR(255),
        registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log("Learnethon participants table created successfully");
  } catch (error) {
    console.error("Error creating learnethon participants table:", error);
    throw error;
  }
}

export async function createLeaderBoadTable() {
  try {
    // Drop the table if it exists
    // await sql`
    //   DROP TABLE IF EXISTS leaderboard CASCADE
    // `;
    
    // Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        wallet_address VARCHAR(255) UNIQUE NOT NULL,
        points INTEGER DEFAULT 0,
        rank INTEGER DEFAULT 0,
        attempts INTEGER DEFAULT 3,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Leaderboard table dropped and recreated successfully");
  } catch (error) {
    console.error("Error recreating leaderboard table:", error);
    throw error;
  }
}

export async function createLearnthonResultsTable() {
  try {
    // Drop the table if it exists
    // await sql`
    //   DROP TABLE IF EXISTS learnthon_results CASCADE
    // `;
    
    // Create the table
    await sql`
      CREATE TABLE IF NOT EXISTS learnthon_results (
        result_id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        wallet_address VARCHAR(255) UNIQUE NOT NULL,
        score INTEGER DEFAULT 0,
        questions_answered INTEGER DEFAULT 0,
        question_points INTEGER DEFAULT 0,
        attempt_points INTEGER DEFAULT 0,
        total_points INTEGER DEFAULT 0,
        position INTEGER DEFAULT 0,
        total_attempts INTEGER DEFAULT 3,
        attempts_left INTEGER DEFAULT 3,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Learnthon results table dropped and recreated successfully");
  } catch (error) {
    console.error("Error recreating learnthon results table:", error);
    throw error;
  }
}

export async function createQuestionsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS exam_questions (
        question_id SERIAL PRIMARY KEY,
        question_text TEXT NOT NULL,
        options JSONB NOT NULL,
        correct_answer INTEGER NOT NULL,
        category VARCHAR(100) NOT NULL,
        difficulty VARCHAR(50) DEFAULT 'medium',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log("Exam questions table created successfully");
  } catch (error) {
    console.error("Error creating exam questions table:", error);
    throw error;
  }
}

export async function populateQuestionsTable() {
  try {
    // Check if questions already exist
    const count = await sql`SELECT COUNT(*) FROM exam_questions`;
    if (count[0].count > 0) {
      console.log("Questions already exist in the database");
      return;
    }
    
    // Import questions from the static file
    const { questions } = await import("@/app/sections/leanerthon/_UI/questions");
    
    // Insert questions in batches
    for (const q of questions) {
      await sql`
        INSERT INTO exam_questions 
          (question_text, options, correct_answer, category, difficulty)
        VALUES 
          (${q.question}, ${JSON.stringify(q.options)}, ${q.correctAnswer}, 
           ${determineCategory(q.question)}, ${determineDifficulty(q.question)})
      `;
    }
    
    console.log("Questions populated successfully");
  } catch (error) {
    console.error("Error populating questions:", error);
    throw error;
  }
}

function determineCategory(question: string): string {
  if (question.toLowerCase().includes("metis")) return "metis";
  if (question.toLowerCase().includes("thirdweb")) return "thirdweb";
  if (question.toLowerCase().includes("thrive")) return "thrive";
  return "web3";
}

function determineDifficulty(question: string): string {
  if (question.length > 120) return "hard";
  if (question.length > 80) return "medium";
  return "easy";
}

export async function recreateVerificationsTable() {
  try {
    // Drop the existing table
    await sql`DROP TABLE IF EXISTS course_verification CASCADE`;
    
    // Create the table with file data storage
    await sql`
      CREATE TABLE IF NOT EXISTS course_verification (
        user_id VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        resource_name VARCHAR(255) NOT NULL,
        resource_type VARCHAR(100) NOT NULL,
        resource_size BIGINT NOT NULL,
        resource_path TEXT,
        file_data BYTEA,  -- Binary data to store files directly
        is_link BOOLEAN DEFAULT FALSE, -- Flag to indicate if it's a link or file
        completion_type VARCHAR(50) NOT NULL,
        details TEXT NOT NULL,
        evidence_url TEXT,
        wallet_address VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        reviewed_at TIMESTAMP WITH TIME ZONE,
        reviewed_by VARCHAR(255),
        CONSTRAINT verifications_status_check 
          CHECK (status IN ('pending', 'approved', 'rejected'))
      )
    `;
    console.log("Verifications table recreated successfully");
  } catch (error) {
    console.error("Error recreating verifications table:", error);
    throw error;
  }
}

"use server"

import * as from from "@/lib/db-tables"

export async function initializeTables() {
    try {
      // Create all tables in the correct order (respecting foreign key constraints)
      await from.createUsersTable();
      await from.createTestTable();
      await from.createWalletsTable();  // Need this first as other tables reference it
      await from.createVerificationsTable();
      await from.createProfileTable();
      await from.createReferralTable();
      await from.createPointsTable();
      await from.createAmbassadorTable();
      await from.createAmbassadorsEarnings();
      
      // Update referral table structure
      await from.updateReferralTable();
      
      console.log("All tables initialized successfully");
    } catch (error) {
      console.error("Error initializing tables:", error);
      throw error;
    }
}
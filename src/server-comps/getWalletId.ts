import { sql } from "@vercel/postgres";

export async function getWalletID(address: string) {
    try {
        const result = await sql`
            SELECT user_id 
            FROM wallets 
            WHERE wallet_address = ${address}
        `;

        if (result.rows.length === 0) {
            return {
                success: false,
                error: "Wallet address not found"
            };
        }

        return {
            success: true,
            user_id: result.rows[0].user_id
        };
    } catch (error) {
        console.error("Error fetching wallet ID:", error);
        return {
            success: false,
            error: "Failed to fetch wallet ID"
        };
    }
}
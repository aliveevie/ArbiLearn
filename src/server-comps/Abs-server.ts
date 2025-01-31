import { createAmbassadorTable, createAmbassadorsEarnings } from "@/lib/db-tables";
import { getWalletID } from "./getWalletId";
import { sql } from "@vercel/postgres";

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

export async function genAmbsRef(wallet: string | undefined){
        await createAmbassadorTable();
        await createAmbassadorsEarnings();

        console.log(wallet);
}

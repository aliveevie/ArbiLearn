"use server"
import { sql } from "./neon"
import { getUser, createThirdwebClient } from "thirdweb"
import { getUserEmail } from "thirdweb/wallets/in-app";
import { client } from "@/thirdweb/constant";


export async function getProfile(wallet: string | undefined, email: string){
    
 }
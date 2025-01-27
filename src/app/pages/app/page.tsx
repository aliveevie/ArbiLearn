"use client"

import { processReferral } from "@/server-comps/userActions";
import PeepComponent from "@/app/sections/start-peep";
import { useActiveAccount } from "thirdweb/react";


export default async function Page({ searchParams }: { searchParams: { ref?: string } }) {
    const account = useActiveAccount();

    if (searchParams.ref) {
        await processReferral(searchParams.ref, account?.address);
    }

    return (
        <div>
            <PeepComponent />
        </div>
    );
}
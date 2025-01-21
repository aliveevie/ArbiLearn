import { processReferral } from "@/server-comps/userActions";
import PeepComponent from "@/app/sections/start-peep";

export default async function Page({ searchParams }: { searchParams: { referral?: string } }) {
    if (searchParams.referral) {
        await processReferral(searchParams.referral);
    }

    return (
        <div>
            <PeepComponent />
        </div>
    );
}
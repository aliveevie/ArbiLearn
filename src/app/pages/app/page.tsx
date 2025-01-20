import { processReferral } from "@/server-comps/points";
import PeepComponent from "@/app/sections/start-peep";

export default async function Page({ searchParams }: { searchParams: { ref?: string } }) {
    if (searchParams.ref) {
        await processReferral(searchParams.ref);
    }

    return (
        <div>
            <PeepComponent />
        </div>
    );
}
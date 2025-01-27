"use client"
import PeepComponent from "@/app/sections/start-peep";


export default async function Page({ searchParams }: { searchParams: { ref?: string } }) {
  
    return (
        <div>
            <PeepComponent />
        </div>
    );
}
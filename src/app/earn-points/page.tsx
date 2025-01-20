import { processReferral } from "@/server-comps/points"
import EarnPoints from "@/components/EarnPoints"

export default async function EarnPointsPage({ searchParams }: { searchParams: { referral?: string } }) {
  if (searchParams.referral) {
    await processReferral(searchParams.referral)
  }

  return <EarnPoints />
}
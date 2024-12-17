import { Hero } from "@/components/hero"
import { HeaderComponent } from "@/components/header"
import { WelcomeSection } from "./sections/welcome"
import { VantaGlobe } from './sections/vanta'
import HeroSectionTwo from "./sections/section2"

export default function Home() {
  return (
    <main className="min-h-screen">
       <WelcomeSection />
       <HeroSectionTwo />
    </main>
  )
}


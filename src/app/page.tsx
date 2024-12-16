import { Hero } from "@/components/hero"
import { HeaderComponent } from "@/components/header"
import { WelcomeSection } from "./sections/welcome"
import { VantaGlobe } from './sections/vanta'

export default function Home() {
  return (
    <main className="min-h-screen">
       <VantaGlobe />
    </main>
  )
}


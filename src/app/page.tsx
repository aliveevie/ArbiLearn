"use client"

import { Hero } from "@/components/hero"
import { HeaderComponent } from "@/components/header"
import { WelcomeSection } from "./sections/welcome"
import HeroSectionTwo from "./sections/section2"
import { useState } from "react"
import HeroSection3 from "./sections/sectionthree"
import MobilePopup from "./sections/popupBox"
import SectionFour from "./sections/sectionFour"
import SectionFive from "./sections/sectionFive"

export default function Home() {

  return (
    <main className="min-h-screen">
       <WelcomeSection />
       <HeroSectionTwo />
       <HeroSection3 />
       <SectionFour />
       <SectionFive />
      
    </main>
  )
}


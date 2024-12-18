"use client"

import { Hero } from "@/components/hero"
import { HeaderComponent } from "@/components/header"
import { WelcomeSection } from "./sections/welcome"
import HeroSectionTwo from "./sections/section2"
import { useState } from "react"
import HeroSection3 from "./sections/sectionthree"
import MobilePopup from "./sections/popupBox"

export default function Home() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFinishReading = () => {
    console.log('Finished reading');
  };

  const handleMintNFT = () => {
    console.log('Minting NFT');
  };

  return (
    <main className="min-h-screen">
       <WelcomeSection />
       <HeroSectionTwo />
       <HeroSection3 />
       <MobilePopup
        isOpen={true}
        onClose={() => setIsPopupOpen(false)}
        header="Mobile Content"
        finishReading={handleFinishReading}
        mintNFT={handleMintNFT}
        content={{
          type: 'page',
          url: 'https://example.com'
        }}
      />
    </main>
  )
}


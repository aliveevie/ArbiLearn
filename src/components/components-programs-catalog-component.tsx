'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import program1 from '../../public/courses/program1.jpg';
import program2 from '../../public/courses/program2.jpg';
import program3 from '../../public/courses/program3.jpg';
import program4 from '../../public/courses/program4.jpg';
import program5 from '../../public/courses/program5.jpg';
import program6 from '../../public/courses/program6.jpg';

const programs = [
  {
    id: 1,
    title: "Blockchain Developer Bootcamp",
    image: program1,
    link: "/programs/blockchain-developer-bootcamp"
  },
  {
    id: 2,
    title: "DeFi Specialist Certification",
    image: program2,
    link: "/programs/defi-specialist-certification"
  },
  {
    id: 3,
    title: "Crypto Trading Mastery",
    image: program3,
    link: "/programs/crypto-trading-mastery"
  },
  {
    id: 4,
    title: "NFT Creation and Marketing",
    image: program4,
    link: "/programs/nft-creation-marketing"
  },
  {
    id: 5,
    title: "Blockchain for Business Leaders",
    image: program5,
    link: "/programs/blockchain-for-business-leaders"
  },
  {
    id: 6,
    title: "Web3 Full Stack Development",
    image: program6,
    link: "/programs/web3-full-stack-development"
  }
]


export function ProgramsCatalogComponent() {
  const [hoveredProgram, setHoveredProgram] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 300 // Adjust this value to control scroll distance
      const maxScroll = container.scrollWidth - container.clientWidth
      let newPosition

      if (direction === 'left') {
        newPosition = Math.max(0, scrollPosition - scrollAmount)
      } else {
        newPosition = Math.min(maxScroll, scrollPosition + scrollAmount)
      }

      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setScrollPosition(newPosition)
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const handleScrollEvent = () => {
        setScrollPosition(container.scrollLeft)
      }
      container.addEventListener('scroll', handleScrollEvent)
      return () => container.removeEventListener('scroll', handleScrollEvent)
    }
  }, [])

  return (
    <div className="w-full py-12 relative">
      <h2 className="text-3xl font-bold text-center mb-8">Our Programs</h2>
      <div className="relative overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 p-4 overflow-x-scroll scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          {programs.map((program) => (
            <div
              key={program.id}
              className="flex-none"
              style={{
                scrollSnapAlign: 'start',
              }}
            >
              <Link href={program.link} passHref>
                <Card 
                  className={`w-[300px] transition-all duration-300 ease-in-out ${
                    hoveredProgram === program.id ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredProgram(program.id)}
                  onMouseLeave={() => setHoveredProgram(null)}
                >
                  <CardContent className="p-0">
                    <Image
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-[200px] object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg whitespace-normal">{program.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={() => handleScroll('left')}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={() => handleScroll('right')}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
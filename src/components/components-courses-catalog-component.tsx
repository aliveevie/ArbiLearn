'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: "Introduction to Blockchain",
    image: "/placeholder.svg?height=200&width=300",
    link: "/courses/intro-to-blockchain"
  },
  {
    id: 2,
    title: "Smart Contract Development",
    image: "/placeholder.svg?height=200&width=300",
    link: "/courses/smart-contract-development"
  },
  {
    id: 3,
    title: "DeFi Fundamentals",
    image: "/placeholder.svg?height=200&width=300",
    link: "/courses/defi-fundamentals"
  },
  {
    id: 4,
    title: "NFT Creation and Trading",
    image: "/placeholder.svg?height=200&width=300",
    link: "/courses/nft-creation-trading"
  },
  {
    id: 5,
    title: "Crypto Trading Strategies",
    image: "/placeholder.svg?height=200&width=300",
    link: "/courses/crypto-trading-strategies"
  },
  {
    id: 6,
    title: "Blockchain for Enterprise",
    image: "/placeholder.svg?height=200&width=300",
    link: "/courses/blockchain-for-enterprise"
  }
]

export function CoursesCatalogComponent() {
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)
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
      <h2 className="text-3xl font-bold text-center mb-8">Our Courses</h2>
      <div className="relative overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-4 p-4 overflow-x-scroll scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-none"
              style={{
                scrollSnapAlign: 'start',
              }}
            >
              <Link href={course.link} passHref>
                <Card 
                  className={`w-[300px] transition-all duration-300 ease-in-out ${
                    hoveredCourse === course.id ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <CardContent className="p-0">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-[200px] object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg whitespace-normal">{course.title}</h3>
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
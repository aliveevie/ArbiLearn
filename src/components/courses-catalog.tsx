'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'

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

  return (
    <div className="w-full py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Courses</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex w-max space-x-4 p-4">
          {courses.map((course) => (
            <Link key={course.id} href={course.link} passHref>
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
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
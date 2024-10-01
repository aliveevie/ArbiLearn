'use client';

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useWeb3Modal } from '@web3modal/react'
import { Button } from "@/components/ui/button"
import logo from '../../public/logo.png'; // Replace with the path to your logo image

export function HeaderComponent() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)
  const { open } = useWeb3Modal()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/public/logo.png" className="flex-shrink-0">
          <Image src={logo} alt="Logo" width={60} height={60} />
        </Link>
        
        <nav className="flex-grow flex justify-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <div className="relative"
               onMouseEnter={() => setIsCoursesOpen(true)}
               >
            <button className="text-gray-600 hover:text-gray-900 flex items-center">
              Courses
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isCoursesOpen && (
              <div 
              onMouseLeave={() => setIsCoursesOpen(false)}
              className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link href="/courses/intro-to-web3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Intro to Web3</Link>
                <Link href="/courses/learn-arbitrum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Learn Arbitrum</Link>
                <Link href="/courses/fullstack-dev" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fullstack Dev</Link>
                <Link href="/courses/defi-fundamentals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">DeFi Fundamentals</Link>
                <Link href="/courses/smart-contract-security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Smart Contract Security</Link>
                <Link href="/courses/nft-development" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">NFT Development</Link>
              </div>
            )}
          </div>
          <div className="relative"
               onMouseEnter={() => setIsProgramsOpen(true)}
          >
            <button className="text-gray-600 hover:text-gray-900 flex items-center">
              Programs
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isProgramsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <Link href="/programs/learn-to-earn" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Learn-to-Earn</Link>
                <Link href="/programs/web2-web3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Web2-Web3</Link>
                <Link href="/programs/master-web3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Master Web3</Link>
                <Link href="/programs/networking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Networking</Link>
                <Link href="/programs/hackathons" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hackathons</Link>
              </div>
            )}
          </div>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
          <w3m-button />
      </div>
    </header>
  )
}
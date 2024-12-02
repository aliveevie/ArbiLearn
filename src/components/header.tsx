'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useWeb3Modal } from '@web3modal/react';
import { Button } from "@/components/ui/button";
import logo from '../../public/logo.png';

export function HeaderComponent() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { open } = useWeb3Modal();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown: 'courses' | 'programs') => {
    if (dropdown === 'courses') {
      setIsCoursesOpen(!isCoursesOpen);
      setIsProgramsOpen(false);
    } else {
      setIsProgramsOpen(!isProgramsOpen);
      setIsCoursesOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="Logo" width={60} height={60} />
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className={`hidden md:flex space-x-6`}>
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-900 flex items-center">
              Courses
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Intro to Web3</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Learn Arbitrum</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Fullstack Dev</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">DeFi Fundamentals</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Smart Contract Security</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">NFT Development</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="text-gray-600 hover:text-gray-900 flex items-center">
              Programs
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Learn-to-Earn</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Web2-Web3</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Master Web3</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Networking</Link>
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Hackathons</Link>
            </div>
          </div>
          <Link href="#" className="text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>

        <Link href="/login" className="hidden md:block">
          <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">
            LogIn
          </Button>
        </Link>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
          <button 
            onClick={() => toggleDropdown('courses')} 
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
          >
            Courses
            <ChevronDown className={`h-4 w-4 transform transition-transform ${isCoursesOpen ? 'rotate-180' : ''}`} />
          </button>
          {isCoursesOpen && (
            <div className="bg-gray-50 px-4 py-2">
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Intro to Web3</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Learn Arbitrum</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Fullstack Dev</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">DeFi Fundamentals</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Smart Contract Security</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">NFT Development</Link>
            </div>
          )}
          <button 
            onClick={() => toggleDropdown('programs')} 
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
          >
            Programs
            <ChevronDown className={`h-4 w-4 transform transition-transform ${isProgramsOpen ? 'rotate-180' : ''}`} />
          </button>
          {isProgramsOpen && (
            <div className="bg-gray-50 px-4 py-2">
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Learn-to-Earn</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Web2-Web3</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Master Web3</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Networking</Link>
              <Link href="#" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Hackathons</Link>
              <Link href="learn-earn-metis" className="block py-2 text-sm text-gray-700 hover:bg-gray-100">Learn Earn Metis</Link>
            </div>
          )}
          <Link href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
          <div className="flex justify-center py-2">
            <Button className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white">
              <Link href="/login" className="block text-center">LogIn</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
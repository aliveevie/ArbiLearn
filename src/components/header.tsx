'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import logo from '../../public/logo.png';

export function HeaderComponent() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsCoursesOpen(false);
      setIsProgramsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsCoursesOpen(false);
    setIsProgramsOpen(false);
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
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image src={logo} alt="ArbiLearn Logo" width={60} height={60} priority />
          </Link>

          <button 
            onClick={toggleMobileMenu} 
            className="md:hidden text-gray-600 focus:outline-none" 
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
              About
            </Link>
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('courses')}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center"
              >
                Courses
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isCoursesOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link href="/courses/intro-web3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Intro to Web3
                  </Link>
                  <Link href="/courses/learn-arbitrum" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Learn Arbitrum
                  </Link>
                  <Link href="/courses/fullstack" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Fullstack Development
                  </Link>
                  <Link href="/courses/defi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    DeFi Fundamentals
                  </Link>
                  <Link href="/courses/security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Smart Contract Security
                  </Link>
                  <Link href="/courses/nft" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    NFT Development
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('programs')}
                className="text-gray-700 hover:text-gray-900 font-medium flex items-center"
              >
                Programs
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isProgramsOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link href="/programs/learn-earn" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Learn-to-Earn
                  </Link>
                  <Link href="/programs/web2-web3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Web2-to-Web3
                  </Link>
                  <Link href="/programs/master-web3" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Master Web3
                  </Link>
                  <Link href="/programs/networking" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Networking
                  </Link>
                  <Link href="/programs/hackathons" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Hackathons
                  </Link>
                  <Link href="/programs/learn-earn-metis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Learn & Earn Metis
                  </Link>
                </div>
              )}
            </div>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="font-medium">
              <Link href="/start-learning">Start Learning</Link>
            </Button>
            <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu with Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Dark overlay that covers the entire screen */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
            onClick={toggleMobileMenu}
          />
          
          {/* Mobile menu panel */}
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-slate-50 shadow-xl z-50 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b bg-white">
              <Link href="/" className="flex-shrink-0" onClick={toggleMobileMenu}>
                <Image src={logo} alt="ArbiLearn Logo" width={60} height={60} />
              </Link>
              <button 
                onClick={toggleMobileMenu} 
                className="text-gray-600 hover:text-gray-900 focus:outline-none" 
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="h-full overflow-y-auto pb-32">
              <div className="px-4 py-6 space-y-6">
                <Link 
                  href="/" 
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  href="/about" 
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>

                {/* Courses Dropdown */}
                <div className="space-y-2">
                  <button 
                    onClick={() => toggleDropdown('courses')} 
                    className="flex justify-between items-center w-full text-lg font-medium text-gray-700 hover:text-gray-900"
                  >
                    Courses
                    <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isCoursesOpen && (
                    <div className="pl-4 space-y-2">
                      <Link 
                        href="/courses/intro-web3" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Intro to Web3
                      </Link>
                      <Link 
                        href="/courses/learn-arbitrum" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Learn Arbitrum
                      </Link>
                      <Link 
                        href="/courses/fullstack" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Fullstack Development
                      </Link>
                      <Link 
                        href="/courses/defi" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        DeFi Fundamentals
                      </Link>
                      <Link 
                        href="/courses/security" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Smart Contract Security
                      </Link>
                      <Link 
                        href="/courses/nft" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        NFT Development
                      </Link>
                    </div>
                  )}
                </div>

                {/* Programs Dropdown */}
                <div className="space-y-2">
                  <button 
                    onClick={() => toggleDropdown('programs')} 
                    className="flex justify-between items-center w-full text-lg font-medium text-gray-700 hover:text-gray-900"
                  >
                    Programs
                    <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isProgramsOpen && (
                    <div className="pl-4 space-y-2">
                      <Link 
                        href="/programs/learn-earn" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Learn-to-Earn
                      </Link>
                      <Link 
                        href="/programs/web2-web3" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Web2-to-Web3
                      </Link>
                      <Link 
                        href="/programs/master-web3" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Master Web3
                      </Link>
                      <Link 
                        href="/programs/networking" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Networking
                      </Link>
                      <Link 
                        href="/programs/hackathons" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Hackathons
                      </Link>
                      <Link 
                        href="/programs/learn-earn-metis" 
                        className="block py-2 text-gray-600 hover:text-gray-900"
                        onClick={toggleMobileMenu}
                      >
                        Learn & Earn Metis
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  href="/contact" 
                  className="block text-lg font-medium text-gray-700 hover:text-gray-900"
                  onClick={toggleMobileMenu}
                >
                  Contact
                </Link>
              </div>

              {/* Fixed bottom buttons */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full font-medium" 
                    onClick={toggleMobileMenu}
                  >
                    <Link href="/start-learning">Start Learning</Link>
                  </Button>
                  <Button 
                    className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium" 
                    onClick={toggleMobileMenu}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-[76px]" />
    </>
  );
}

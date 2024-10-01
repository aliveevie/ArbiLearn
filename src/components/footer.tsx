'use client'

import Link from 'next/link'
import { Globe, MessageSquare, Twitter, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FooterComponent() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">About ArbiLearn</h3>
            <p className="text-sm">
              ArbiLearn is your gateway to mastering Web3 and blockchain technology. 
              Join our community and start your journey into the decentralized future.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Programs</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/programs/learn-to-earn" className="hover:text-gray-800 transition-colors">Learn-to-Earn</Link></li>
              <li><Link href="/programs/web2-web3" className="hover:text-gray-800 transition-colors">Web2-Web3</Link></li>
              <li><Link href="/programs/master-web3" className="hover:text-gray-800 transition-colors">Master Web3</Link></li>
              <li><Link href="/programs/networking" className="hover:text-gray-800 transition-colors">Networking</Link></li>
              <li><Link href="/programs/hackathons" className="hover:text-gray-800 transition-colors">Hackathons</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses/intro-to-web3" className="hover:text-gray-800 transition-colors">Intro to Web3</Link></li>
              <li><Link href="/courses/learn-arbitrum" className="hover:text-gray-800 transition-colors">Learn Arbitrum</Link></li>
              <li><Link href="/courses/fullstack-dev" className="hover:text-gray-800 transition-colors">Fullstack Dev</Link></li>
              <li><Link href="/courses/defi-fundamentals" className="hover:text-gray-800 transition-colors">DeFi Fundamentals</Link></li>
              <li><Link href="/courses/smart-contract-security" className="hover:text-gray-800 transition-colors">Smart Contract Security</Link></li>
              <li><Link href="/courses/nft-development" className="hover:text-gray-800 transition-colors">NFT Development</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-gray-800 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-gray-800 transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-gray-800 transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-800 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-800 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Subscribe to Newsletter</h3>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <a href="https://www.arbilearn.club" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Globe className="w-6 h-6" />
                <span className="sr-only">Website</span>
              </a>
              <a href="https://discord.gg/4ZZKRYVE" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                <MessageSquare className="w-6 h-6" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="https://x.com/ArbiLearn" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://t.me/+Ygy97nUwmpRjNTk0" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 transition-colors">
                <Send className="w-6 h-6" />
                <span className="sr-only">Telegram</span>
              </a>
            </div>
            <p className="text-sm text-center">
              © {new Date().getFullYear()} ArbiLearn. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
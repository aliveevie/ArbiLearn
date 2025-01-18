'use client'

import Link from 'next/link'
import { Globe, MessageSquare, Twitter, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FooterComponent() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8 mb-8">
          {/* Newsletter Subscription */}
          <div className="w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">Subscribe to Newsletter</h3>
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

          {/* Social Icons */}
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
        </div>
      </div>
    </footer>
  )
}
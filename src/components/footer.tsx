'use client'

import Link from 'next/link'
import { Globe, MessageSquare, Twitter, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { newsletters } from '@/server-comps/newsletter'

export function FooterComponent() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await newsletters(email)
      setMessage(response.message)
      if (response.status === 'success' || response.status === 'subscribed') {
        setEmail('')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8 mb-8">
          {/* Newsletter Subscription */}
          <div className="w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 text-center">Subscribe to Newsletter</h3>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
              {message && (
                <p className={`text-sm text-center ${
                  message.includes('success') || message.includes('subscribed') 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {message}
                </p>
              )}
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
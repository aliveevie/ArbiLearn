'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Lock, User, Chrome, AtSign } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeaderComponent } from './header'

export function SignupFormComponent() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [showBlockchainGame, setShowBlockchainGame] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    router.push('/profile')
  }

  return (
    <><HeaderComponent /><div className="w-full max-w-md mx-auto space-y-6 p-6 bg-white rounded-xl shadow-md mt-20">
      <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up for ArbiLearn</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10"
              required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10"
              required />
          </div>
        </div>
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>

      <div className="relative">
        <Separator className="my-4" />
        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
          Or sign up with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full">
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>

      <div className="space-y-4">
        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
          MetaMask
        </Button>
        <Button variant="outline" className="w-full">
          Connect Wallet
        </Button>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <Link href="/login">
          <Button variant="link" className="text-sm text-blue-600 hover:underline">
            Log in
          </Button>
        </Link>

      </div>
    </div></>
  )
}
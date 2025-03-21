'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, Lock, User, Chrome, AtSign, AlertCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HeaderComponent } from './header'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoginFormComponent } from './login-form'
import  BlockchainGame  from './gaming-learning'

export function SignupFormComponent() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [userExists, setUserExists] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false);
  const [showBlockchainGame, setShowBlockchainGame] = useState(false);


  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setUserExists(false)
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/apis/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });

      const data = await response.json();

    
      if (response.ok) {
        setShowBlockchainGame(true);
      } else {
        if (data.error === "User already exists") {
          setUserExists(true)
        } else {
          setError(data.error || 'An error occurred during signup')
        }
      }
    } catch (err) {
      setError('An error occurred during signup')
    } finally {
      setIsLoading(false)
    }
  }

  if (showBlockchainGame) {
    return <BlockchainGame />;
  }

  if (showSignIn) {
    return <LoginFormComponent />;
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        {userExists && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>User Already Exists</AlertTitle>
            <AlertDescription>
              An account with this email or username already exists. Please try logging in or use a different email/username.
            </AlertDescription>
          </Alert>
        )}
        {error && !userExists && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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
                required
              />
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
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

        <div className="relative">
          <Separator className="my-4" />
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            Or Try with
          </span>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Connect Wallet
          </Button>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Button variant="link" className="text-sm text-blue-600 hover:underline" onClick={() => setShowSignIn(true)}>
            Login
          </Button>
        </div>
      </div>
    </>
  )
}
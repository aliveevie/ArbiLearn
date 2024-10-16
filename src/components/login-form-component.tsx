'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, Lock, User, Chrome } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeaderComponent } from './header';
import { toast } from 'react-hot-toast';

export function LoginFormComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful');
        router.push('/profile');
      } else {
        toast.error(data.message || 'Invalid username or password');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <HeaderComponent />
      <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-white rounded-xl shadow-md mt-20">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to ArbiLearn</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="relative">
          <Separator className="my-4" />
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            Or continue with
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
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link href="/signup">
            <Button variant="link" className="text-sm text-blue-600 hover:underline">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Mail, Lock, User, Chrome } from 'lucide-react';
import { HeaderComponent } from './header';
import { SignupFormComponent } from "@/components/components-signup-form-component";
import BlockchainGame from "@/components/gaming-learning";
import ProfileSection from "../app/sections/profile";
import { ConnectThirdWebWallet } from "@/thirdweb/thirdwebwallet"

export function LoginFormComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);
  const [showBlockchainGame, setShowBlockchainGame] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/apis/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowBlockchainGame(true);
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showBlockchainGame) {
    return <ProfileSection />;
  }

  if (showSignup) {
    return <SignupFormComponent />;
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
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
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm text-gray-500">
            Or Try with
          </span>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Button variant="link" className="text-sm text-blue-600 hover:underline" onClick={() => setShowSignup(true)}>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
}
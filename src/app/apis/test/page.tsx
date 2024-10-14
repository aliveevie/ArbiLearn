'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [tokenStatus, setTokenStatus] = useState<string>('Checking...')
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      // Log all cookies for debugging
      console.log('All cookies:', document.cookie)

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth_token='))
        ?.split('=')[1]

      if (!token) {
        setTokenStatus('No token found')
        console.log("No auth_token found in cookies")
        // Uncomment the next line when ready to redirect
        // router.push('/login')
        return
      }

      setTokenStatus('Token found, verifying...')

    }

    verifyToken()
  }, [router])

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <p className="mb-4">Token Status: {tokenStatus}</p>
      {user ? (
        <div className="space-y-4">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}
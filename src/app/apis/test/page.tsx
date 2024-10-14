'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface User {
  id: string;
  username: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)auth_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (!token) {
        router.push('/login')
        return
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
        const response = await fetch(`/apis/users/${decoded.userId}`)
        if (response.ok) {
          const userData: User = await response.json()
          setUser(userData)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        router.push('/login')
      }
    }

    verifyToken()
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
      <div className="space-y-4">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function CreateTables() {
  const [message, setMessage] = useState('')
  const [tables, setTables] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTables = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-tables')
      const data = await response.json()
      setMessage(data.message)
      setTables(data.tables || [])
    } catch (error) {
      setMessage('Error creating tables')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Database Tables</h1>
      <Button onClick={handleCreateTables} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Tables'}
      </Button>
      {message && (
        <p className="mt-4 text-lg">
          {message}
        </p>
      )}
      {tables.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Tables in the database:</h2>
          <ul className="list-disc list-inside">
            {tables.map((table, index) => (
              <li key={index}>{table}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
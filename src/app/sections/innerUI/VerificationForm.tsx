'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { verifyForm } from '@/app/apis/verify-form/route'

interface VerificationFormProps {
  resourceName: string;
}

export function VerificationForm({ resourceName }: VerificationFormProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (file) {
      formData.append('evidence', file)
    }
    await verifyForm(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Verify Completion for {resourceName}</h3>
      
      <div>
        <Label htmlFor="completionType">Completion Type</Label>
        <Select name="completionType" required>
          <SelectTrigger>
            <SelectValue placeholder="Select completion type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complete">Complete</SelectItem>
            <SelectItem value="visit">Visit</SelectItem>
            <SelectItem value="participate">Participate</SelectItem>
            <SelectItem value="enroll">Enroll</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="details">Verification Details</Label>
        <Textarea 
          id="details" 
          name="details" 
          placeholder="Provide details about your completion/participation" 
          required
        />
      </div>

      <div>
        <Label htmlFor="evidence">Evidence of Completion</Label>
        <Input 
          id="evidence" 
          type="file" 
          onChange={(e) => setFile(e.target.files?.[0] || null)} 
          required
        />
      </div>

      <Button type="submit">Send Verification</Button>
    </form>
  )
}


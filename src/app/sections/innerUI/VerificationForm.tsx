'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// remove the Select imports since we won't need them anymore
import { Textarea } from "@/components/ui/textarea"
import { verifyForm } from '@/app/apis/verify-form/verify-form'
import { X, Loader2 } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

interface Resource {
  name: string;
  url: string;
}

interface VerificationFormProps {
  resources: Resource[];
  onClose: () => void;
  address: string | undefined;
}

export function VerificationForm({ resources, onClose, address }: VerificationFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedResource, setSelectedResource] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    if (file) {
      formData.append('evidence', file)
    }
    if (address) {
      formData.append('address', address)
    }
    try {
      const result = await verifyForm(formData)
      if (result.success) {
        toast({
          title: "Verification Submitted",
          description: "Your verification has been submitted successfully.",
        })
        onClose()
      } else {
        throw new Error('Failed to submit verification')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit verification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 p-2"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <h3 className="text-lg font-semibold">Verify Completion</h3>
      
      <div>
        <Label htmlFor="resource">Resource</Label>
        <select 
          id="resource"
          name="resource" 
          required 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
          onChange={(e) => setSelectedResource(e.target.value)}
        >
          <option value="">Select a resource</option>
          {resources.map((resource) => (
            <option key={resource.name} value={resource.name}>
              {resource.name}
            </option>
          ))}
        </select>
      </div>

      {selectedResource && (
        <>
          <div>
            <Label htmlFor="completionType">Completion Type</Label>
            <select 
              id="completionType"
              name="completionType" 
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select completion type</option>
              <option value="complete">Complete</option>
              <option value="visit">Visit</option>
              <option value="participate">Participate</option>
              <option value="enroll">Enroll</option>
            </select>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Verification'
            )}
          </Button>
        </>
      )}
    </form>
  )
}

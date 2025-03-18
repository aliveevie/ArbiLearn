'use client'

import { useState, useRef } from 'react'
import { AlertCircle, X, Upload, Link as LinkIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { verifyForm } from '@/app/apis/verify-form/verify-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [selectedResource, setSelectedResource] = useState('')
  const [completionType, setCompletionType] = useState('')
  const [details, setDetails] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [evidenceLink, setEvidenceLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [evidenceType, setEvidenceType] = useState<'file' | 'link'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 200 * 1024; // 200KB in bytes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > MAX_FILE_SIZE) {
        setError(`File size exceeds 200KB limit. Please upload a smaller file or use a link instead.`)
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        return
      }
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedResource) {
      setError('Please select a resource')
      return
    }
    
    if (!completionType) {
      setError('Please select completion type')
      return
    }
    
    if (!details) {
      setError('Please provide details about your completion')
      return
    }
    
    if (evidenceType === 'file' && !selectedFile) {
      setError('Please upload evidence of completion')
      return
    }
    
    if (evidenceType === 'link' && !evidenceLink) {
      setError('Please provide a link to your evidence')
      return
    }

    if (!address) {
      setError('Wallet address not found. Please connect your wallet.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('resource', selectedResource)
      formData.append('completionType', completionType)
      formData.append('details', details)
      formData.append('address', address)
      
      if (evidenceType === 'file' && selectedFile) {
        formData.append('evidence', selectedFile)
        formData.append('evidenceType', 'file')
      } else if (evidenceType === 'link') {
        // Create a text file with the URL for consistent handling
        const blob = new Blob([evidenceLink], { type: 'text/plain' })
        const file = new File([blob], 'evidence-link.txt', { type: 'text/plain' })
        formData.append('evidence', file)
        formData.append('evidenceType', 'link')
        formData.append('evidenceLink', evidenceLink)
      }

      const result = await verifyForm(formData)
      
      if (result.success) {
        toast({
          title: 'Verification submitted!',
          description: 'Your course completion has been submitted for verification.',
        })
        onClose()
      } else {
        // Show error message from server or fallback
        setError(result.error || 'Unable to submit verification. Please try again later.')
        
        // If there was a server error, suggest using link instead
        if (result.error?.includes('internal server error') && evidenceType === 'file') {
          setError(`${result.error} Try using a link to your evidence instead.`)
        }
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('Unable to connect to the server. Please check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Verify Course Completion</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    
      {error && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-start">
          <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="resource">Select Resource</Label>
            <select
              id="resource"
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select a resource --</option>
              {resources.map((resource, index) => (
                <option key={index} value={resource.name}>
                  {resource.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="completionType">Completion Type</Label>
            <select
              id="completionType"
              value={completionType}
              onChange={(e) => setCompletionType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select type --</option>
              <option value="Full Course">Full Course</option>
              <option value="Module">Module</option>
              <option value="Project">Project</option>
              <option value="Assignment">Assignment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              placeholder="Provide details about what you completed"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
         
          <Tabs defaultValue="file" onValueChange={(value) => setEvidenceType(value as 'file' | 'link')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="link">Provide Link</TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="mt-4">
              <div>
                <Label htmlFor="evidence">Evidence (Max 200KB)</Label>
                <div className="mt-1 flex items-center">
                  <Input
                    ref={fileInputRef}
                    id="evidence"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {selectedFile ? 'Change file' : 'Select file'}
                  </Button>
                  {selectedFile && (
                    <span className="ml-3 text-sm text-gray-500">
                      {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Upload a screenshot, certificate, or other evidence of your completion (Max 200KB)
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="mt-4">
              <div>
                <Label htmlFor="evidenceLink">Evidence Link</Label>
                <div className="mt-1 flex items-center">
                  <Input
                    id="evidenceLink"
                    type="url"
                    placeholder="https://example.com/your-certificate"
                    value={evidenceLink}
                    onChange={(e) => setEvidenceLink(e.target.value)}
                    className="w-full"
                  />
                  <LinkIcon className="ml-2 h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Provide a link to your certificate, GitHub repo, or other evidence
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Upload, Plus, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import UseCl1pZustand from '@/lib/store'
import { FilePreview } from '@/components/FilePreview'
import { DragDropZone } from '@/components/DragAndDrop'
import { convertToHours, type TimeUnit } from '@/utils/time'
import { fixFileName, getMaxFileSize, getMaxFileSizeFormatted, formatFileSize } from '@/utils/file'

interface FormData {
  name: string
  text: string
  password: string
  expiryValue: number
  expiryUnit: TimeUnit
  files: File[]
}

interface UploadProgress {
  [key: string]: number
}

export default function CreatePage({ propsName, propsPassword }: { propsName: string; propsPassword: string }) {
  const setMode = UseCl1pZustand((state) => state.setMode)
  const setName = UseCl1pZustand((state) => state.setName)
  const setPassword = UseCl1pZustand((state) => state.setPassword)
  const router = useRouter()

  const [passType, setPassType] = useState<'text' | 'password'>('password')

  const [formData, setFormData] = useState<FormData>({
    name: propsName || '',
    text: '',
    password: propsPassword || '',
    expiryValue: 1,
    expiryUnit: 'hours',
    files: []
  })

  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileSelect = (newFiles: File[]) => {
    const MAX_FILE_SIZE = getMaxFileSize();
    
    // Filter out files that are too large
    const validFiles = newFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File '${file.name}' is too large. Maximum size allowed is ${getMaxFileSizeFormatted()} 📁`);
        return false;
      }
      return true;
    });
    
    if (validFiles.length === 0) {
      return; // No valid files to add
    }
    
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const uploadFile = async (file: File, uploadData: { url: string, fields: Record<string, string> }) => {
    return new Promise<void>((resolve, reject) => {
      const formData = new FormData();
      // Append all fields from the backend
      Object.entries(uploadData.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // File must be the last field
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: progress
          }));
        }
      });
      xhr.onload = () => {
        if (xhr.status === 204 || xhr.status === 201) {
          resolve();
        } else {
          // Try to parse error response for meaningful messages
          try {
            const responseText = xhr.responseText;
            if (responseText) {
              const errorData = JSON.parse(responseText);
              if (errorData.message && errorData.message.includes('exceeds maximum allowed size')) {
                // Extract file size limit from error message
                const sizeMatch = errorData.message.match(/(\d+) bytes/);
                const maxSize = sizeMatch ? parseInt(sizeMatch[1]) : getMaxFileSize();
                const maxSizeFormatted = formatFileSize(maxSize);
                reject(new Error(`File '${file.name}' is too large. Maximum size allowed is ${maxSizeFormatted}`));
                return;
              }
              reject(new Error(errorData.message || `Failed to upload ${file.name}`));
              return;
            }
          } catch (parseError) {
            console.error(parseError)
            // If JSON parsing fails, use generic error
          }
          reject(new Error(`Failed to upload ${file.name}`));
        }
      };
      xhr.onerror = () => reject(new Error(`Network error while uploading ${file.name}`));
      xhr.open('POST', uploadData.url);
      xhr.send(formData);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (formData.files.length > 0) {
        const response = await fetch(`/api/cl1p/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cl1pName: formData.name,
            files: formData.files.map(file => ({
              fileName: fixFileName(file.name),
              contentType: file.type,
              size: file.size
            }))
          })
        })

        if (!response.ok) {
          throw new Error('Failed to get upload URLs')
        }

        const { data } = await response.json()
        // data.posts: [{ url, fields }]
        await Promise.all(
          formData.files.map((file, index) =>
            uploadFile(file, data.posts[index])
          )
        )
      }

      const hours = convertToHours(formData.expiryValue, formData.expiryUnit)

      const createResponse = await fetch(
        `/api/cl1p/create`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            password: formData.password,
            expiry: new Date(Date.now() + hours * 60 * 60 * 1000).toISOString(),
            text: formData.text !== '' ? formData.text : "No text shared 😔",
            files: formData.files.map(file => ({
              fileName: fixFileName(file.name),
              contentType: file.type,
              size: file.size
            }))
          })
        }
      )

      if (!createResponse.ok) {
        const error = await createResponse.json()
        throw new Error(error.message)
      }

      // Navigate to home page and trigger search for the created cl1p
      setMode('search')
      setName(formData.name)
      setPassword(formData.password)
      router.push('/')
      toast.success('Cl1p created successfully!')

    } catch (err) {
      // Clear upload progress on error
      setUploadProgress({});
      
      let errorMessage = 'An unknown error occurred';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        toast.error(errorMessage);
        return;
      }
      
      toast.error(`${errorMessage} 😔`);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Create New Cl1p
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your files and text with a unique link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="card-minimal p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Cl1p Name *
                </label>
                <input
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter a unique name"
                  required
                  type='text'
                  className="input-minimal"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password (Optional)
                </label>
                <div className="relative">
                  <input
                    name="password"
                    id="password"
                    type={passType}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Add password protection"
                    className="input-minimal pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setPassType(passType === 'password' ? 'text' : 'password')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {passType === 'password' ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* File Upload */}
          <div className="card-minimal p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload Files
            </h2>
            
            <DragDropZone onFileSelect={handleFileSelect} />

            {formData.files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-semibold mb-4">
                  Selected Files ({formData.files.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.files.map((file, index) => (
                    <FilePreview
                      key={`${file.name}-${index}`}
                      file={file}
                      onRemove={() => removeFile(index)}
                      progress={uploadProgress[file.name]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Expiry Settings */}
          <div className="card-minimal p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Expiry Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.expiryValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryValue: parseInt(e.target.value) || 1 }))}
                  className="input-minimal"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Unit
                </label>
                <Select
                  value={formData.expiryUnit}
                  onValueChange={(value: TimeUnit) => setFormData(prev => ({ ...prev, expiryUnit: value }))}
                >
                  <SelectTrigger className="input-minimal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">Minutes</SelectItem>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>


          {/* Text Content */}
          <div className="card-minimal p-6">
            <h2 className="text-lg font-semibold mb-4">
              Text Content (Optional)
            </h2>
            
            <textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Add any text content you'd like to share..."
              className="input-minimal min-h-[150px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="btn-minimal text-lg px-8 py-3"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black mr-3"></div>
                  Creating Cl1p...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Cl1p
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

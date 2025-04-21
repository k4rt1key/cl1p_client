'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import UseCl1pZustand from '@/lib/store'
import { FilePreview } from '@/components/FilePreview'
import { DragDropZone } from '@/components/DragAndDrop'
import { getTimeOptions, convertToHours, type TimeUnit } from '@/utils/time'
import { fixFileName } from '@/utils/file'

interface TimeOption {
  value: number;
  label: string;
}


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
  const router = useRouter()

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
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }

  const uploadFile = async (file: File, url: string) => {
    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total)
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: progress
        }))
      }
    })

    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(null)
        } else {
          reject(new Error(`Failed to upload ${file.name}`))
        }
      }
      xhr.onerror = () => reject(new Error(`Network error while uploading ${file.name}`))

      xhr.open('PUT', url)
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.send(file)
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (formData.files.length > 0) {
        const response = await fetch(`/api/cl1p/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            files: formData.files.map(file => ({
              fileName: fixFileName(file.name),
              contentType: file.type
            }))
          })
        })

        if (!response.ok) {
          throw new Error('Failed to get upload URLs')
        }

        const { data } = await response.json()

        await Promise.all(
          formData.files.map((file, index) =>
            uploadFile(file, data.urls[index])
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
              contentType: file.type
            }))
          })
        }
      )

      if (!createResponse.ok) {
        throw new Error('Failed to create clip')
      }

      setMode('search')
      router.push(`/${formData.name}`)
      toast.success('✨ Clip created successfully!')

    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred'
      toast.error(`${message} 😔`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeOptions = getTimeOptions(formData.expiryUnit)

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              type='text'
              className="w-full text-sm sm:text-lg py-2 px-3 border-2 border-gray-100 rounded-xl focus:outline-none border-2 border-gray-300"
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password (optional)"
              className="w-full text-sm sm:text-lg py-2 px-3 border-2 border-gray-100 rounded-xl focus:outline-none border-2 border-gray-300"
            />
          </div>



          <DragDropZone onFileSelect={handleFileSelect} />

          {formData.files.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">
              {formData.files.map((file, index) => (
                <FilePreview
                  key={`${file.name}-${index}`}
                  file={file}
                  onRemove={() => removeFile(index)}
                  progress={uploadProgress[file.name]}
                />
              ))}
            </div>
          )}
          <textarea
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Text (optional)"
            className="min-h-[15rem] rounded-md w-full text-xl bg-gray-50 border-2 border-gray-100 placeholder: p-3 placeholder:text-lg resize-none"
          />
          <div className="flex items-center gap-4">
            <Clock className="h-6 w-6 text-gray-700" />
            <div className="flex gap-2 flex-1">
              <Select
                value={formData.expiryValue.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, expiryValue: parseInt(value) }))}
              >
                <SelectTrigger className="bg-gray-100 border-0 h-12">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((option: TimeOption) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                      className="font-medium"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.expiryUnit}
                onValueChange={(value: TimeUnit) => setFormData(prev => ({
                  ...prev,
                  expiryUnit: value,
                  expiryValue: 1
                }))}
              >
                <SelectTrigger className="bg-gray-100 border-0 h-12">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours" className="font-medium">Hours</SelectItem>
                  <SelectItem value="days" className="font-medium">Days</SelectItem>
                  <SelectItem value="months" className="font-medium">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl font-medium text-base"
          >
            {isSubmitting ? 'Creating... 🚀' : 'Create Your Cl1p'}
          </Button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DragDropZoneProps {
  onFileSelect: (files: File[]) => void
}

export function DragDropZone({ onFileSelect }: DragDropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles)
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "min-h-[200px] flex flex-col items-center justify-center gap-4 transition-all duration-200",
        "bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200",
        isDragging && "border-gray-300 bg-gray-100 scale-[0.99]"
      )}
    >
      <input {...getInputProps()} />
      <Upload className={cn(
        "h-8 w-8 transition-colors duration-200",
        isDragActive ? "text-gray-500" : "text-gray-500"
      )} />
        <p className="text-md font-bold text-gray-600 font-medium">
          {isDragActive ? 
            "Drop files here..." : 
            "Drag & drop files or click to select"
          }
        </p>
    </div>
  )
}

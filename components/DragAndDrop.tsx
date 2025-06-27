'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, Image, Video, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DragDropZoneProps {
  onFileSelect: (files: File[]) => void
}

export function DragDropZone({ onFileSelect }: DragDropZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelect(acceptedFiles)
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "min-h-[200px] flex flex-col items-center justify-center gap-4 transition-all duration-200 rounded-lg border-2 border-dashed",
        "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
        "hover:border-gray-400 dark:hover:border-gray-600",
        isDragActive && [
          "border-gray-500 dark:border-gray-400",
          "bg-gray-100 dark:bg-gray-800"
        ]
      )}
    >
      <input {...getInputProps()} />
      
      <div className="text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          {isDragActive ? (
            <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400" />
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <File className="w-6 h-6 text-gray-400" />
              <Image className="w-6 h-6 text-gray-400" />
              <Video className="w-6 h-6 text-gray-400" />
              <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {isDragActive ? "Drop files here" : "Drag & drop files here"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isDragActive 
              ? "Release to upload your files" 
              : "or click to browse from your computer"
            }
          </p>
        </div>
        
        {/* Supported Formats */}
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Supports: Images, Videos, Documents, Audio, Archives, and more
        </div>
      </div>
    </div>
  )
}

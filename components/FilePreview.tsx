import { X, Download, Eye, File, FileText, Image as ImageIcon, Video, Music, Archive, Code, Presentation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface FilePreviewProps {
  file: File
  onRemove: () => void
  progress?: number
}

export function FilePreview({ file, onRemove, progress }: FilePreviewProps) {
  const isUploading = progress !== undefined && progress < 100

  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    
    // Images
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
      return <ImageIcon className="w-6 h-6" />
    }
    
    // Videos
    if (['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv', 'flv'].includes(extension)) {
      return <Video className="w-6 h-6" />
    }
    
    // Audio
    if (['mp3', 'wav', 'flac', 'aac', 'ogg'].includes(extension)) {
      return <Music className="w-6 h-6" />
    }
    
    // Documents
    if (['pdf'].includes(extension)) {
      return <FileText className="w-6 h-6" />
    }
    
    // Code files
    if (['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'json', 'xml', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go', 'rs'].includes(extension)) {
      return <Code className="w-6 h-6" />
    }
    
    // Archives
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(extension)) {
      return <Archive className="w-6 h-6" />
    }
    
    // Presentations
    if (['ppt', 'pptx', 'key'].includes(extension)) {
      return <Presentation className="w-6 h-6" />
    }
    
    // Default
    return <File className="w-6 h-6" />
  }

  const getFilePreview = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    
    // Images
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={200}
          height={200}
          className="w-full h-full object-cover rounded"
        />
      )
    } 
    
    // Videos
    if (['mp4', 'webm', 'ogg', 'avi', 'mov', 'mkv', 'flv'].includes(extension)) {
      return (
        <div className="relative w-full h-full">
          <video 
            className="w-full h-full object-cover rounded"
            preload="metadata"
          >
            <source src={URL.createObjectURL(file)} type={`video/${extension}`} />
          </video>
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
            <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      )
    }
    
    // Default file preview
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded p-4">
        <div className="mb-2">
          {getFileIcon(file)}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          {extension} File
        </p>
      </div>
    )
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="file-preview-minimal group relative">
      <div className={`relative aspect-square overflow-hidden transition-all duration-200 ${isUploading ? 'blur-[1px]' : ''}`}>
        {/* File Preview */}
        <div className="w-full h-full">
          {getFilePreview(file)}
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button 
              className="p-2 bg-white/80 rounded hover:bg-white transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const url = URL.createObjectURL(file)
                window.open(url, '_blank')
              }}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              className="p-2 bg-white/80 rounded hover:bg-white transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const link = document.createElement('a')
                link.href = URL.createObjectURL(file)
                link.download = file.name
                link.click()
              }}
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* File Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate mb-1">
              {file.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="uppercase">
                {file.name.split('.').pop()?.toLowerCase() || 'unknown'}
              </span>
              <span>•</span>
              <span>{formatFileSize(file.size)}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 dark:hover:bg-red-900/20"
            onClick={onRemove}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      
      {/* Upload Progress Overlay */}
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 rounded-lg">
          <div className="text-center space-y-2">
            <div className="relative">
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-gray-200 dark:stroke-gray-700"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-black dark:stroke-white"
                  strokeWidth="2"
                  strokeDasharray={100}
                  strokeDashoffset={100 - progress}
                  transform="rotate(-90 18 18)"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {progress}%
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Uploading...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


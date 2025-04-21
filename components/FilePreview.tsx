import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface FilePreviewProps {
  file: File
  onRemove: () => void
  progress?: number
}

export function FilePreview({ file, onRemove, progress }: FilePreviewProps) {
  const isUploading = progress !== undefined && progress < 100

  const getFilePreview = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || ''
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={200}
          height={200}
          className="object-cover rounded-lg"
        />
      )
    } else if (extension === 'pdf') {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <span className="text-4xl">📄</span>
        </div>
      )
    } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return (
        <video className="w-full h-full object-cover rounded-lg">
          <source src={URL.createObjectURL(file)} type={`video/${extension}`} />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
          <span className="text-4xl">📎</span>
        </div>
      )
    }
  }

  return (
    <div className="group relative">
      <div className={`relative rounded-lg overflow-hidden transition-all duration-200 ${isUploading ? 'blur-[2px]' : ''}`}>
        <div className="bg-card p-4 aspect-square flex flex-col">
          <div className="flex-1 flex items-center justify-center bg-muted rounded-lg mb-4">
            {getFilePreview(file)}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full h-12 w-12 bg-background shadow-lg flex items-center justify-center">
            <svg className="w-8 h-8" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-muted"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-primary"
                strokeWidth="2"
                strokeDasharray={100}
                strokeDashoffset={100 - progress}
                transform="rotate(-90 18 18)"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                className="fill-foreground text-xs font-medium"
              >
                {progress}%
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}


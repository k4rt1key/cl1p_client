'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from 'lucide-react'
import { DisplayProps } from '@/types/types'
import toast from 'react-hot-toast'

const FileEmoji = {
  pdf: '📄',
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
  gif: '🖼️',
  mp3: '🎵',
  wav: '🎵',
  mp4: '🎥',
  avi: '🎥',
  mov: '🎥',
  default: '📎'
}

export default function DisplayCl1p({ propsName, propsData }: DisplayProps) {
  if (!propsData) return null
  const { text, files, expiry } = propsData

  const cl1pUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${propsName}`

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Copied to clipboard!')
  }

  const getFileEmoji = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    return FileEmoji[extension as keyof typeof FileEmoji] || FileEmoji.default
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* QR Code and Copy Link Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 flex items-center justify-center">
          <QRCodeSVG value={cl1pUrl} size={200} />
        </div>
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium mb-2">📎 {propsName}</h2>
            <p className="text-sm text-gray-500">
              Expires {new Date(expiry).toLocaleDateString()}
            </p>
          </div>
          <Button 
            onClick={() => copyToClipboard(cl1pUrl)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>

      {/* Files Grid */}
      {files && files.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {files.map((file: string, index: number) => {
            const fileName = file.split('/').pop()?.split('?')[0]
            return (
              <a
                key={index}
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-50 rounded-2xl p-4 aspect-[4/3] flex flex-col"
              >
                <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                  <span className="text-4xl">{getFileEmoji(fileName || "")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-medium truncate">{fileName}</p>
                    <p className="text-xs text-gray-500">Click to download</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            )
          })}
        </div>
      )}

      {/* Text Content */}
      {text && (
        <div className="bg-white rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h1></h1>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={() => copyToClipboard(text)}
              className="text-lg bg-gray-100 hover:bg-gray-200"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy text
            </Button>
          </div>
          <div className="bg-gray-50 rounded-xl bg-gray-100  p-4 font-mono text-sm">
            <p className="whitespace-pre-wrap min-h-[10rem] max-h-[20rem] text-lg overflow-y-scroll">{text}</p>
          </div>
        </div>
      )}
      <div className='my-30'></div>
    </div>
  )
}

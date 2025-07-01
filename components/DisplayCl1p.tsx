'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Copy, FileText } from 'lucide-react'
import { DisplayProps } from '@/types/types'
import toast from 'react-hot-toast'
import { FilePreviewDisplay } from './FilePreviewDisplay'

export default function DisplayCl1p({ propsName, propsData }: DisplayProps) {
  if (!propsData) return null
  const { text, files, expiry } = propsData

  const cl1pUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${propsName}`

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Copied to clipboard!')
  }

  const formatExpiryDate = (expiryDate: string) => {
    const date = new Date(expiryDate)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-4">
      {/* QR Code Section */}
      <div className="flex justify-center">
        <div className="card-minimal p-6 text-center space-y-4 max-w-sm">
          {/* Expiry Date */}
          {expiry && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expires: {formatExpiryDate(expiry)}
              </p>
            </div>
          )}
          
          {/* QR Code */}
          <div className="flex justify-center">
            <QRCodeSVG 
              value={cl1pUrl} 
              size={240} 
            />
          </div>
          
          {/* Copy Link */}
          <Button
            onClick={() => copyToClipboard(cl1pUrl)}
            className="w-full btn-minimal"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>

      {/* Files Section */}
      {files && files.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-bold mb-2">
              Files ({files.length})
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Click on any file to view or download
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {files.map((file, index) => (
              <FilePreviewDisplay
                key={`${file.url}-${index}`}
                url={file.url}
                fileName={file.fileName}
                mimeType={file.mimeType}
                size={file.size}
              />
            ))}
          </div>
        </div>
      )}

      {/* Text Content Section */}
      {text && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg md:text-2xl font-bold mb-2">
              Text Content
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Copy the text below
            </p>
          </div>
          
          <div className="card-minimal p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">
                    Content
                  </span>
                </div>
                <Button
                  onClick={() => copyToClipboard(text)}
                  size="sm"
                  className="btn-minimal"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </Button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded border p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {text}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

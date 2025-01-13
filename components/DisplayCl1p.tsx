'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react'
import { DisplayProps } from '@/types/types'
import toast from 'react-hot-toast'
import { FilePreviewDisplay } from './FilePreviewDisplay'


export default function DisplayCl1p({ propsName, propsData }: DisplayProps) {
  if (!propsData) return null
  const { text, files } = propsData

  const cl1pUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${propsName}`

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success('Copied to clipboard!')
  }


  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* QR Code and Copy Link Section */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-6 items-center justify-center">
          <QRCodeSVG value={cl1pUrl} size={200} />
          <Button
            onClick={() => copyToClipboard(cl1pUrl)}
            className="w-[200px] bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
        </div>
      </div>

      {/* Files Grid */}
      {files && files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((file: string, index: number) => {
            const fileName = file.split('/').pop()?.split('?')[0]
            return (
               <FilePreviewDisplay
                key={`${file}-${index}`}
                url={file}
                fileName={fileName}
                contentType={fileName.split('.').pop()?.toLowerCase()}
               />
            )
          })}
        </div>
      )}

      {/* Text Content */}
      {text && (
        <div className=" rounded-2xl">
          <div className="flex bg-gray-100 items-center justify-between mb-4">
            <h1></h1>

          </div>
          <div className="bg-gray-100 rounded-xl p-4 font-mono text-sm">
            <p className="p-1 whitespace-pre-wrap min-h-[10rem] max-h-[20rem] text-lg overflow-y-scroll">{text}</p>
          </div>
        </div>
      )}
      <Button
        variant="ghost"
        size="lg"
        onClick={() => copyToClipboard(text)}
        className="text-lg w-full bg-black text-white"
      >
        <Copy className="h-3 w-3 mr-1" />
        Copy text
      </Button>
      <div className='my-30'></div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface Cl1pData {
  text: string
  files: string[]
}

export default function Cl1pPage() {
  const { name } = useParams()
  const [cl1pData, setCl1pData] = useState<Cl1pData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCl1pData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cl1p/search`, { name })
        if (response.data.status === 'success') {
          setCl1pData(response.data.data)
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'An error occurred')
        } else {
          setError('An unexpected error occurred')
        }
      }
    }

    fetchCl1pData()
  }, [name])

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!cl1pData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cl1p: {name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Text Content:</h3>
              <p className="whitespace-pre-wrap">{cl1pData.text}</p>
            </div>
            {cl1pData.files.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Files:</h3>
                <ul className="list-disc list-inside">
                  {cl1pData.files.map((file, index) => (
                    <li key={index}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


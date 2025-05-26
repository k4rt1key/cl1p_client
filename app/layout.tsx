import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cl1p - Search & Create',
  description: 'Search for existing cl1ps or create new ones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8375899957851400" crossOrigin="anonymous">
       </script>
      </head>
      <body className={inter.className}>
        <div className='bg-background/30 backdrop-blur-md blur-container h-10 fixed top-0 left-0 right-0'></div>
        <Navbar/>
        <div className='mt-20'></div>
        <div className='pt-8 px-4 sm:px-6'>
          {children}
        </div>
        <Toaster />
        <div className='mt-20'></div>
      </body>
    </html>
  )
}


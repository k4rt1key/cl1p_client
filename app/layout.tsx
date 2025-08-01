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
    <html lang="en" className="min-h-full h-full">
      <head>
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8375899957851400" crossOrigin="anonymous">
       </script>
       <script async src="https://www.googletagmanager.com/gtag/js?id=G-VDTZ5VWS7B"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VDTZ5VWS7B');
          `,
        }}
      />
      </head>
      <body className={inter.className + ' min-h-full h-full flex flex-col'}>
        <div className='blur-container h-10 fixed top-0 left-0 right-0'></div>
        {/* Flex row for sidebar and main content */}
        <div className="flex flex-1 min-h-screen">
          <Navbar />
          <main className="flex-1 px-4 py-4 w-full">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}


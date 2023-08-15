import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SessionProvider from './SessionProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tokopedia',
  description: 'Selalu ada, selalu bisa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`relative${inter.className}`}>
        <SessionProvider>
          <div className='sticky top-0 z-40'><Navbar></Navbar></div>
          <main className='px-5  max-w-7xl m-auto min-w-[300px]'>
            {children}
          </main>
          <Footer></Footer>
        </SessionProvider>
      </body>
    </html>
  )
}

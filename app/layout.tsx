import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

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
      <body className={inter.className}>
        <Navbar></Navbar>
        <main className='p-5  max-w-7xl m-auto min-w-[300px]'>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  )
}

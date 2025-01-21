import './globals.css';
import type { Metadata } from 'next'
import { FooterComponent } from '@/components/footer'
import { UserProvider } from '../components/userContext'
import SectionHeader from './sections/headerSection';
import { ThirdwebProvider } from 'thirdweb/react';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


export const metadata: Metadata = {
  title: 'ArbiLearn',
  description: 'The ArbiLearn World of Opportunities!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col"> 
        <Analytics />
        <SpeedInsights />
        <UserProvider>
          <ThirdwebProvider>
              <SectionHeader />            
              <main className="flex-grow">
              {children}
            </main>
            <FooterComponent />
          </ThirdwebProvider>
        </UserProvider>
      </body>
    </html>
  )
}
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
// import Header from '@/mycomponents/newheader'
import { FooterComponent } from '@/components/footer'
import { HeaderComponent } from '@/components/header'

import { cookieToInitialState } from 'wagmi'

import { config } from '../../config'
import Web3ModalProvider from '../../context';

export const metadata: Metadata = {
  title: 'ArbiLearn',
  description: 'The ArbiLearn World of Opportunities!'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
          <HeaderComponent />
          <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
          <FooterComponent />
      </body>
    </html>
  )
}
import type { Metadata, Viewport } from 'next'
import {
  Hubot_Sans,
  Instrument_Sans,
} from 'next/font/google'
import LocalFont from 'next/font/local'

import './globals.css'

import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/lib/site-config'

const overusedGrotesk = LocalFont({
  src: '../public/fonts/OverusedGrotesk-VF.woff2',
  variable: '--font-sans',
})

const hubotSans = Hubot_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-dashboard',
})


export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.siteDescription,
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  metadataBase: new URL(siteConfig.siteUrl),
  robots: 'index, follow',
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
  },
}

export const viewport: Viewport = {
  themeColor: siteConfig.primaryColor,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${overusedGrotesk.variable} ${hubotSans.variable} ${instrumentSans.variable}  font-sans antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
      </html> 
  )
}
import React from 'react'
import '../styles.css'
import { ThemeProvider } from '../components/ThemeProvider'
import BodegaBeamQueryClientProvider from '../components/QueryClientProvider'
import { Viewport } from 'next'
import { ViewTransitions } from 'next-view-transitions'
import { BackgroundChangingNeat } from '../components/NeatBackground'

export const metadata = {
  title: 'Bodega Beam • Your files, delivered.',
        description: 'Beam your files anywhere on the planet, securely..',
  charSet: 'utf-8',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    url: 'https://www.srswti.com/bodega',
    title: 'Bodega Beam • Your files, delivered.',
    description: 'Beam your files anywhere on the planet, securely..',
    images: [{ url: '/logo.png' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body>
          <BackgroundChangingNeat  />
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <BodegaBeamQueryClientProvider>
              <main>{children}</main>
            </BodegaBeamQueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}

import type { Metadata } from 'next'
import { cn } from '@/lib/utils'

import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import OnchainProvider from '@/providers/onchainProvider'
import { Toaster } from '@/components/ui/sonner'
import PageWithAppbar from '@/components/layout/pageWithAppbar'

export const metadata: Metadata = {
  title: 'Frutero Club',
  description: 'La comunidad de Builders que crea Founders',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={cn('bg-secondary font-sans antialiased', fontSans.variable)}
      >
        <OnchainProvider>
          <PageWithAppbar>{children}</PageWithAppbar>
          <Toaster richColors />
        </OnchainProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'UniversalPlayer - Stream Any Video',
  description: 'A universal video player built with React and Shaka Player that supports MP4, HLS, DASH and more.',
  keywords: ['video player', 'streaming', 'HLS', 'DASH', 'MP4', 'Shaka Player'],
  authors: [{ name: 'UniversalPlayer Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'UniversalPlayer - Stream Any Video',
    description: 'A universal video player that supports all major video formats and streaming protocols.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UniversalPlayer - Stream Any Video',
    description: 'A universal video player that supports all major video formats and streaming protocols.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen bg-netflix-black text-white">
        {children}
      </body>
    </html>
  )
}

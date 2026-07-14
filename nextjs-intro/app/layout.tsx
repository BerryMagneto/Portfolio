import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Darnell Jackson',
  description: 'Front-End Developer based in Brooklyn, NY',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-xl">DJ</span>
          <div className="flex gap-8">
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
            <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</a>
            <a href="/projects" className="text-gray-400 hover:text-white text-sm transition-colors">Projects</a>
            <a href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
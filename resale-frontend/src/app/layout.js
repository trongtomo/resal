import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'

export const metadata = {
  title: 'Resale Frontend',
  description: 'A clean client commerce storefront',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}

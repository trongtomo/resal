import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LoadingBar from '@/components/LoadingBar'
import ScrollToTop from '@/components/ScrollToTop'
import { AuthProvider } from '@/contexts/AuthContext'
import { CartProvider } from '@/contexts/CartContext'
import '@/lib/loadingBar'; // Initialize loading bar
import '@/styles/nprogress.css'
import './globals.css'

export const metadata = {
  title: 'Resale Frontend',
  description: 'A clean client commerce storefront',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <LoadingBar />
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

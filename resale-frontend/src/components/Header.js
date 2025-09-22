'use client'

import { getCategoryProducts } from '@/services/categoryProducts'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CategoryDropdown from './CategoryDropdown'

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryProducts({ populate: 'category_product' })
        // Filter to get only parent categories (those without a parent category_product) and published
        const parentCategories = data.data?.filter(category => 
          category.publishedAt && !category.category_product
        ) || []
        setCategories(parentCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName)
  }

  const handleDropdownClose = () => {
    setActiveDropdown(null)
  }
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Resale
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </Link>
            {loading ? (
              <div className="text-gray-500 px-3 py-2 text-sm">Loading...</div>
            ) : (
              categories.map((category) => (
                <CategoryDropdown 
                  key={category.slug}
                  category={category.slug} 
                  label={category.name} 
                  isActive={activeDropdown === category.slug}
                  onToggle={() => handleDropdownToggle(category.slug)}
                  onClose={handleDropdownClose}
                />
              ))
            )}
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/tags" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Tags
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" suppressHydrationWarning>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

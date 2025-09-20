'use client'

import { getCategoriesWithTags } from '@/services/dropdown'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [categoriesData, setCategoriesData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        console.log('Starting to fetch dropdown data...')
        
        const data = await getCategoriesWithTags()
        
        console.log('Categories with tags:', data)
        
        setCategoriesData(data.data || {})
      } catch (error) {
        console.error('Error fetching dropdown data:', error)
        console.error('Error details:', error.message)
        console.error('Error stack:', error.stack)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="relative">
        <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
          Products
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
      >
        Products
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
                  <div className="py-2">
                    {Object.keys(categoriesData).length > 0 ? (
                      <>
                        {Object.entries(categoriesData).map(([categorySlug, categoryData]) => {
                          const hasTags = categoryData.tags && categoryData.tags.length > 0

                          return (
                            <div key={categorySlug} className="relative group">
                              {hasTags ? (
                                // Category with tags - show arrow and submenu
                                <>
                                  <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                    <span>{categoryData.name}</span>
                                    <svg
                                      className="h-4 w-4 text-gray-400"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                  
                                  {/* Tags Submenu */}
                                  <div className="absolute left-full top-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="py-2">
                                      {categoryData.tags.map((tag) => (
                                        <Link
                                          key={tag.slug}
                                          href={`/products?category=${categorySlug}&tag=${tag.slug}`}
                                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {tag.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                // Category without tags - direct link
                                <Link
                                  href={`/products?category=${categorySlug}`}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {categoryData.name}
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </>
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No categories available
                      </div>
                    )}
                  </div>
        </div>
      )}
    </div>
  )
}

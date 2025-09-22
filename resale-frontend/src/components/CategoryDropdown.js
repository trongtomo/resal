'use client'

import { getCategoryProducts } from '@/services/categoryProducts'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CategoryDropdown({ category, label, isActive, onToggle, onClose }) {
  const [subcategories, setSubcategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const categoryProductsData = await getCategoryProducts({ populate: 'category_product' })

        // Find the main category
        const mainCategory = categoryProductsData.data?.find(cat => cat.slug === category)
        if (!mainCategory) {
          setLoading(false)
          return
        }

        // Get subcategories (children of this category)
        // Find categories that have category_product pointing to this category
        const subcats = categoryProductsData.data?.filter(cat => 
          cat.category_product && cat.category_product.id === mainCategory.id
        ) || []
        setSubcategories(subcats)
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  if (loading) {
    return (
      <div className="relative">
        <button className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
          {label}
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onMouseEnter={onToggle}
        onClick={onToggle}
        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
      >
        {label}
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isActive && (
        <div 
          className="absolute left-0 z-50 mt-1 w-48 origin-top-left rounded-lg bg-white shadow-lg border border-gray-200"
          onMouseLeave={onClose}
        >
          <div className="py-2">
            {subcategories.length > 0 ? (
              <div className="grid grid-cols-1">
                {subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/products?category=${subcategory.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            ) : (
              // No subcategories - show main category as direct link
              <Link
                href={`/products?category=${category}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                All {label}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
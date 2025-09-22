'use client'

import { getCategoryProducts } from '@/services/categoryProducts'
import { getProducts } from '@/services/products'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function CategoryDropdown({ category, label, isActive, onToggle, onClose }) {
  const [subcategories, setSubcategories] = useState([])
  const [categoryTags, setCategoryTags] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const [categoryProductsData, productsData] = await Promise.all([
          getCategoryProducts({ populate: 'parent' }),
          getProducts(1, 100, { populate: '*' })
        ])

        // Find the main category
        const mainCategory = categoryProductsData.data?.find(cat => cat.slug === category)
        if (!mainCategory) return

        // Get subcategories (children of this category)
        const subcats = mainCategory.parent || []
        setSubcategories(subcats)

        // Group tags by subcategory
        const tagsByCategory = {}
        productsData.data?.forEach(product => {
          if (product.category_products && product.category_products.length > 0) {
            product.category_products.forEach(cat => {
              if (!tagsByCategory[cat.slug]) {
                tagsByCategory[cat.slug] = new Set()
              }
              
              if (product.tags && product.tags.length > 0) {
                product.tags.forEach(tag => {
                  tagsByCategory[cat.slug].add(tag)
                })
              }
            })
          }
        })

        // Convert Sets to Arrays
        const categoryTagsArray = {}
        Object.keys(tagsByCategory).forEach(categorySlug => {
          categoryTagsArray[categorySlug] = Array.from(tagsByCategory[categorySlug])
        })

        setCategoryTags(categoryTagsArray)
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
        setActiveSubmenu(null)
      }
    }

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isActive, onClose])

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
    <div className="relative" ref={dropdownRef}>
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
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-80">
          <div className="py-2">
            {subcategories.length > 0 ? (
              <div className="grid grid-cols-2 gap-0">
                {/* Left column - Categories */}
                <div className="border-r border-gray-200">
                  {subcategories.map((subcategory) => {
                    const hasTags = categoryTags[subcategory.slug] && categoryTags[subcategory.slug].length > 0
                    
                    return (
                      <div key={subcategory.slug}>
                        {hasTags ? (
                          <div
                            className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                              activeSubmenu === subcategory.slug 
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            onMouseEnter={() => setActiveSubmenu(subcategory.slug)}
                            onClick={() => setActiveSubmenu(activeSubmenu === subcategory.slug ? null : subcategory.slug)}
                          >
                            <div className="flex items-center justify-between">
                              <span>{subcategory.name}</span>
                              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <Link
                            href={`/products?category=${subcategory.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={onClose}
                          >
                            {subcategory.name}
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Right column - Tags */}
                <div className="px-2">
                  {activeSubmenu && categoryTags[activeSubmenu] && categoryTags[activeSubmenu].length > 0 && (
                    <div>
                      <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {subcategories.find(s => s.slug === activeSubmenu)?.name} Tags
                      </div>
                      <div className="space-y-1">
                        {categoryTags[activeSubmenu].map((tag) => (
                          <Link
                            key={tag.slug}
                            href={`/products?category=${activeSubmenu}&tag=${tag.slug}`}
                            className="block px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            onClick={onClose}
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!activeSubmenu && (
                    <div className="px-2 py-8 text-center text-gray-400 text-sm">
                      
                    </div>
                  )}
                </div>
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

'use client'

import Link from 'next/link'
import { useState } from 'react'
import CategoryDropdown from './CategoryDropdown'

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null)

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
            <CategoryDropdown 
              category="clothing" 
              label="Clothing" 
              isActive={activeDropdown === 'clothing'}
              onToggle={() => handleDropdownToggle('clothing')}
              onClose={handleDropdownClose}
            />
            <CategoryDropdown 
              category="food" 
              label="Food" 
              isActive={activeDropdown === 'food'}
              onToggle={() => handleDropdownToggle('food')}
              onClose={handleDropdownClose}
            />
            <CategoryDropdown 
              category="beauty" 
              label="Beauty" 
              isActive={activeDropdown === 'beauty'}
              onToggle={() => handleDropdownToggle('beauty')}
              onClose={handleDropdownClose}
            />
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
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

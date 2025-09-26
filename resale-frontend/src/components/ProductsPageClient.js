'use client'

import { api } from '@/lib/simple-api'
import { getContextText, getPageTitle } from '@/utils/contextText'
import { formatCurrency, truncateText } from '@/utils/format'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddToCartButton from './AddToCartButton'
import Breadcrumb from './Breadcrumb'
import Pagination from './Pagination'
import ProductFilters from './ProductFilters'

export default function ProductsPageClient({ initialProducts = [], initialPagination = { page: 1, pageCount: 1, total: 0 }, initialCategory = null }) {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(initialProducts)
  const [pagination, setPagination] = useState(initialPagination)
  const [category, setCategory] = useState(initialCategory)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    priceRange: 'all',
    sortBy: 'newest',
    selectedBrand: null
  })

  // Fetch category data and products when URL changes
  useEffect(() => {
    const fetchData = async () => {
      const categorySlug = searchParams.get('category')
      setLoading(true)
      
      try {
        // Fetch category data
        if (categorySlug) {
          const categoriesData = await api.getAllCategories()
          const foundCategory = categoriesData.categories?.find(cat => cat.slug === categorySlug)
          setCategory(foundCategory)
          
          // Fetch products for this category
          const productsData = await api.getProductsByCategory(categorySlug)
          setProducts(productsData.products || [])
          setPagination({ page: 1, pageCount: 1, total: productsData.products?.length || 0 })
        } else {
          // No category - show all products
          setCategory(null)
          const productsData = await api.getAllProducts()
          setProducts(productsData.products || [])
          setPagination({ page: 1, pageCount: 1, total: productsData.products?.length || 0 })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [searchParams])

  // Handle filter changes
  const handleFiltersChange = async (newFilters) => {
    setFilters(newFilters)
    setLoading(true)

    try {
      const queryParams = new URLSearchParams()
      const categorySlug = searchParams.get('category')
      
      if (categorySlug) queryParams.set('category', categorySlug)
      
      // Add filter parameters
      if (newFilters.priceMin) queryParams.set('priceMin', newFilters.priceMin)
      if (newFilters.priceMax) queryParams.set('priceMax', newFilters.priceMax)
      if (newFilters.priceRange !== 'all') queryParams.set('priceRange', newFilters.priceRange)
      if (newFilters.sortBy !== 'newest') queryParams.set('sortBy', newFilters.sortBy)
      if (newFilters.selectedBrand) queryParams.set('brand', newFilters.selectedBrand)

      // Update URL
      const newUrl = `/products?${queryParams.toString()}`
      window.history.pushState({}, '', newUrl)

      // Fetch filtered products using simple API
      let data
      if (categorySlug) {
        data = await api.getProductsByCategory(categorySlug)
      } else {
        data = await api.getAllProducts()
      }
      
      setProducts(data.products || [])
      setPagination({ page: 1, pageCount: 1, total: data.products?.length || 0 })
    } catch (error) {
      console.error('Error fetching filtered products:', error)
    } finally {
      setLoading(false)
    }
  }

  const pageTitle = getPageTitle(category)
  const contextText = getContextText(category?.slug)

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb category={category} />
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageTitle}</h1>
            <p className="text-lg text-gray-600">{contextText}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters 
              onFiltersChange={handleFiltersChange}
              currentFilters={filters}
              products={products}
              categorySlug={category?.slug}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    Showing {products.length} of {pagination.total} products
                  </p>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.documentId} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <Link href={`/products/${product.slug}`}>
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                              {truncateText(product.shortDescription || product.description, 100)}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xl font-bold text-gray-900">
                                {formatCurrency(product.price)}
                              </span>
                              {product.discountPrice && (
                                <span className="text-sm text-red-600 line-through">
                                  {formatCurrency(product.discountPrice)}
                                </span>
                              )}
                            </div>
                            <AddToCartButton product={product} className="w-full" />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No products found matching your filters.</p>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pageCount > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.pageCount}
                      baseUrl="/products"
                      searchParams={searchParams}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

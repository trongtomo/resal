import MarkdownRenderer from '@/components/MarkdownRenderer'
import Pagination from '@/components/Pagination'
import { getProducts } from '@/services/products'
import { formatCurrency, truncateText } from '@/utils/format'
import Link from 'next/link'

// Allow caching for better performance

export const metadata = {
  title: 'Products',
  description: 'Browse our collection of premium products',
}

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams?.page || '1')
  const pageSize = 12
  const category = resolvedSearchParams?.category
  const tag = resolvedSearchParams?.tag

  let products = []
  let pagination = { page: 1, pageCount: 1, total: 0 }
  let error = null

  try {
    const filters = {}
    if (category) filters.category = category
    if (tag) filters.tag = tag

    const data = await getProducts(page, pageSize, filters)
    products = data.data || []
    pagination = data.meta?.pagination || { page: 1, pageCount: 1, total: 0 }
  } catch (err) {
    error = err.message
    console.error('Failed to fetch products:', err)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Products</h1>
            <p className="text-lg text-gray-600">Discover our premium collection</p>
            
            {/* Active Filters */}
            {(category || tag) && (
              <div className="mt-4 flex justify-center items-center space-x-2">
                <span className="text-sm text-gray-600">Filtered by:</span>
                {category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Category: {category}
                  </span>
                )}
                {tag && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Tag: {tag}
                  </span>
                )}
                <Link
                  href="/products"
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">Error loading products: {error}</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <p className="text-gray-600">
                Showing {products.length} of {pagination.total} product{pagination.total !== 1 ? 's' : ''}
              </p>
            </div>
            
            {products.length > 0 ? (
              <>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <div className="text-gray-400 text-center">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p className="text-sm">No image</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="text-gray-600 text-sm mb-3">
                          {product.shortDescription ? (
                            <p>{truncateText(product.shortDescription, 80)}</p>
                          ) : product.description ? (
                            <div className="prose prose-sm max-w-none">
                              <MarkdownRenderer 
                                content={truncateText(product.description.replace(/[#*]/g, ''), 80)} 
                              />
                            </div>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-gray-900">
                              {formatCurrency(product.price)}
                            </span>
                            {product.discount_price && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatCurrency(product.discount_price)}
                              </span>
                            )}
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            product.product_status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.product_status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">    
                          <p>Stock: {product.stock_quantity}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pageCount}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

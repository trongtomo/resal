import { fetchFromApi } from '@/lib/api'

export async function getProducts(page = 1, pageSize = 12, filters = {}) {
  try {
    const query = {
      pagination: { page, pageSize }
    }

    // Optimized populate - only get what we need
    if (filters.lightweight) {
      // For dropdown: only get basic info
      query.populate = {
        category_products: { fields: ['name', 'slug'] }
      }
    } else if (filters.populate) {
      // Custom populate
      if (filters.populate === '*') {
        query.populate = '*'
      } else {
        query.populate = filters.populate
      }
    } else {
      // Default: get what's needed for product display
      query.populate = {
        image: true,
        category_products: { fields: ['name', 'slug'] },
        brand: { fields: ['name', 'slug'] }
      }
    }

    // Add category filter
    if (filters.category) {
      // For now, handle the specific case where "shoes" should include "running" and "sneaker"
      if (filters.category === 'shoes') {
        query.filters = {
          ...query.filters,
          category_products: { 
            slug: { $in: ['running', 'sneaker'] }
          }
        }
      } else {
        // This is a regular category - filter by exact match
        query.filters = {
          ...query.filters,
          category_products: { slug: { $eq: filters.category } }
        }
      }
    }

    // Tag filter removed - tags relation no longer exists

    // Add brand filter
    if (filters.selectedBrand) {
      query.filters = {
        ...query.filters,
        brand: { id: { $eq: filters.selectedBrand } }
      }
    }

    // Add price filters
    if (filters.priceMin || filters.priceMax) {
      const priceFilter = {}
      if (filters.priceMin) priceFilter.$gte = parseInt(filters.priceMin)
      if (filters.priceMax) priceFilter.$lte = parseInt(filters.priceMax)
      
      query.filters = {
        ...query.filters,
        price: priceFilter
      }
    }

    // Add price range filters
    if (filters.priceRange && filters.priceRange !== 'all') {
      let priceFilter = {}
      switch (filters.priceRange) {
        case 'under-50':
          priceFilter = { $lt: 5000000 }
          break
        case '50-100':
          priceFilter = { $gte: 5000000, $lte: 10000000 }
          break
        case '100-200':
          priceFilter = { $gte: 10000000, $lte: 20000000 }
          break
        case 'above-200':
          priceFilter = { $gt: 20000000 }
          break
      }
      
      if (Object.keys(priceFilter).length > 0) {
        query.filters = {
          ...query.filters,
          price: priceFilter
        }
      }
    }

    // Add sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          query.sort = ['price:asc']
          break
        case 'price-desc':
          query.sort = ['price:desc']
          break
        case 'newest':
        default:
          query.sort = ['createdAt:desc']
          break
      }
    }

    // Debug: Log the query being sent
    console.log('Products query:', JSON.stringify(query, null, 2))
    
    // Cache strategy: 30 minutes for product listings, unless noCache is specified
    const data = await fetchFromApi('/api/products', { 
      query,
      cache: filters.noCache ? 'no-store' : 'force-cache',
      revalidate: filters.noCache ? 0 : 1800, // 30 minutes
      headers: filters.noCache ? { 'Cache-Control': 'no-cache' } : {}
    })
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProductBySlug(slug) {
  try {
    const data = await fetchFromApi('/api/products', {
      query: {
        filters: { slug: { $eq: slug } }
      },
      revalidate: 3600 // 1 hour for individual products
    })
    return data
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    throw error
  }
}

// getProductsByTag function removed - tags relation no longer exists

export async function getFeaturedProducts(limit = 6) {
  try {
    const data = await fetchFromApi('/api/products', {
      query: {
        pagination: { page: 1, pageSize: limit }
      },
      revalidate: 1800 // 30 minutes for featured products
    })
    return data
  } catch (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }
}

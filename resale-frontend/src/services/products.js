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
        tags: { fields: ['name', 'slug'] },
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
        tags: { fields: ['name', 'slug'] },
        category_products: { fields: ['name', 'slug'] }
      }
    }

    // Add category filter
    if (filters.category) {
      query.filters = {
        ...query.filters,
        category_products: { slug: { $eq: filters.category } }
      }
    }

    // Add tag filter
    if (filters.tag) {
      query.filters = {
        ...query.filters,
        tags: { slug: { $eq: filters.tag } }
      }
    }

    const data = await fetchFromApi('/api/products', { query })
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
      }
    })
    return data
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    throw error
  }
}

export async function getProductsByTag(tagSlug, page = 1, pageSize = 12) {
  try {
    const data = await fetchFromApi('/api/products', {
      query: {
        filters: { tags: { slug: { $eq: tagSlug } } },
        pagination: { page, pageSize }
      }
    })
    return data
  } catch (error) {
    console.error('Error fetching products by tag:', error)
    throw error
  }
}

export async function getFeaturedProducts(limit = 6) {
  try {
    const data = await fetchFromApi('/api/products', {
      query: {
        pagination: { page: 1, pageSize: limit }
      }
    })
    return data
  } catch (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }
}

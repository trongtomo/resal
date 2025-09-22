import { fetchFromApi } from '@/lib/api'

// Get categories with their associated tags (lightweight)
export async function getCategoriesWithTags() {
  try {
    const data = await fetchFromApi('/api/category-products', {
      query: {
        populate: {
          tag_products: true // This should be set up in Strapi
        }
      }
    })
    return data
  } catch (error) {
    console.error('Error fetching categories with tags:', error)
    throw error
  }
}

// Get just categories (for direct links)
export async function getCategoryProducts(options = {}) {
  try {
    const query = {}
    
    if (options.populate) {
      query.populate = options.populate
    }
    
    const data = await fetchFromApi('/api/category-products', {
      query,
      revalidate: 3600 // 1 hour for categories (rarely change)
    })
    return data
  } catch (error) {
    console.error('Error fetching product categories:', error)
    throw error
  }
}
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
      // Handle Strapi v4 populate syntax
      if (options.populate.includes(',')) {
        const relations = options.populate.split(',')
        relations.forEach(relation => {
          query[`populate[${relation}]`] = true
        })
      } else {
        query[`populate[${options.populate}]`] = true
      }
    }
    
    const data = await fetchFromApi('/api/category-products', {
      query,
      revalidate: 60 // 1 minute cache - good balance
    })
    return data
  } catch (error) {
    console.error('Error fetching product categories:', error)
    throw error
  }
}
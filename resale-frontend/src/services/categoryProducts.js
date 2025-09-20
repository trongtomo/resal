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
export async function getCategoryProducts() {
  try {
    const data = await fetchFromApi('/api/category-products')
    return data
  } catch (error) {
    console.error('Error fetching product categories:', error)
    throw error
  }
}
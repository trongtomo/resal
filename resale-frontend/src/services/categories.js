import { fetchFromApi } from '@/lib/api'

export async function getCategories() {
  try {
    const data = await fetchFromApi('/api/categories')
    return data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

export async function getCategoriesWithTags() {
  try {
    const data = await fetchFromApi('/api/categories', {
      query: {
        populate: {
          tag_products: true
        }
      }
    })
    return data
  } catch (error) {
    console.error('Error fetching categories with tags:', error)
    throw error
  }
}

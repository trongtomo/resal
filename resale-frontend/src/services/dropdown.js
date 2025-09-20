import { fetchFromApi } from '@/lib/api'

// Get categories with their associated tags (optimized endpoint)
export async function getCategoriesWithTags() {
  try {
    const data = await fetchFromApi('/api/dropdown/categories-with-tags')
    return data
  } catch (error) {
    console.error('Error fetching categories with tags:', error)
    throw error
  }
}

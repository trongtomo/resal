import { fetchFromApi } from '@/lib/api'

// Get categories with their associated tags (optimized endpoint)
export async function getCategoriesWithTags() {
  try {
    const data = await fetchFromApi('/api/dropdown/categories-with-tags', {
      revalidate: 1800 // 30 minutes for dropdown data
    })
    return data
  } catch (error) {
    console.error('Error fetching categories with tags:', error)
    throw error
  }
}

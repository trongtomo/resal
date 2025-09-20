import { fetchFromApi } from '@/lib/api'

export async function getTags() {
  try {
    const data = await fetchFromApi('/api/tag-articles', {
      revalidate: 3600 // 1 hour for tags (rarely change)
    })
    return data
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}

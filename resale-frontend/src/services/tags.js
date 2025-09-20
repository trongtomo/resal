import { fetchFromApi } from '@/lib/api'

export async function getTags() {
  try {
    const data = await fetchFromApi('/api/tags')
    return data
  } catch (error) {
    console.error('Error fetching tags:', error)
    throw error
  }
}

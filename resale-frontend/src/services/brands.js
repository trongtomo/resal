import { fetchFromApi } from '@/lib/api'

// Cache for brands
let brandsCache = null
let brandsCacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getBrands(categorySlug = null) {
  // Check if cache is still valid
  if (brandsCache && Date.now() - brandsCacheTime < CACHE_DURATION) {
    return brandsCache
  }

  try {
    const query = {}
    
    // If category is specified, filter brands by category
    if (categorySlug) {
      query.filters = {
        categories: { slug: { $eq: categorySlug } }
      }
    }
    
    const data = await fetchFromApi('/api/brands', {
      query,
      cache: 'no-store' // Always fetch fresh data
    })
    
    // Update cache
    brandsCache = data
    brandsCacheTime = Date.now()
    
    return data
  } catch (error) {
    console.error('Error fetching brands:', error)
    // Return cached data if available, even if expired
    return brandsCache || { data: [] }
  }
}

// Get brands for display (just the data array)
export async function getBrandsForDisplay(categorySlug = null) {
  const response = await getBrands(categorySlug)
  return response.data || []
}

import { fetchFromApi } from '@/lib/api'

export async function getArticles(page = 1, pageSize = 9) {
  try {
    const data = await fetchFromApi(`/api/articles?pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
    return data
  } catch (error) {
    console.error('Error fetching articles:', error)
    throw error
  }
}

export async function getArticleBySlug(slug) {
  try {
    const data = await fetchFromApi(`/api/articles?filters[slug][$eq]=${slug}`)
    return data
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    throw error
  }
}

export async function getArticlesByTag(tagSlug, page = 1, pageSize = 9) {
  try {
    const data = await fetchFromApi(`/api/tag-articles?filters[slug][$eq]=${tagSlug}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`)
    return data
  } catch (error) {
    console.error('Error fetching articles by tag:', error)
    throw error
  }
}

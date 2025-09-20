import { fetchFromApi } from '@/lib/api'

export async function getArticles(page = 1, pageSize = 9) {
  try {
    const data = await fetchFromApi('/api/articles', {
      query: {
        pagination: { page, pageSize },
        populate: '*'
      },
      revalidate: 1800 // 30 minutes for article listings
    })
    return data
  } catch (error) {
    console.error('Error fetching articles:', error)
    throw error
  }
}

export async function getArticleBySlug(slug) {
  try {
    const data = await fetchFromApi('/api/articles', {
      query: {
        filters: { slug: { $eq: slug } },
        populate: '*'
      },
      revalidate: 3600 // 1 hour for individual articles
    })
    return data
  } catch (error) {
    console.error('Error fetching article by slug:', error)
    throw error
  }
}

export async function getArticlesByTag(tagSlug, page = 1, pageSize = 9) {
  try {
    const data = await fetchFromApi('/api/articles', {
      query: {
        filters: { tag_articles: { slug: { $eq: tagSlug } } },
        pagination: { page, pageSize },
        populate: '*'
      },
      revalidate: 1800 // 30 minutes for tag-based article listings
    })
    return data
  } catch (error) {
    console.error('Error fetching articles by tag:', error)
    throw error
  }
}

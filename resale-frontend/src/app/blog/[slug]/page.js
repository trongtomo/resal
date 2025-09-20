import { getArticleBySlug } from '@/services/articles'
import { formatDate } from '@/utils/format'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  try {
    const data = await getArticleBySlug(params.slug)
    const article = data.data?.[0]
    
    if (!article) {
      return {
        title: 'Article Not Found',
        description: 'The requested article could not be found.'
      }
    }

    return {
      title: article.title,
      description: article.description || 'Read this article on our blog'
    }
  } catch (error) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.'
    }
  }
}

export default async function ArticlePage({ params }) {
  let article = null
  let error = null

  try {
    const data = await getArticleBySlug(params.slug)
    article = data.data?.[0]
    
    if (!article) {
      notFound()
    }
  } catch (err) {
    error = err.message
    console.error('Failed to fetch article:', err)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">Failed to load article: {error}</p>
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{article.description}</p>
            <div className="text-sm text-gray-500">
              <p>Published: {formatDate(article.publishedAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {article.description}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}

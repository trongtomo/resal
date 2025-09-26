/**
 * Simple GraphQL API client for the new simplified schema
 * Clean GraphQL queries stored in separate files
 */

import { GET_BRANDS } from './queries/brands'
import { GET_ALL_CATEGORIES, GET_MAIN_CATEGORIES, GET_SUBCATEGORIES } from './queries/categories'
import { GET_ALL_PRODUCTS, GET_PRODUCT, GET_PRODUCTS_BY_BRAND, GET_PRODUCTS_BY_CATEGORY, GET_PRODUCTS_BY_PARENT_CATEGORY } from './queries/products'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(`${API_BASE_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`)
  }

  const result = await response.json()
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`)
  }

  return result.data
}

// Simple GraphQL API functions
export const api = {
  // Get all main categories (those with children)
  getMainCategories: () => fetchGraphQL(GET_MAIN_CATEGORIES),

  // Get subcategories of a main category
  getSubcategories: (parentSlug) => fetchGraphQL(GET_SUBCATEGORIES, { parentSlug }),

  // Get all categories (for navigation)
  getAllCategories: () => fetchGraphQL(GET_ALL_CATEGORIES),

  // Get products by category
  getProductsByCategory: (categorySlug) => fetchGraphQL(GET_PRODUCTS_BY_CATEGORY, { categorySlug }),

  // Get products by parent category (includes all subcategories)
  getProductsByParentCategory: (parentCategorySlug) => fetchGraphQL(GET_PRODUCTS_BY_PARENT_CATEGORY, { parentCategorySlug }),

  // Get all products
  getAllProducts: () => fetchGraphQL(GET_ALL_PRODUCTS),

  // Get all brands
  getBrands: () => fetchGraphQL(GET_BRANDS),

  // Get products by brand
  getProductsByBrand: (brandSlug) => fetchGraphQL(GET_PRODUCTS_BY_BRAND, { brandSlug }),

  // Get single product
  getProduct: (slug) => fetchGraphQL(GET_PRODUCT, { slug }),
}

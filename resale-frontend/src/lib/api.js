import qs from 'qs'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export function getApiUrl(path, query = {}) {
  const queryString = qs.stringify(query, { 
    encodeValuesOnly: false,
    addQueryPrefix: false
  })
  const url = `${API_BASE_URL}${path}`
  return queryString ? `${url}?${queryString}` : url
}

export async function fetchFromApi(path, options = {}) {
  const { query, ...fetchOptions } = options
  const url = getApiUrl(path, query)
  
  const response = await fetch(url, {
    cache: 'no-store',
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

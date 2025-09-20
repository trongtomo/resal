const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export function getApiUrl(path) {
  return `${API_BASE_URL}${path}`
}

export async function fetchFromApi(path, options = {}) {
  const url = getApiUrl(path)
  
  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

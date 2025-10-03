const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const authApi = {
  // Request magic link for email
  async requestMagicLink(email) {
    console.log('🔗 Requesting magic link for:', email)
    console.log('🌐 API URL:', `${API_BASE_URL}/api/magic-link/send-link`)
    
    const requestBody = { email }
    console.log('📤 Request body:', requestBody)
    
    const response = await fetch(`${API_BASE_URL}/api/magic-link/send-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    console.log('📡 Response status:', response.status)
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      let errorMessage = 'Failed to send magic link'
      let errorData = null
      
      try {
        errorData = await response.json()
        console.error('❌ Magic link error (JSON):', errorData)
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch (e) {
        // If response is not JSON, use the status text
        console.error('❌ Magic link error (non-JSON):', response.statusText)
        console.error('❌ Response text:', await response.text())
        errorMessage = response.statusText || errorMessage
      }
      
      console.error('❌ Final error message:', errorMessage)
      throw new Error(errorMessage)
    }

    const result = await response.json()
    console.log('✅ Magic link response:', result)
    return result
  },

  // Validate magic link token
  async validateMagicLink(token) {
    const response = await fetch(`${API_BASE_URL}/api/magic-link/login?loginToken=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      let errorMessage = 'Invalid magic link'
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // If response is not JSON, use the status text
        errorMessage = response.statusText || errorMessage
      }
      throw new Error(errorMessage)
    }

    return response.json()
  },

  // Get current user with token
  async getCurrentUser(token) {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user data')
    }

    return response.json()
  },

  // Logout (invalidate token on server if needed)
  async logout(token) {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Logout request failed:', error)
      // Continue with client-side logout even if server request fails
    }
  }
}
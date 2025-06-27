import { useEffect, useState } from 'react'
import { getCurrentUser, fetchAuthSession, signOut } from 'aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'

export function useAuthSession() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sessionTimeout, setSessionTimeout] = useState<number | null>(null)

  useEffect(() => {
    // Check initial auth state
    checkAuthState()

    // Listen to auth events
    const hubListenerCancel = Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signedIn':
          setIsAuthenticated(true)
          setupSessionTimeout()
          break
        case 'signedOut':
          setIsAuthenticated(false)
          clearSessionTimeout()
          break
        case 'tokenRefresh':
          setupSessionTimeout()
          break
        case 'tokenRefresh_failure':
          handleSessionExpiry()
          break
      }
    })

    return hubListenerCancel
  }, [])

  const checkAuthState = async () => {
    try {
      await getCurrentUser()
      setIsAuthenticated(true)
      setupSessionTimeout()
    } catch {
      setIsAuthenticated(false)
    }
  }

  const setupSessionTimeout = async () => {
    try {
      const session = await fetchAuthSession()
      const token = session.tokens?.idToken
      
      if (token?.payload?.exp) {
        const expiryTime = token.payload.exp * 1000 // Convert to milliseconds
        const currentTime = Date.now()
        const timeUntilExpiry = expiryTime - currentTime
        
        // Set timeout for 5 minutes before expiry to warn user
        const warningTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0)
        
        if (sessionTimeout) {
          clearTimeout(sessionTimeout)
        }
        
        const timeoutId = setTimeout(() => {
          handleSessionWarning()
        }, warningTime)
        
        setSessionTimeout(timeoutId as any)
      }
    } catch (error) {
      console.error('Error setting up session timeout:', error)
    }
  }

  const clearSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout)
      setSessionTimeout(null)
    }
  }

  const handleSessionWarning = () => {
    // Show warning to user about session expiry
    const shouldExtend = confirm(
      'Your session will expire in 5 minutes. Would you like to extend it?'
    )
    
    if (shouldExtend) {
      // Trigger token refresh by making an authenticated request
      fetchAuthSession({ forceRefresh: true })
    }
  }

  const handleSessionExpiry = async () => {
    try {
      await signOut()
      alert('Your session has expired. Please sign in again.')
    } catch (error) {
      console.error('Error during session expiry handling:', error)
    }
  }

  return {
    isAuthenticated,
    checkAuthState,
  }
} 
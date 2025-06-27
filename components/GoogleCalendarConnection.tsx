'use client'

import { useState } from 'react'

interface GoogleCalendarConnectionProps {
  onConnect?: (connected: boolean) => void
  userId?: string
}

export function GoogleCalendarConnection({ onConnect, userId }: GoogleCalendarConnectionProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      // TODO: Implement actual Google Calendar OAuth connection
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      setIsConnected(true)
      onConnect?.(true)
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    onConnect?.(false)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Google Calendar</h3>
          <p className="text-sm text-gray-500">
            {isConnected ? 'Connected to your Google Calendar' : 'Connect to sync events with Google Calendar'}
          </p>
        </div>
        <div>
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 
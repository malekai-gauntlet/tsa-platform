'use client'

import { LockClosedIcon } from '@heroicons/react/24/outline'

interface LockedRouteProps {
  children?: React.ReactNode
  title?: string
  description?: string
}

export function LockedRoute({ 
  children, 
  title = "Coming Soon",
  description = "This feature is currently in development and will be available soon." 
}: LockedRouteProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
          <LockClosedIcon className="h-8 w-8 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="text-sm text-gray-500">
          Check back soon for updates!
        </div>
      </div>
    </div>
  )
}

// Export for legal page specifically
export function LockedLegal() {
  return (
    <LockedRoute 
      title="Legal Hub Coming Soon"
      description="The Legal Hub will provide comprehensive legal tools including contract management, compliance tracking, and legal document generation. This feature is currently in development."
    />
  )
} 
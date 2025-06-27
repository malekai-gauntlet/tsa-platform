import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import type { ErrorState } from '../types'

interface ErrorMessageProps {
  errorState: ErrorState | null
  onClear: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorState, onClear }) => {
  if (!errorState) return null

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
        <span className="text-red-800 font-medium">
          {errorState.message}
        </span>
      </div>
    </div>
  )
} 
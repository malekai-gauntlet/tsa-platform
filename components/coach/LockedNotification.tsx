import React from 'react'
import { LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface LockedNotificationProps {
  show: boolean
  route: string
  onDismiss: () => void
}

export function LockedNotification({ show, route, onDismiss }: LockedNotificationProps) {
  if (!show) return null

  return (
    <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <LockClosedIcon className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-amber-800">
            Access Restricted
          </h3>
          <div className="mt-2 text-sm text-amber-700">
            <p>
              The section you tried to access (<strong>{route}</strong>) is currently locked. 
              This feature will be available soon as you progress through your school setup.
            </p>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-amber-50 p-1.5 text-amber-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50"
              onClick={onDismiss}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
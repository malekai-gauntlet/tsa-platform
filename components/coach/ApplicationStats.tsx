import React from 'react'
import { DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/20/solid'
import type { ApplicationStats as ApplicationStatsType } from '@/lib/types/coach'

interface ApplicationStatsProps {
  stats: ApplicationStatsType
  loading: boolean
}

export function ApplicationStats({ stats, loading }: ApplicationStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-purple-100">
            <DocumentTextIcon className="h-5 w-5 text-purple-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? '...' : stats.total}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-amber-100">
            <ClockIcon className="h-5 w-5 text-amber-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Pending Review</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? '...' : stats.pending}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-green-100">
            <CheckCircleIcon className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-600">Accepted</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? '...' : stats.accepted}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
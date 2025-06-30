import React from 'react';
import { DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import type { ApplicationStats as ApplicationStatsType } from '@/lib/types/coach';

interface ApplicationStatsProps {
  stats: ApplicationStatsType;
  loading: boolean;
}

export function ApplicationStats({ stats, loading }: ApplicationStatsProps) {
  const navigateToApplications = () => {
    window.location.href = '/coach/applications';
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
      <div className="flex items-center gap-8">
        <button
          onClick={navigateToApplications}
          className="flex items-center gap-3 hover:bg-gray-50 rounded p-2 transition-colors"
        >
          <div className="rounded bg-purple-100 p-1.5">
            <DocumentTextIcon className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <span className="text-sm text-gray-500">Total</span>
            <div className="text-lg font-semibold text-gray-900 hover:text-[#004aad]">{loading ? '...' : stats.total}</div>
          </div>
        </button>

        <button
          onClick={navigateToApplications}
          className="flex items-center gap-3 hover:bg-gray-50 rounded p-2 transition-colors"
        >
          <div className="rounded bg-amber-100 p-1.5">
            <ClockIcon className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <span className="text-sm text-gray-500">Pending</span>
            <div className="text-lg font-semibold text-gray-900 hover:text-[#004aad]">{loading ? '...' : stats.pending}</div>
          </div>
        </button>

        <button
          onClick={navigateToApplications}
          className="flex items-center gap-3 hover:bg-gray-50 rounded p-2 transition-colors"
        >
          <div className="rounded bg-green-100 p-1.5">
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <span className="text-sm text-gray-500">Accepted</span>
            <div className="text-lg font-semibold text-gray-900 hover:text-[#004aad]">{loading ? '...' : stats.accepted}</div>
          </div>
        </button>
      </div>
    </div>
  );
}

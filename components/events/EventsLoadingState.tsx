import React from 'react';

export function EventsLoadingState() {
  return (
    <div className="space-y-6">
      {/* Header loading */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200"></div>
      </div>

      {/* Stats loading */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded bg-gray-200"></div>
        ))}
      </div>

      {/* Filters loading */}
      <div className="h-32 animate-pulse rounded bg-gray-200"></div>

      {/* Events grid loading */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded bg-gray-200"></div>
        ))}
      </div>
    </div>
  );
}

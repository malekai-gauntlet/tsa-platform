'use client';

import { Suspense } from 'react';
import EventView from './page.refactored';

/**
 * Loading state component for event
 */
function EventLoader() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200"></div>

      <div className="h-32 animate-pulse rounded-lg bg-gray-200"></div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
        ))}
      </div>

      <div className="h-40 animate-pulse rounded-lg bg-gray-200"></div>
    </div>
  );
}

// Main page component (server component)
export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<EventLoader />}>
      <EventView params={params} />
    </Suspense>
  );
}

import { Metadata } from 'next';
import { Suspense } from 'react';
import { StudentApplicationsContent } from '@/app/coach/applications/components.refactored';

export const metadata: Metadata = {
  title: 'Student Applications',
  description: 'Review and manage student applications',
};

/**
 * Loading state component for applications
 */
function ApplicationsLoader() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200"></div>
      <div className="h-4 w-64 animate-pulse rounded bg-gray-200"></div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
        ))}
      </div>

      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-200"></div>
      ))}
    </div>
  );
}

// Main page component (server component)
export default function StudentApplicationsPage() {
  return (
    <Suspense fallback={<ApplicationsLoader />}>
      <StudentApplicationsContent />
    </Suspense>
  );
}

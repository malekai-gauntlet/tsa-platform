'use client';

import { LockClosedIcon } from '@heroicons/react/24/outline';

interface LockedRouteProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
}

export function LockedRoute({
  children,
  title = 'Coming Soon',
  description = 'This feature is currently in development and will be available soon.',
}: LockedRouteProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <LockClosedIcon className="h-8 w-8 text-gray-500" />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mb-6 text-gray-600">{description}</p>
        <div className="text-sm text-gray-500">Check back soon for updates!</div>
      </div>
    </div>
  );
}

// Export for legal page specifically
export function LockedLegal() {
  return (
    <LockedRoute
      title="Legal Hub Coming Soon"
      description="The Legal Hub will provide comprehensive legal tools including contract management, compliance tracking, and legal document generation. This feature is currently in development."
    />
  );
}

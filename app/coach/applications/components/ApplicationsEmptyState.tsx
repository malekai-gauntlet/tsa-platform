'use client';

import React from 'react';
import { TableCellsIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/ui/button';

interface ApplicationsEmptyStateProps {
  message?: string;
  subMessage?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * Empty state component for when there are no applications
 */
export const ApplicationsEmptyState = React.memo<ApplicationsEmptyStateProps>(
  ({
    message = 'No applications yet',
    subMessage = 'Student applications will appear here when parents submit them through the public enrollment form.',
    actionLabel,
    onAction,
  }) => {
    return (
      <div className="w-full">
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <TableCellsIcon className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{message}</h3>
          <p className="mx-auto mb-6 max-w-sm text-sm text-gray-500">{subMessage}</p>

          {actionLabel && onAction && (
            <Button onClick={onAction} className="inline-flex items-center justify-center">
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

ApplicationsEmptyState.displayName = 'ApplicationsEmptyState';

export default ApplicationsEmptyState;

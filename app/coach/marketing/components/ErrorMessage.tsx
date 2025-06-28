import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import type { ErrorState } from '../types';

interface ErrorMessageProps {
  errorState: ErrorState | null;
  onClear: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorState, onClear }) => {
  if (!errorState) return null;

  return (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-center gap-2">
        <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
        <span className="font-medium text-red-800">{errorState.message}</span>
      </div>
    </div>
  );
};

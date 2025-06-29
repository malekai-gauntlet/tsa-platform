import React, { memo, useEffect } from 'react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import type { ErrorState } from '../types';

interface ErrorMessageProps {
  errorState: ErrorState | null;
  onClear: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = memo(({ errorState, onClear }) => {
  // Auto-clear error after 5 seconds
  useEffect(() => {
    if (errorState) {
      const timer = setTimeout(onClear, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorState, onClear]);
  
  if (!errorState) return null;

  return (
    <div 
      role="alert"
      className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
      data-error-type={errorState.type}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
          <span className="font-medium text-red-800">{errorState.message}</span>
        </div>
        <button 
          onClick={onClear}
          className="ml-4 rounded-full p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
          aria-label="Dismiss error message"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

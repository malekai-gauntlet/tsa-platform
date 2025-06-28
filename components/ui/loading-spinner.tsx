'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'blue' | 'green' | 'purple' | 'gray' | 'white';
  text?: string;
  className?: string;
}

const sizeMap = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const colorMap = {
  primary: 'border-[#004aad]', // TSA Primary Blue
  blue: 'border-blue-600',
  green: 'border-green-600',
  purple: 'border-purple-600',
  gray: 'border-gray-600',
  white: 'border-white',
};

/**
 * TSA Loading Spinner Component
 * Centralized loading states with consistent TSA branding
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  text,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-200',
          sizeMap[size],
          colorMap[color]
        )}
      />
      {text && <p className="mt-2 text-sm font-medium text-gray-600">{text}</p>}
    </div>
  );
};

/**
 * Full Page Loading Component
 * Consistent full-screen loading experience
 */
interface LoadingPageProps {
  title?: string;
  description?: string;
  size?: 'md' | 'lg' | 'xl';
}

export const LoadingPage: React.FC<LoadingPageProps> = ({
  title = 'Loading...',
  description,
  size = 'lg',
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size={size} color="primary" className="mb-4" />
        <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

/**
 * Inline Loading Component
 * For loading states within content areas
 */
interface LoadingInlineProps {
  text?: string;
  size?: 'sm' | 'md';
  align?: 'left' | 'center';
}

export const LoadingInline: React.FC<LoadingInlineProps> = ({
  text = 'Loading...',
  size = 'sm',
  align = 'center',
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 py-4',
        align === 'center' ? 'justify-center' : 'justify-start'
      )}
    >
      <LoadingSpinner size={size} color="primary" />
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
};

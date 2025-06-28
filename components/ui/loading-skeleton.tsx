'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Base Skeleton Component
 */
interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, children }) => {
  return <div className={cn('animate-pulse rounded bg-gray-200', className)}>{children}</div>;
};

/**
 * Card List Skeleton
 * For loading states in admin tables, coach lists, etc.
 */
interface CardListSkeletonProps {
  count?: number;
  showAvatar?: boolean;
  showStatus?: boolean;
}

export const CardListSkeleton: React.FC<CardListSkeletonProps> = ({
  count = 3,
  showAvatar = true,
  showStatus = true,
}) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-4">
            {showAvatar && <Skeleton className="h-12 w-12 rounded-full" />}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            {showStatus && <Skeleton className="h-8 w-20 rounded-full" />}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Stats Grid Skeleton
 * For loading dashboard statistics
 */
interface StatsGridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4;
}

export const StatsGridSkeleton: React.FC<StatsGridSkeletonProps> = ({ count = 4, columns = 4 }) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
          <Skeleton className="mb-2 h-8 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
};

/**
 * Table Skeleton
 * For loading data tables
 */
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  showHeader = true,
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {showHeader && (
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
      )}
      <div className="divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-24" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Page Header Skeleton
 * For loading page titles and descriptions
 */
export const PageHeaderSkeleton: React.FC = () => {
  return (
    <div className="mb-8">
      <Skeleton className="mb-2 h-8 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
};

/**
 * Form Skeleton
 * For loading forms
 */
interface FormSkeletonProps {
  fields?: number;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({ fields = 4 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i}>
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex justify-end space-x-3 pt-4">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

/**
 * Application Card Skeleton
 * Specialized for student applications
 */
export const ApplicationCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div>
              <Skeleton className="mb-1 h-5 w-40" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div>
              <Skeleton className="mb-1 h-4 w-32" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-3 w-64" />
          </div>
        </div>
        <div className="ml-4 flex flex-col items-end gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from './card';

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  loading?: boolean;
  emptyState?: {
    icon: React.ReactNode;
    title: string;
    description: string;
    action?: React.ReactNode;
  };
}

const iconColorMap = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  red: 'bg-red-100 text-red-600',
  gray: 'bg-gray-100 text-gray-600',
};

/**
 * Feature Card Component
 * Mobile-first responsive dashboard widget with header, content, and optional empty states
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  icon,
  iconColor = 'blue',
  action,
  children,
  className,
  loading = false,
  emptyState,
}) => {
  const iconClasses = iconColorMap[iconColor];

  return (
    <Card className={cn('flex h-full flex-col', className)}>
      <CardHeader
        icon={
          <div className={cn('rounded-md p-1.5 sm:rounded-lg sm:p-2', iconClasses.split(' ')[0])}>
            <div className={cn('h-4 w-4 sm:h-5 sm:w-5', iconClasses.split(' ')[1])}>{icon}</div>
          </div>
        }
        action={action}
      >
        {title}
      </CardHeader>

      <CardContent divided className="flex flex-1 flex-col p-0">
        {loading ? (
          <div className="flex flex-1 flex-col justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
            <div
              className={cn(
                'mx-auto h-5 w-5 animate-spin rounded-full border-b-2 sm:h-6 sm:w-6',
                `border-${iconColor}-600`
              )}
            ></div>
            <p className="mt-2 text-xs text-gray-500 sm:text-sm">Loading...</p>
          </div>
        ) : emptyState ? (
          <div className="flex flex-1 flex-col justify-center px-4 py-8 text-center sm:px-6 sm:py-12">
            <div className="mx-auto mb-2 h-6 w-6 text-gray-400 sm:mb-3 sm:h-8 sm:w-8">
              {emptyState.icon}
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900">{emptyState.title}</h3>
            <p className="mb-3 text-xs text-gray-500 sm:mb-4 sm:text-sm">
              {emptyState.description}
            </p>
            {emptyState.action}
          </div>
        ) : (
          <div className="flex-1 divide-y divide-gray-100">{children}</div>
        )}
      </CardContent>
    </Card>
  );
};

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
}

/**
 * Empty State Component
 * Mobile-first responsive empty states with icon, title, description, and optional action
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div className={cn('px-4 py-8 text-center sm:px-6 sm:py-12', className)}>
      <div className="mx-auto mb-2 h-6 w-6 text-gray-400 sm:mb-3 sm:h-8 sm:w-8">{icon}</div>
      <h3 className="mb-1 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mx-auto mb-3 max-w-sm text-xs text-gray-500 sm:mb-4 sm:text-sm">
        {description}
      </p>
      {action &&
        (action.href ? (
          <a href={action.href}>
            <Button variant={action.variant || 'outline'} size="sm">
              {action.label}
            </Button>
          </a>
        ) : (
          <Button variant={action.variant || 'outline'} size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
    </div>
  );
};

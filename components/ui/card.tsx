'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  divided?: boolean;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

/**
 * Base Card Component
 * Mobile-first responsive design following TSA theme
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base mobile-first styles
          'w-full overflow-hidden rounded-lg border bg-white sm:rounded-xl',
          // Variant styles
          {
            'border-gray-200': variant === 'default',
            'border-gray-200 shadow-sm sm:shadow-md': variant === 'elevated',
            'border-gray-300': variant === 'outlined',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

/**
 * Card Header Component
 * Mobile-first responsive header with touch targets
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, icon, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border-b border-gray-100 bg-gray-50/50 px-4 py-3 sm:px-6 sm:py-4',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            {icon && (
              <div className="flex-shrink-0 rounded-md bg-blue-100 p-1.5 sm:rounded-lg sm:p-2">
                <div className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5">{icon}</div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-base font-semibold text-gray-900 sm:text-lg">
                {children}
              </div>
            </div>
          </div>
          {action && (
            <div className="flex min-h-[44px] flex-shrink-0 items-center text-sm font-medium text-[#004aad] transition-colors hover:text-[#003888]">
              {action}
            </div>
          )}
        </div>
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

/**
 * Card Content Component
 * Mobile-first responsive content area
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, divided = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-4 py-4 sm:px-6 sm:py-6',
          {
            'divide-y divide-gray-100': divided,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

/**
 * Card Footer Component
 * Mobile-first responsive footer with touch targets
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, sticky = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'border-t border-gray-100 bg-gray-50/50 px-4 py-3 sm:px-6 sm:py-4',
          {
            'sticky bottom-0': sticky,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';

/**
 * Card Title Component
 * Simple title component for card headers
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg leading-none font-semibold tracking-tight text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  );
});
CardTitle.displayName = 'CardTitle';

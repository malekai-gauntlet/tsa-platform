'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface ListItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * List Item Component
 * Mobile-first responsive list item with proper touch targets
 */
export const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  icon,
  badge,
  action,
  onClick,
  href,
  className,
  variant = 'default',
}) => {
  const isInteractive = onClick || href;
  const Component = href ? 'a' : 'div';

  const content = (
    <div
      className={cn(
        // Base mobile-first styles with proper touch targets
        'flex items-center gap-3 p-3 transition-colors sm:p-4',
        // Ensure minimum touch target height
        'min-h-[56px]',
        // Interactive states
        {
          'cursor-pointer hover:bg-gray-50 active:bg-gray-100': isInteractive,
          'border-b border-gray-100 last:border-b-0': variant === 'default',
        },
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10">{icon}</div>
        </div>
      )}

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900 sm:text-base">{title}</h3>
            {description && (
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
                {description}
              </p>
            )}
          </div>

          {/* Right side content */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {badge && <div className="flex-shrink-0">{badge}</div>}

            {action && <div className="flex-shrink-0">{action}</div>}

            {isInteractive && !action && (
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-gray-400 sm:h-5 sm:w-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Component
        href={href}
        onClick={onClick}
        className="block focus:ring-2 focus:ring-[#004aad] focus:outline-none focus:ring-inset"
      >
        {content}
      </Component>
    );
  }

  return (
    <Component
      onClick={onClick}
      className={cn(
        isInteractive && 'focus:ring-2 focus:ring-[#004aad] focus:outline-none focus:ring-inset'
      )}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
    >
      {content}
    </Component>
  );
};

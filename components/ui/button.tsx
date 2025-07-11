'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

/**
 * Button Component
 * Mobile-first responsive design following TSA theme with touch targets
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base mobile-first styles with touch targets
          'inline-flex items-center justify-center font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          // Ensure minimum touch target size on mobile
          'min-h-[44px] touch-manipulation',

          // Size variants - mobile-first approach
          {
            'gap-1.5 rounded-md px-3 py-2 text-sm': size === 'sm',
            'gap-2 rounded-md px-4 py-2.5 text-sm sm:px-5 sm:py-3': size === 'md',
            'gap-2 rounded-lg px-5 py-3 text-base sm:px-6 sm:py-4 sm:text-lg': size === 'lg',
          },

          // Full width option
          {
            'w-full': fullWidth,
          },

          // Color variants
          {
            'bg-[#004aad] text-white hover:bg-[#003888] focus:ring-[#004aad] active:bg-[#002d66]':
              variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300':
              variant === 'secondary',
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 active:bg-gray-100':
              variant === 'outline',
            'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200':
              variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800':
              variant === 'danger',
          },

          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading && <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />}

        {icon && iconPosition === 'left' && !loading && (
          <div className="h-4 w-4 flex-shrink-0">{icon}</div>
        )}

        {children && <span className="truncate">{children}</span>}

        {icon && iconPosition === 'right' && !loading && (
          <div className="h-4 w-4 flex-shrink-0">{icon}</div>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

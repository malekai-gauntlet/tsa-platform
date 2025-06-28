'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@heroicons/react/24/solid';

interface TimelineStepProps {
  id: number;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  autoDetected?: boolean;
  onClick?: () => void;
  className?: string;
  isMobile?: boolean;
}

/**
 * Timeline Step Component
 * Mobile-first responsive step with different layouts for mobile and desktop
 */
export const TimelineStep: React.FC<TimelineStepProps> = ({
  id,
  name,
  description,
  status,
  autoDetected = false,
  onClick,
  className,
  isMobile = false,
}) => {
  const isInteractive = onClick && !autoDetected && status !== 'completed';

  if (isMobile) {
    // Mobile layout: Vertical card-like design
    return (
      <div className={cn('group flex w-24 flex-col items-center', className)}>
        {/* Step Circle */}
        <div className="relative z-10 mb-2">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200',
              {
                'border-green-500 bg-green-500 text-white': status === 'completed',
                'border-[#004aad] bg-[#004aad] text-white': status === 'current',
                'border-gray-300 bg-white text-gray-500': status === 'upcoming',
                'cursor-pointer hover:scale-105': isInteractive,
              }
            )}
            onClick={isInteractive ? onClick : undefined}
            title={isInteractive ? 'Click to mark as complete' : ''}
          >
            {status === 'completed' ? (
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <span className="text-xs font-semibold">{id}</span>
            )}
          </div>

          {/* Auto-detected indicator */}
          {autoDetected && status === 'completed' && (
            <div className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
              <CheckIcon className="h-2 w-2 text-white" />
            </div>
          )}
        </div>

        {/* Step Content */}
        <div className="text-center">
          <h3
            className={cn('mb-1 text-xs leading-tight font-semibold', {
              'text-[#004aad]': status === 'current',
              'text-gray-900': status !== 'current',
            })}
          >
            {name}
          </h3>
          <p className="text-xs leading-tight text-gray-500">{description}</p>

          {/* Status Badge */}
          <div className="mt-1">
            {status === 'completed' && (
              <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
                ✓
              </span>
            )}
            {status === 'current' && (
              <span className="inline-flex items-center rounded-full bg-[#004aad]/10 px-1.5 py-0.5 text-xs font-medium text-[#004aad]">
                •
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout: Original horizontal design
  return (
    <div className={cn('group flex flex-col items-center', className)}>
      {/* Step Circle */}
      <div className="relative z-10 mb-3">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-200',
            {
              'border-green-500 bg-green-500 text-white': status === 'completed',
              'border-[#004aad] bg-[#004aad] text-white': status === 'current',
              'border-gray-300 bg-white text-gray-500': status === 'upcoming',
              'cursor-pointer hover:scale-105': isInteractive,
            }
          )}
          onClick={isInteractive ? onClick : undefined}
          title={isInteractive ? 'Click to mark as complete' : ''}
        >
          {status === 'completed' ? (
            <CheckIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <span className="text-sm font-semibold">{id}</span>
          )}
        </div>

        {/* Auto-detected indicator */}
        {autoDetected && status === 'completed' && (
          <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
            <CheckIcon className="h-2.5 w-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Step Content */}
      <div className="max-w-24 text-center">
        <h3
          className={cn('mb-1 text-sm font-semibold', {
            'text-[#004aad]': status === 'current',
            'text-gray-900': status !== 'current',
          })}
        >
          {name}
        </h3>
        <p className="text-xs leading-tight text-gray-500">{description}</p>

        {/* Status Badge */}
        <div className="mt-2">
          {status === 'completed' && (
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              Complete
            </span>
          )}
          {status === 'current' && (
            <span className="inline-flex items-center rounded-full bg-[#004aad]/10 px-2 py-1 text-xs font-medium text-[#004aad]">
              Current
            </span>
          )}
          {status === 'upcoming' && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
              Pending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

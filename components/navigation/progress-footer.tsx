'use client';

import React from 'react';
import { Link } from '@/components/link';

type ProgressFooterProps = {
  progressPercent?: number;
  nextButtonText?: string;
  nextButtonHref?: string;
  backButtonHref?: string;
  buttonClassName?: string;
  nextButtonClassName?: string;
  buttonAction?: () => void;
  showBackButton?: boolean;
  disabled?: boolean;
};

export function ProgressFooter({
  progressPercent = 0,
  nextButtonText = 'Get started',
  nextButtonHref,
  backButtonHref,
  buttonClassName = '',
  nextButtonClassName = 'bg-gradient-to-r from-[#FF385C] to-[#E01C45] hover:from-[#E01C45] hover:to-[#C11B3D] text-white',
  buttonAction,
  showBackButton = false,
  disabled = false,
}: ProgressFooterProps) {
  return (
    <footer className="fixed right-0 bottom-0 left-0 z-[100] w-full border-t border-gray-200 bg-white">
      {/* Progress bar - blue gradient to match button */}
      <div className="h-1 w-full bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Button container */}
      <div className="flex w-full justify-between px-8 py-4">
        {/* Back button */}
        <div>
          {showBackButton && backButtonHref && (
            <Link href={backButtonHref}>
              <button
                type="button"
                className="rounded-lg border border-gray-300 px-7 py-3.5 text-base font-medium text-gray-700 transition-all hover:bg-gray-100"
              >
                Back
              </button>
            </Link>
          )}
        </div>

        {/* Next/Continue button - prioritize buttonAction over href */}
        <div>
          {buttonAction ? (
            // If buttonAction is provided, use it (even if href is also provided)
            <button
              type="button"
              onClick={disabled ? undefined : buttonAction}
              disabled={disabled}
              className={`rounded-lg px-7 py-3.5 text-base font-medium transition-all ${nextButtonClassName} ${buttonClassName} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {nextButtonText}
            </button>
          ) : nextButtonHref && !disabled ? (
            // Only use href navigation if no buttonAction is provided
            <Link href={nextButtonHref} className="inline-block">
              <button
                type="button"
                className={`rounded-lg px-7 py-3.5 text-base font-medium transition-all ${nextButtonClassName} ${buttonClassName}`}
              >
                {nextButtonText}
              </button>
            </Link>
          ) : (
            // Fallback disabled button
            <button
              type="button"
              disabled={true}
              className={`rounded-lg px-7 py-3.5 text-base font-medium transition-all ${nextButtonClassName} ${buttonClassName} cursor-not-allowed opacity-50`}
            >
              {nextButtonText}
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

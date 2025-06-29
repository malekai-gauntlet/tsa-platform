'use client';

import React from 'react';

interface ErrorMessageProps {
  message?: string;
  show?: boolean;
  className?: string;
}

export function ErrorMessage({ message, show = false, className = '' }: ErrorMessageProps) {
  return (
    <div className={`mt-2 h-6 ${className}`}>
      {show && message && <p className="text-center text-sm leading-6 text-red-500">{message}</p>}
    </div>
  );
}

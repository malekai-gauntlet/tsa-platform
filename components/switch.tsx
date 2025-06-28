'use client';

import React from 'react';
import { clsx } from 'clsx';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface SwitchFieldProps {
  children: React.ReactNode;
  className?: string;
}

export function Switch({
  checked = false,
  onChange,
  disabled = false,
  className,
  children,
}: SwitchProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
        checked ? 'bg-blue-600' : 'bg-gray-200',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
      {children && <span className="sr-only">{children}</span>}
    </button>
  );
}

export function SwitchField({ children, className }: SwitchFieldProps) {
  return <div className={clsx('flex items-center justify-between', className)}>{children}</div>;
}

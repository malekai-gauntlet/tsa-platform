import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Badge, badgeVariants } from './badge';

// Extended color variants that match the original Badge component colors
const extendedBadgeVariants = cva('', {
  variants: {
    color: {
      red: 'bg-red-100 text-red-800 border-red-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      lime: 'bg-lime-100 text-lime-800 border-lime-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200',
      cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      sky: 'bg-sky-100 text-sky-800 border-sky-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      violet: 'bg-violet-100 text-violet-800 border-violet-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      fuchsia: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      rose: 'bg-rose-100 text-rose-800 border-rose-200',
      zinc: 'bg-zinc-100 text-zinc-800 border-zinc-200',
    },
    rounded: {
      default: 'rounded-full',
      md: 'rounded-md',
    },
  },
  defaultVariants: {
    rounded: 'default',
  },
});

export interface ExtendedBadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants>,
    VariantProps<typeof extendedBadgeVariants> {}

/**
 * ExtendedBadge component that wraps the UI Badge with additional color options
 * This provides backwards compatibility with the original Badge component's color prop
 */
export function ExtendedBadge({
  className,
  variant = 'outline',
  color,
  rounded,
  ...props
}: ExtendedBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(extendedBadgeVariants({ color, rounded }), className)}
      {...props}
    />
  );
}

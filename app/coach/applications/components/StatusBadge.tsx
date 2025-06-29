'use client';

import React, { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getStatusBadgeVariant, formatStatusText } from '@/lib/utils/coach';

export interface StatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * Status badge component with consistent styling based on status value
 */
export const StatusBadge = React.memo<StatusBadgeProps>(({ status, className }) => {
  const variant = useMemo(() => getStatusBadgeVariant(status), [status]);
  const displayText = useMemo(() => formatStatusText(status), [status]);

  return (
    <Badge className={cn('border text-xs font-medium', variant, className)}>{displayText}</Badge>
  );
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;

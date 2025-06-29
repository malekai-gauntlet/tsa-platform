import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// Field wrapper component for forms
interface CheckboxFieldProps {
  label?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function CheckboxField({
  label,
  description,
  className,
  children,
  ...props
}: CheckboxFieldProps & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox className={className} {...props} />
      {(label || description) && (
        <div className="space-y-1 leading-none">
          {label && (
            <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          {description && <p className="text-muted-foreground text-xs">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

export { Checkbox };

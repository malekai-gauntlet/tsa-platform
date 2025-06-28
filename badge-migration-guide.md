# Badge Component Migration Guide

This document outlines the process to standardize the Badge component implementation across the application by adopting the UI Badge component with our extended version for backwards compatibility.

## Why Migrate?

1. **Consistency**: Creates a unified UI experience
2. **Maintainability**: Single component to update and maintain
3. **Flexibility**: Class-variance-authority provides better styling flexibility
4. **Modern API**: Consistent with other UI components
5. **Library Integration**: Part of the cohesive UI component system

## Migration Options

### Option 1: Direct replacement with new variants

Use the standard UI Badge with custom classes to achieve the same look:

**Before:**

```tsx
import { Badge } from '@/components/badge';

<Badge color="green">Completed</Badge>;
```

**After:**

```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="outline" className="border-green-200 bg-green-100 text-green-800">
  Completed
</Badge>;
```

### Option 2: Use the Extended Badge component (Recommended)

We've created an `ExtendedBadge` component that wraps the UI Badge but supports the original color prop:

**Before:**

```tsx
import { Badge } from '@/components/badge';

<Badge color="green">Completed</Badge>;
```

**After:**

```tsx
import { ExtendedBadge } from '@/components/ui/badge-extended';

<ExtendedBadge color="green" rounded="md">
  Completed
</ExtendedBadge>;
```

## Mapping Original Colors to UI Variants

| Original Color     | UI Badge Equivalent            |
| ------------------ | ------------------------------ |
| `green`, `emerald` | `ExtendedBadge color="green"`  |
| `red`              | `ExtendedBadge color="red"`    |
| `blue`, `indigo`   | `ExtendedBadge color="blue"`   |
| `orange`, `amber`  | `ExtendedBadge color="orange"` |
| `zinc`             | `ExtendedBadge color="zinc"`   |

## Visual Differences to Note

1. **Corner Radius**:
   - Original Badge: `rounded-md` (medium rounded corners)
   - UI Badge: `rounded-full` (pill shape)
   - ExtendedBadge: Use `rounded="md"` to match original

2. **Padding**:
   - There might be slight differences in padding/spacing

## Implementation Steps

1. Import the ExtendedBadge instead of the original Badge:

   ```tsx
   // Before
   import { Badge } from '@/components/badge';

   // After
   import { ExtendedBadge } from '@/components/ui/badge-extended';
   ```

2. Replace `Badge` with `ExtendedBadge` and add the `rounded="md"` prop to maintain the original look:

   ```tsx
   // Before
   <Badge color="green">Completed</Badge>

   // After
   <ExtendedBadge color="green" rounded="md">Completed</ExtendedBadge>
   ```

3. If you were using the BadgeButton from the original component, use a button with the ExtendedBadge:

   ```tsx
   // Before
   <BadgeButton color="green">Click me</BadgeButton>

   // After
   <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
     <ExtendedBadge color="green" rounded="md">Click me</ExtendedBadge>
   </button>
   ```

## Files Requiring Migration

1. `/app/coach/settings/page.tsx`
2. `/components/dashboard-steps/review-materials-step.tsx`
3. `/components/dashboard-steps/host-events-step.tsx`
4. `/components/dashboard-steps/find-real-estate-step.tsx`
5. `/components/dashboard-steps/bootcamp-step.tsx`
6. `/app/coach/events/[id]/page.tsx`

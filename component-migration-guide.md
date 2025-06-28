# Button Component Migration Guide

This document outlines the process to standardize the Button component implementation across the application by adopting the `/components/ui/button.tsx` component and phasing out the root `/components/button.tsx` component.

## Why Standardize?

1. **Consistency**: Creates a unified UI experience
2. **Maintainability**: Single component to update and maintain
3. **Modern API**: The UI Button offers loading state and icon support
4. **Library Integration**: Part of the cohesive UI component system
5. **Mobile-first**: Better responsive design approach

## Property Mapping Guide

When migrating from the root Button to UI Button, use this mapping to convert props:

| Root Button Prop    | UI Button Prop                        | Notes                                        |
| ------------------- | ------------------------------------- | -------------------------------------------- |
| `color="red"`       | `variant="danger"`                    | Color names map to semantic variants         |
| `color="dark/zinc"` | `variant="primary"`                   | Default dark style                           |
| `color="light"`     | `variant="secondary"`                 | Light background style                       |
| `outline`           | `variant="outline"`                   | Was boolean in root, is string variant in UI |
| `plain`             | `variant="ghost"`                     | Plain style maps to ghost variant            |
| No equivalent       | `size="sm"`, `size="md"`, `size="lg"` | New explicit sizing options                  |
| No equivalent       | `loading={true}`                      | New loading state support                    |
| No equivalent       | `icon={<Icon/>}`                      | New icon support                             |
| No equivalent       | `iconPosition="left"/"right"`         | New icon positioning                         |
| No equivalent       | `fullWidth={true}`                    | New full width option                        |

## Link Handling

The root Button handled links automatically if `href` was provided. In the UI Button version, you'll need to use Next.js `Link` component separately.

**Before:**

```tsx
<Button href="/somewhere">Go Somewhere</Button>
```

**After:**

```tsx
import Link from 'next/link';

<Link href="/somewhere">
  <Button>Go Somewhere</Button>
</Link>;
```

## Usage Examples

### Basic Button

**Before:**

```tsx
<Button>Save</Button>
```

**After:**

```tsx
<Button variant="primary">Save</Button>
```

### Color Variations

**Before:**

```tsx
<Button color="red">Delete</Button>
```

**After:**

```tsx
<Button variant="danger">Delete</Button>
```

### Outline Button

**Before:**

```tsx
<Button outline>Cancel</Button>
```

**After:**

```tsx
<Button variant="outline">Cancel</Button>
```

### Loading State

**Before:**

```tsx
// Manual implementation
<Button>
  {loading && <div className="animate-spin">...</div>}
  {loading ? 'Saving...' : 'Save'}
</Button>
```

**After:**

```tsx
<Button loading={loading}>Save</Button>
```

## Implementation Steps

1. Update imports from `@/components/button` to `@/components/ui/button` or `@/components/ui`
2. Update component props according to the mapping guide
3. Handle links properly with Next.js Link component
4. Test the migrated component to ensure correct appearance and behavior
5. Once all usages are migrated, consider removing the old component

## Files Requiring Migration

1. `/app/coach/settings/page.tsx`
2. `/app/coach/marketing/components/ResourceModal.tsx`
3. `/app/coach/events/create/page.tsx`
4. `/app/coach/events/[id]/page.tsx`
5. `/app/coach/events/[id]/edit/page.tsx`

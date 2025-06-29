# TSA Platform Development Guide

## Overview

This guide provides essential information for developers working on the TSA Platform codebase.

## Architecture

### Tech Stack

- **Framework**: Next.js 14.x with App Router
- **Language**: TypeScript
- **Authentication**: AWS Amplify (Cognito)
- **Database**: AWS DynamoDB via GraphQL (AppSync)
- **Styling**: TailwindCSS
- **Mapping**: Mapbox GL JS

### Directory Structure

```
/app               - Next.js App Router pages
/lib               - Shared utilities, services, and hooks
  /api             - GraphQL client and API integrations
  /hooks           - React hooks
  /types           - TypeScript type definitions
  /utils           - Utility functions
/components        - Reusable UI components
  /ui              - Modern UI component library (preferred)
  /form            - Form-specific components
  /layout          - Layout components
  /navigation      - Navigation components
  /data-display    - Data display components
/amplify           - AWS Amplify configuration
/scripts           - Utility scripts
```

## Component Standards

### Preferred Component Library

Use components from `/components/ui/` as the primary component library. These components:

- Follow modern React patterns
- Include proper TypeScript types
- Support consistent theming
- Have built-in accessibility features

### Component Migration Guidelines

When updating components, follow these patterns:

#### Button Components

- **Use**: `@/components/ui/button`
- **Variants**: `primary`, `secondary`, `danger`, `outline`, `ghost`
- **Props**: Support `loading`, `icon`, `size`, `fullWidth`

```tsx
// ✅ Preferred
import { Button } from '@/components/ui/button';
<Button variant="primary" loading={isSubmitting}>
  Save
</Button>;

// ❌ Avoid
import { Button } from '@/components/button';
<Button color="dark">Save</Button>;
```

#### Badge Components

- **Use**: `@/components/ui/badge` or `@/components/ui/badge-extended`
- **ExtendedBadge**: Provides backward compatibility with color props

```tsx
// ✅ Preferred
import { ExtendedBadge } from '@/components/ui/badge-extended';
<ExtendedBadge color="green" rounded="md">
  Active
</ExtendedBadge>;
```

### Form Components

- Consolidate form components under `/components/form/`
- Use consistent validation patterns
- Implement proper error handling

## Code Standards

### Import Organization

```tsx
// 1. React and Next.js imports
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party libraries
import { format } from 'date-fns';

// 3. Internal imports (grouped by type)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/hooks/useAuth';
import { GraphQLClient } from '@/lib/api/graphql-client';
import type { User } from '@/lib/types/auth';
```

### Naming Conventions

- **Files**: kebab-case for files (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Functions/Variables**: camelCase (`getUserProfile`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_ATTEMPTS`)
- **Types/Interfaces**: PascalCase (`UserProfile`, `AuthState`)

### State Management

- Use `useState` for simple local state
- Use `useReducer` for complex state with multiple related values
- Create custom hooks for reusable stateful logic
- Avoid prop drilling - use context or custom hooks

```tsx
// ✅ Good - Custom hook for related state
function useFormState(initialData) {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    (field, value) => {
      setData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: null }));
      }
    },
    [errors]
  );

  return { data, errors, isSubmitting, updateField, setErrors, setIsSubmitting };
}
```

## Performance Guidelines

### Component Optimization

- Use `React.memo()` for components that receive stable props
- Use `useMemo()` for expensive calculations
- Use `useCallback()` for functions passed to child components
- Avoid creating objects/arrays in render

```tsx
// ✅ Optimized component
const UserCard = React.memo(({ user, onEdit }) => {
  const displayName = useMemo(
    () => `${user.firstName} ${user.lastName}`.trim(),
    [user.firstName, user.lastName]
  );

  const handleEdit = useCallback(() => {
    onEdit(user.id);
  }, [onEdit, user.id]);

  return (
    <div>
      <h3>{displayName}</h3>
      <Button onClick={handleEdit}>Edit</Button>
    </div>
  );
});
```

## Testing Guidelines

### Component Testing

- Test component behavior, not implementation
- Use React Testing Library
- Mock external dependencies
- Test error states and loading states

### API Testing

- Test API integration points
- Mock GraphQL responses
- Test error handling
- Validate data transformation

## Security Guidelines

### Input Validation

- Validate all user inputs on both client and server
- Sanitize data before displaying
- Use proper TypeScript types to catch issues early

### Authentication

- Use AWS Amplify Auth for authentication
- Implement proper route protection
- Handle auth state consistently across the app

## Deployment

### Build Process

```bash
npm run build    # Build the application
npm run start    # Start production server
npm run dev      # Start development server
```

### Environment Variables

- Store sensitive values in environment variables
- Use `.env.local` for local development
- Document all required environment variables

## Common Patterns

### Error Handling

```tsx
function useApiCall() {
  const [state, setState] = useState({ data: null, loading: false, error: null });

  const execute = async apiCall => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error.message });
    }
  };

  return { ...state, execute };
}
```

### Data Fetching

```tsx
function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function fetchUser() {
      try {
        const userData = await GraphQLClient.getUser(userId);
        if (!cancelled) {
          setUser(userData);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { user, loading, error };
}
```

## Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [AWS Amplify Documentation](https://docs.amplify.aws)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Tools

- **Code Formatting**: Prettier
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Testing**: Jest + React Testing Library

# Amplify Gen 2 Type Pattern

When working with Amplify Gen 2 (v6.x) schema types in TypeScript, there are two approaches:

## Option 1: Using helper functions from Amplify (if available)

```typescript
// If helper functions are available:
import { getModelType } from '@aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

export type MyModelType = getModelType<Schema, 'MyModel'>;
```

## Option 2: Manually define types (more reliable)

```typescript
// Manually define the type based on the schema structure
export type MyModelType = {
  id: string;
  name: string;
  description?: string;
  // ... other fields
  createdAt?: string;
  updatedAt?: string;
};
```

Avoid using the deprecated pattern from Amplify v5 and earlier:
```typescript
// INCORRECT - Legacy pattern
export type MyModelType = NonNullable<Schema["models"]["MyModel"]["record"]>;
```

And be careful with the approach that tries to use `typeof` on Schema, as it's only a type:
```typescript
// PROBLEMATIC - Schema is only a type, not a value
export type MyModelType = NonNullable<Parameters<typeof Schema["models"]["MyModel"]["update"]>[0]>;
```

This guidance ensures proper typing with AWS Amplify v6.15.x client APIs.

# Import Management Rules

## Absolute Imports Only

**NEVER use relative imports in this codebase.** Always use absolute imports.

### Rules:

- ❌ **FORBIDDEN**: `import { Component } from './component'`
- ❌ **FORBIDDEN**: `import { Utils } from '../utils'`
- ❌ **FORBIDDEN**: `import { Helper } from '../../lib/helper'`
- ✅ **REQUIRED**: `import { Component } from '@/components/component'`
- ✅ **REQUIRED**: `import { Utils } from '@/lib/utils'`
- ✅ **REQUIRED**: `import { Helper } from '@/lib/helper'`

### Path Aliases:

- Use `@/` for all internal imports from the project root
- Use `@/components/` for component imports
- Use `@/lib/` for utility and library imports
- Use `@/types/` for type definitions
- Use `@/hooks/` for custom hooks
- Use `@/constants/` for constants

### Examples:

```typescript
// ❌ WRONG - Relative imports
import { Button } from './ui/button';
import { utils } from '../lib/utils';
import { UserType } from '../../types/user';

// ✅ CORRECT - Absolute imports
import { Button } from '@/components/ui/button';
import { utils } from '@/lib/utils';
import { UserType } from '@/types/user';
```

### Benefits:

- Easier refactoring and moving files
- Clearer import paths regardless of file location
- Better IDE support and autocompletion
- Consistent import style across the codebase
- Reduced cognitive load when reading imports

### Enforcement:

- All new code MUST use absolute imports
- When refactoring existing code, convert relative imports to absolute
- Code reviews should reject any relative imports

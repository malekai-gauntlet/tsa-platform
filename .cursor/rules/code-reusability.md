# Code Reusability and Structure

## Core Principle
Maintain a structured codebase by separating reusable code into dedicated modules and utilities. Follow the pattern: **Generate → Identify Reusability → Extract → Import**.

## Implementation Workflow

### 1. Initial Development
- Generate the file with complete functionality first
- Focus on getting the feature working correctly

### 2. Reusability Analysis
After generating working code, analyze for:
- **Utilities**: Pure functions that can be used across components
- **Constants**: Shared configuration, styling values, or data
- **Types**: TypeScript interfaces/types used in multiple places
- **Components**: UI elements that appear in multiple locations
- **Hooks**: React hooks with reusable logic
- **Services**: API calls, data processing, or business logic

### 3. Extraction Strategy
Move reusable code to appropriate directories:

```
lib/
├── utils/           # Pure utility functions
├── constants/       # Shared constants and configuration
├── types/          # TypeScript type definitions
├── hooks/          # Custom React hooks
├── services/       # API services and data processing
└── validators/     # Form and data validation

components/
├── ui/             # Reusable UI components
├── forms/          # Form-specific components
└── layout/         # Layout and structural components
```

### 4. Import Back
- Replace extracted code with clean imports
- Ensure all functionality remains intact
- Update any dependent code

## Extraction Criteria

Extract code when it:
- **Appears 2+ times** in the codebase
- **Could be useful** in future components
- **Has clear boundaries** (pure functions, standalone logic)
- **Reduces file complexity** when moved

## File Organization Examples

### ✅ Good Structure
```typescript
// lib/utils/mapbox.ts
export const initializeMapbox = (token: string) => { ... }
export const addDistrictsLayer = (map: Map) => { ... }

// lib/constants/mapbox.ts
export const MAPBOX_STYLES = {
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9'
}

// lib/types/districts.ts
export interface District {
  id: string;
  name: string;
  region: string;
}

// components/map/MapView.tsx
import { initializeMapbox } from '@/lib/utils/mapbox'
import { MAPBOX_STYLES } from '@/lib/constants/mapbox'
import { District } from '@/lib/types/districts'
```

### ❌ Avoid
```typescript
// Keeping everything in one large file
// Duplicating similar logic across files
// No clear separation of concerns
```

## Refactoring Triggers

Refactor immediately when:
- File exceeds **200 lines**
- Logic is **duplicated** elsewhere
- Function has **multiple responsibilities**
- Component renders **multiple unrelated things**

## Benefits
- **Maintainability**: Easier to update shared logic
- **Testing**: Isolated functions are easier to test
- **Reusability**: Code can be imported anywhere
- **Readability**: Smaller, focused files
- **Collaboration**: Team members can work on separate modules 
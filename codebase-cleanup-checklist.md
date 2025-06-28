# TSA Platform Codebase Cleanup Checklist

## 1. UI Component Consolidation

- [ ] Choose primary component library (recommend `/components/ui`)
- [ ] Consolidate Button components
  - [ ] Select one implementation
  - [ ] Migrate all usages to the chosen implementation
  - [ ] Remove redundant file
- [ ] Consolidate Badge components
  - [ ] Select one implementation
  - [ ] Migrate all usages to the chosen implementation
  - [ ] Remove redundant file
- [ ] Consolidate Input components
  - [ ] Select one implementation
  - [ ] Migrate all usages to the chosen implementation
  - [ ] Remove redundant file
- [ ] Consolidate Select components
  - [ ] Select one implementation
  - [ ] Migrate all usages to the chosen implementation
  - [ ] Remove redundant file
- [ ] Consolidate Table components
  - [ ] Select one implementation
  - [ ] Migrate all usages to the chosen implementation
  - [ ] Remove redundant file
- [ ] Consolidate Checkbox components
  - [ ] Select one implementation
  - [ ] Migrate all usages to the chosen implementation
  - [ ] Remove redundant file

## 2. Utility Function Centralization

- [ ] Create centralized date utility file (`lib/utils/dates.ts`)
  - [ ] Move all date formatting functions here
  - [ ] Standardize function signatures and return values
  - [ ] Implement flexible options for different formatting needs
  - [ ] Update imports across codebase
- [ ] Create centralized color/status utility file (`lib/utils/status.ts`)
  - [ ] Consolidate status color functions
  - [ ] Standardize return formats (consistent use of Tailwind classes)
  - [ ] Update imports across codebase
- [ ] Create centralized validation utility file (`lib/utils/validation.ts`)
  - [ ] Move email validation logic here
  - [ ] Move input sanitization functions here
  - [ ] Update imports across codebase

## 3. Type Definition Standardization

- [ ] Standardize Event interface
  - [ ] Create single source of truth in `lib/types/events.ts`
  - [ ] Remove duplicate definitions
  - [ ] Update imports across codebase
- [ ] Standardize Application types
  - [ ] Consolidate `Application` and `StudentApplication`
  - [ ] Create consistent naming patterns
  - [ ] Remove transformation code
- [ ] Standardize Onboarding/Invitation data types
  - [ ] Decide on consistent naming pattern (recommend camelCase)
  - [ ] Create single source of truth interfaces
  - [ ] Remove redundant transformation code
- [ ] Create common Address interface
  - [ ] Define standard address fields
  - [ ] Use across all entities that need addresses
- [ ] Standardize Status enums
  - [ ] Choose consistent case style (recommend UPPERCASE)
  - [ ] Define standardized enum names for common statuses
  - [ ] Update all status references

## 4. Service File Optimization

- [ ] Create centralized GraphQL operations
  - [ ] Organize operations by entity (user, event, application)
  - [ ] Remove duplicate operations from other files
  - [ ] Update imports across codebase
- [ ] Consolidate authentication logic
  - [ ] Create single auth service
  - [ ] Remove duplicate auth logic from components
  - [ ] Update imports across codebase
- [ ] Standardize data transformation patterns
  - [ ] Create consistent transformation utilities
  - [ ] Apply consistent naming conventions
  - [ ] Remove duplicate transformation code

## 5. Hook Consolidation

- [ ] Standardize authentication hooks
  - [ ] Create single useAuth hook
  - [ ] Remove duplicate auth state management
  - [ ] Update imports across codebase
- [ ] Standardize data fetching hooks
  - [ ] Create consistent patterns for data fetching
  - [ ] Use consistent error handling
  - [ ] Remove duplicate fetching logic

## 6. Project Organization

- [ ] Create clear component boundaries
  - [ ] Decide on feature vs. type organization
  - [ ] Update import patterns
  - [ ] Document component organization rules
- [ ] Document chosen patterns
  - [ ] Create style guide for future development
  - [ ] Document naming conventions
  - [ ] Document chosen component library

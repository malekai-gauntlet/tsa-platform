# Coach Section Improvements Checklist

## Overview

This document tracks the implementation of code quality improvements to the Coach section of the TSA platform, following patterns established in the onboarding improvements.

## Progress Tracking

### 1. GraphQL Client Standardization

- [x] Update `app/coach/events/[id]/page.tsx` to use typed GraphQL client
- [x] Update `app/coach/applications/components.tsx` to use applicationOperations (created refactored version)
- [x] Update `app/coach/applications/page.tsx` to use refactored components
- [x] Update `app/coach/events/create/page.tsx` to use standardized client
- [x] Remove duplicate API calls in useEffect hooks

### 2. Type Enforcement & Safety

- [x] Create shared types directory for coach section
- [x] Add types derived from Amplify Schema
- [x] Replace `any` types in useCoachProfile.ts
- [x] Add response typing for GraphQL operations
- [x] Enforce consistent prop interfaces

### 3. State Management Improvements

- [x] Create useCoachReducer hook for centralized state
- [x] Refactor event creation form to use useReducer
- [x] Implement validation with error states
- [x] Create custom useEventForm hook

### 4. Component Architecture Refactoring

- [x] Extract logical UI sections from events/[id]/page.tsx
- [x] Create separate component files (EventHeader, EventActions, RSVPSection)
- [x] Create separate component files for applications (ApplicationCard, StatusBadge)
- [x] Create shared utility functions for formatting and validation
- [x] Create component index files for easier imports
- [x] Create a working refactored applications page

### 5. Data Fetching Pattern Improvements

- [x] Create custom data fetching hooks for each entity
  - [x] useCoachProfile
  - [x] useCoachEvents
  - [x] useCoachApplications
- [x] Replace direct API calls in components (for applications component)
- [x] Implement loading UI components
- [x] Add consistent error handling
- [x] Add request cancellation on component unmount

### 6. Performance Optimization

- [x] Add memoization for expensive calculations
- [x] Fix dependency arrays in useEffect and useCallback hooks
- [x] Implement React.memo for pure components
- [x] Reduce unnecessary re-renders

### 7. Error Handling Standardization

- [x] Create standardized error handling approach
- [x] Add consistent error UI components (in applications.refactored)
- [x] Replace alerts with UI error messages
- [x] Implement user-friendly error messages

## Implementation Notes

- All improvements should maintain existing functionality
- Follow the patterns established in the onboarding improvements
- Ensure integration with the Amplify GraphQL schema
- Prioritize real issues over theoretical improvements

## Next Steps

We've made significant progress implementing improvements to the coach section:

1. ✅ Created foundational components and hooks
2. ✅ Updated useCoachProfile to use our enhanced version
3. ✅ Created refactored applications component as an example
4. ✅ Updated applications page to use our refactored components
5. ✅ Created refactored events view page with components
6. ✅ Updated hooks to use Amplify GraphQL client directly

To fully implement these improvements across the coach section:

1. ✅ Update the original applications component to use the refactored version
2. ✅ Refactor events/[id]/page.tsx to use our new components and hooks
3. ✅ Integrate directly with Amplify GraphQL instead of REST API
4. ✅ Implement the same patterns for event creation page
5. ✅ Update component imports to use the new index files

The refactored implementations maintain backward compatibility while providing improved type safety, error handling, and performance.

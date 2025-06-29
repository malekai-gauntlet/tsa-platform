/**
 * Coach Hooks Index
 *
 * This file exports all coach-related hooks for easier imports.
 *
 * @note When using these hooks, make sure to provide the proper parameters
 * and handle errors appropriately.
 */

// Export all coach hooks
export { default as useCoachReducer } from './useCoachReducer';
export { default as useCoachProfile } from './useCoachProfile';
export { default as useCoachEvents } from './useCoachEvents';
export { default as useCoachApplications } from './useCoachApplications';
export { default as useEventRSVPs } from './useEventRSVPs';
export { default as useEventInvitations } from './useEventInvitations';
export { default as useEventForm } from './useEventForm';

// Re-export types
export * from '@/lib/types/coach';

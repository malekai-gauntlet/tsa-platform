import { defineFunction } from '@aws-amplify/backend';
import { join } from 'path';

/**
 * Coach invite function definition
 * 
 * Note: For production deployment, we need to manually copy the shared libraries
 * that this function depends on. The current version of Amplify Gen 2 doesn't support
 * automatic inclusion of files outside the function directory.
 * 
 * Required shared libraries:
 * - lib/data-access/
 * - lib/validation/
 * - lib/types/
 */
export const coachInvite = defineFunction({
  name: 'coach-invite',
  entry: './handler.ts'
});

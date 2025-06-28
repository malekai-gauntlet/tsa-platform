import { defineFunction } from '@aws-amplify/backend';

export const coachInvite = defineFunction({
  name: 'coach-invite',
  entry: './handler.ts',
});

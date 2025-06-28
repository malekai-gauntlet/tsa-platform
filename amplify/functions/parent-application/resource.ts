import { defineFunction } from '@aws-amplify/backend';

export const parentApplication = defineFunction({
  name: 'parent-application',
  entry: './handler.ts',
});

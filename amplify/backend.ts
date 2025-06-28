import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { coachInvite } from './functions/coach-invite/resource.js';
import { parentApplication } from './functions/parent-application/resource.js';

const backend = defineBackend({
  auth,
  data,
  coachInvite,
  parentApplication,
});

// Removed geo stack configuration since we're using Mapbox GL JS for mapping
// The Current_Districts_2025.geojson file is served directly from /public

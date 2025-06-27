import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

const backend = defineBackend({
  auth,
  data,
});

// Removed geo stack configuration since we're using Mapbox GL JS for mapping
// The Current_Districts_2025.geojson file is served directly from /public

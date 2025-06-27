import { defineBackend } from '@aws-amplify/backend';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { CfnMap } from 'aws-cdk-lib/aws-location';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';

const backend = defineBackend({
  auth,
  data,
});

// Create a geo stack for location services
const geoStack = backend.createStack('geo-stack');

// Get environment-specific naming
const envName = process.env.AMPLIFY_BRANCH || 'sandbox';

// Create a location services map for districts
const map = new CfnMap(geoStack, 'DistrictsMap', {
  mapName: `tsa-districts-map-${envName}`,
  description: 'TSA Districts Visualization Map',
  configuration: {
    style: 'VectorEsriNavigation',
  },
  pricingPlan: 'RequestBasedUsage',
  tags: [
    {
      key: 'name',
      value: 'tsa-districts-map',
    },
    {
      key: 'project',
      value: 'tsa-platform',
    },
    {
      key: 'environment',
      value: envName,
    },
  ],
});

// Create an IAM policy to allow interacting with geo resources
const geoPolicy = new Policy(geoStack, 'GeoPolicy', {
  policyName: `tsa-geo-policy-${envName}`,
  statements: [
    new PolicyStatement({
      actions: [
        'geo:GetMapTile',
        'geo:GetMapSprites',
        'geo:GetMapGlyphs',
        'geo:GetMapStyleDescriptor',
      ],
      resources: [map.attrArn],
    }),
  ],
});

// Apply the policy to authenticated and unauthenticated roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(geoPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(geoPolicy);

// Add geo configuration to outputs
backend.addOutput({
  geo: {
    aws_region: geoStack.region,
    maps: {
      items: {
        [map.mapName]: {
          style: 'VectorEsriNavigation',
        },
      },
      default: map.mapName,
    },
  },
});

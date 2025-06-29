import { Amplify } from 'aws-amplify';

/**
 * Configure Amplify for backend/API route usage
 * Uses API key authentication for server-side operations
 */
export function configureAmplifyBackend() {
  try {
    // Load configuration from amplify_outputs.json
    let config;

    try {
      const path = require('path');
      const fs = require('fs');
      const configPath = path.join(process.cwd(), 'amplify_outputs.json');

      if (fs.existsSync(configPath)) {
        const configFile = fs.readFileSync(configPath, 'utf8');
        config = JSON.parse(configFile);
      } else {
        config = getBackendEnvironmentConfig();
      }
    } catch (error) {
      console.warn('Could not load amplify_outputs.json, using environment config:', error);
      config = getBackendEnvironmentConfig();
    }

    // Configure Amplify for server-side usage
    Amplify.configure(config, {
      ssr: true,
    });

    console.log('✅ Amplify backend configured successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to configure Amplify backend:', error);
    return false;
  }
}

/**
 * Get backend configuration from environment variables
 */
function getBackendEnvironmentConfig() {
  const apiKey =
    process.env.AMPLIFY_DATA_GRAPHQL_API_KEY ||
    process.env.NEXT_PUBLIC_AMPLIFY_DATA_GRAPHQL_API_KEY;
  const endpoint =
    process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT ||
    process.env.NEXT_PUBLIC_AMPLIFY_DATA_GRAPHQL_ENDPOINT;
  const region =
    process.env.AMPLIFY_REGION || process.env.NEXT_PUBLIC_AMPLIFY_REGION || 'us-east-1';

  if (!apiKey || !endpoint) {
    console.warn('⚠️ Missing required Amplify environment variables for backend config');
    console.warn('Required: AMPLIFY_DATA_GRAPHQL_API_KEY, AMPLIFY_DATA_GRAPHQL_ENDPOINT');
  }

  return {
    API: {
      GraphQL: {
        endpoint: endpoint,
        region: region,
        defaultAuthMode: 'apiKey',
        apiKey: apiKey,
      },
    },
  };
}

/**
 * Initialize Amplify for API routes if not already configured
 */
export function ensureAmplifyBackendConfig() {
  try {
    // Check if already configured
    const currentConfig = Amplify.getConfig();
    if (currentConfig?.API?.GraphQL?.endpoint) {
      return true;
    }
  } catch (error) {
    // Not configured yet, proceed to configure
  }

  return configureAmplifyBackend();
}

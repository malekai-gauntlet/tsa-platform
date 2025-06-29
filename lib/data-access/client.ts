/**
 * TSA Platform - Centralized Data Client
 * 
 * This module provides a centralized data client for use across
 * the application, including Lambda functions. It handles proper
 * configuration based on the runtime environment.
 */

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { AmplifyDataClient } from '../types/amplify-client';
import * as fs from 'fs';
import * as path from 'path';

// Cache the client instance
let clientInstance: AmplifyDataClient | null = null;

/**
 * Configure Amplify based on the runtime environment
 * - In Lambda, Amplify is automatically configured
 * - In local development, load configuration from amplify_outputs.json
 */
function configureAmplify(): boolean {
  try {
    // Skip configuration in Lambda environment (handled automatically)
    if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
      return true;
    }

    // For local development, try to load from outputs file
    try {
      // First check if file exists
      const configPath = path.join(process.cwd(), 'amplify_outputs.json');
      if (fs.existsSync(configPath)) {
        const config = require(configPath);
        Amplify.configure(config);
        return true;
      }
    } catch (configError) {
      console.warn('Could not load Amplify configuration from file:', configError);
    }

    // Fallback to environment variables if available
    const endpoint = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT;
    const apiKey = process.env.AMPLIFY_DATA_GRAPHQL_API_KEY;
    const region = process.env.AMPLIFY_REGION || 'us-east-1';

    if (endpoint && apiKey) {
      Amplify.configure({
        API: {
          GraphQL: {
            endpoint,
            region,
            defaultAuthMode: 'apiKey',
            apiKey,
          },
        },
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error during Amplify configuration:', error);
    return false;
  }
}

/**
 * Get a configured data client for accessing Amplify Data models
 * The client is cached for reuse across multiple operations
 */
export function getDataClient(options: { forceNew?: boolean } = {}): AmplifyDataClient {
  // Clear cached client if requested
  if (options.forceNew && clientInstance) {
    clientInstance = null;
  }

  // Create new client if needed
  if (!clientInstance) {
    // Ensure Amplify is configured first
    configureAmplify();
    
    // Generate the client
    try {
      clientInstance = generateClient<Schema>() as unknown as AmplifyDataClient;
    } catch (error) {
      console.error('Failed to generate Amplify Data client:', error);
      throw new Error('Could not initialize Amplify Data client. Please check your configuration.');
    }
  }

  return clientInstance;
}

/**
 * Returns whether the code is running in a Lambda environment
 */
export function isLambdaEnvironment(): boolean {
  return !!process.env.AWS_LAMBDA_FUNCTION_NAME;
}

/**
 * Explicitly configure Amplify with the given configuration
 * This is useful for testing or custom configuration scenarios
 */
export function configureAmplifyExplicitly(config: any): void {
  Amplify.configure(config);
  // Invalidate cached client to ensure it uses the new configuration
  clientInstance = null;
}
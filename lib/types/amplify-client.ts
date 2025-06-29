/**
 * Type definitions for Amplify Data Client
 * Used to provide type safety when working with Amplify Gen 2 data models
 */

/**
 * Generic model structure that Amplify models follow
 */
export interface AmplifyDataModel {
  create: (input: any) => Promise<{ data?: any; errors?: Array<{message: string}> }>;
  update: (input: {id: string; [key: string]: any}) => Promise<{ data?: any; errors?: Array<{message: string}> }>;
  delete: (input: {id: string}) => Promise<{ data?: any; errors?: Array<{message: string}> }>;
  get: (input: {id: string}) => Promise<{ data?: any; errors?: Array<{message: string}> }>;
  list: (input?: {filter?: any; limit?: number}) => Promise<{ data?: any[]; errors?: Array<{message: string}> }>;
}

/**
 * Structure of the Amplify Data Client models
 */
export interface AmplifyDataModels {
  [key: string]: AmplifyDataModel;
  Invitation: AmplifyDataModel;
}

/**
 * Structure of the Amplify Data Client
 */
export interface AmplifyDataClient {
  models: AmplifyDataModels;
}
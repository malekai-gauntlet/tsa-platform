// Environment configuration
export const config = {
  environment: process.env.NODE_ENV || 'development',
  amplifyConfig: {
    // Add your Amplify configuration here
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  }
} 
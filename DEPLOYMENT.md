# Deployment Guide: Coach Invite Feature

This guide covers the production deployment process for the Coach Invite feature, which uses a modular architecture with separate data access and validation layers.

## Project Architecture

The project uses a clean, modular architecture with these key components:

- **Lambda function**: `amplify/functions/coach-invite/handler.ts`
- **Data access layer**: `lib/data-access/` - Handles database operations with environment detection
- **Validation utilities**: `lib/validation/` - Provides input validation and formatting
- **Type definitions**: `lib/types/` - Contains TypeScript interfaces for better type safety

## Production Deployment

### 1. Function Configuration

The current version of Amplify Gen 2 doesn't directly support bundling external files. Instead, we use a custom pre-deployment script that copies the required files to the function directory:

```typescript
// amplify/functions/coach-invite/resource.ts
import { defineFunction } from '@aws-amplify/backend';

export const coachInvite = defineFunction({
  name: 'coach-invite',
  entry: './handler.ts'
});
```

### 2. Preparing for Deployment

Before deployment, run the preparation script that copies shared modules to the function directory:

```bash
node scripts/prepare-lambda-deploy.js
```

This script:
- Copies `lib/data-access/` to the function directory
- Copies `lib/validation/` to the function directory
- Copies `lib/types/` to the function directory

The deployment script runs this automatically.

### 3. Pre-Deployment Testing

Before deploying to production, test the function locally:

```bash
# Start the Amplify sandbox environment
npx ampx sandbox

# Run validation tests
node scripts/test-invitation-modules.js

# Test the API integration
node scripts/test-coach-invite-api.js
```

Make sure all tests pass before proceeding to production deployment.

### 4. Production Deployment

To deploy to production:

```bash
# Deploy to production
npx ampx push
```

This command:
1. Builds your Lambda function with TypeScript compilation
2. Bundles all dependencies, including shared libraries specified in `includePaths`
3. Deploys the function to AWS
4. Updates your Amplify backend configuration

### 4. Verify Production Deployment

After deployment completes, verify the function works as expected in production:

```bash
# Check logs for any errors
npx ampx logs coach-invite

# Monitor the CloudWatch logs
aws cloudwatch get-log-events --log-group-name "/aws/lambda/amplify-${APP_ID}-${ENV_NAME}-coach-invite" --log-stream-name "latest"
```

## Environment Management

One of the key features of this implementation is its ability to adapt automatically based on the runtime environment:

### Local Development

When running in local development mode, the data client:
1. First attempts to load configuration from `amplify_outputs.json`
2. Falls back to environment variables if the file isn't available
3. Uses the local Amplify sandbox for development

```typescript
// From lib/data-access/client.ts
function configureAmplify(): boolean {
  // Skip configuration in Lambda environment (handled automatically)
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return true;
  }

  // For local development, try to load from outputs file
  try {
    const configPath = path.join(process.cwd(), 'amplify_outputs.json');
    if (fs.existsSync(configPath)) {
      const config = require(configPath);
      Amplify.configure(config);
      return true;
    }
  } catch (configError) {
    console.warn('Could not load Amplify configuration from file:', configError);
  }
}
```

### Lambda Environment (Production)

In the Lambda/production environment:
1. The code detects the Lambda environment using `process.env.AWS_LAMBDA_FUNCTION_NAME`
2. It skips manual Amplify configuration since AWS handles this automatically
3. GraphQL client operations work seamlessly without additional setup

## Troubleshooting Production Deployments

### Common Issues and Solutions

1. **"Missing module" or Import Errors**:
   - Verify all required directories are included in `includePaths`
   - Check relative paths in import statements match the bundled structure
   - Make sure TypeScript compilation is targeting the correct ECMAScript version

2. **"Client could not be generated" Errors**:
   - This usually indicates an issue with Amplify configuration
   - Check if the Lambda function has the correct IAM permissions to access AppSync
   - Verify the GraphQL schema is deployed correctly
   - Inspect CloudWatch logs for more detailed error messages

3. **Data Access Permission Issues**:
   - Check IAM policies for the Lambda execution role
   - Ensure the function has permissions for all required data operations
   - Look for access denied errors in the CloudWatch logs

### Monitoring and Debugging

Amplify Gen 2 provides several tools for monitoring and debugging Lambda functions:

```bash
# View function logs (most recent first)
npx ampx logs coach-invite --tail

# Check function status and configuration
npx ampx status

# Test function with specific input
npx ampx invoke coach-invite --payload '{"arguments":{"name":"Test"}}'
```

Use CloudWatch Logs Insights for more advanced log analysis:

```
fields @timestamp, @message
| filter @message like /ERROR/ or @message like /error/
| sort @timestamp desc
| limit 100
```

## CI/CD Integration

For automated deployments, add these commands to your CI/CD pipeline:

```yaml
steps:
  - name: Install dependencies
    run: npm ci
  
  - name: Run tests
    run: |
      npx ampx sandbox &
      sleep 10  # Wait for sandbox to start
      node scripts/test-invitation-modules.js
  
  - name: Deploy to Amplify
    run: npx ampx push --yes
```

## Disaster Recovery

In case of deployment issues:

```bash
# Roll back to the previous working version
npx ampx rollback

# View deployment history
npx ampx history
```

## Security Best Practices

- **Least Privilege Access**: The Lambda function uses role-based permissions with minimal access
- **Input Validation**: All inputs are thoroughly validated before processing
- **Error Handling**: Errors are caught and handled properly without leaking sensitive information
- **Environment Detection**: The code automatically adapts based on the execution environment
- **No Credentials in Code**: All authentication is handled through Amplify and AWS IAM
- **Regular Updates**: Keep dependencies updated to address security vulnerabilities
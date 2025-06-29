# Production Deployment Guide

This document outlines the process for deploying the TSA Platform Coach Invite feature to production.

## Production-Ready Features

The coach invite feature has been refactored and prepared for production deployment with:

1. **Modular Architecture**
   - Separated data access layer in `lib/data-access/`
   - Validation utilities in `lib/validation/`
   - Type definitions in `lib/types/`
   - Pre-deployment script for copying shared libraries

2. **Environment-Aware Configuration**
   - Automatic detection of Lambda environment
   - Different configuration approaches for local vs. production
   - Robust error handling for configuration failures

3. **Robust Error Handling**
   - Structured error responses
   - Detailed logging for debugging
   - Graceful fallbacks

4. **Comprehensive Testing**
   - Unit tests for validation functions
   - API integration tests
   - Pre-deployment validation

## Deployment Process

### 1. Quick Deploy

To deploy to production with a single command:

```bash
npm run deploy:prod
```

This script:
- Verifies TypeScript compilation
- Runs all tests
- Prepares the Lambda function by copying shared libraries
- Deploys to production

### 2. Preview Mode

To validate changes without deploying:

```bash
npm run deploy:preview
```

### 3. Manual Deployment Steps

For a more controlled deployment:

1. Run validation tests:
```bash
npm run test:functions
```

2. Test API integration:
```bash
npm run test:api
```

3. Prepare the Lambda function:
```bash
node scripts/prepare-lambda-deploy.js
```

4. Deploy to production:
```bash
npx ampx push
```

5. Verify deployment:
```bash
npx ampx logs coach-invite
```

## Configuration Files

- **`.env.production`** - Production environment variables
- **`amplify/functions/coach-invite/resource.ts`** - Lambda function configuration
- **`DEPLOYMENT.md`** - Complete deployment documentation

## Monitoring and Maintenance

### Viewing Logs

```bash
npm run amplify:logs
# or
npx ampx logs coach-invite --tail
```

### Rollback Procedure

If issues occur after deployment:

```bash
npx ampx rollback
```

## Security Considerations

- **Input Validation**: All user inputs are validated before processing
- **Error Handling**: Errors are caught without exposing sensitive information
- **Environment Detection**: Code adapts based on execution environment
- **IAM Permissions**: Function uses least-privilege permissions
- **No Hard-coded Secrets**: All authentication handled through AWS IAM

## Next Steps

After deployment, consider:

1. Setting up CloudWatch alarms for error monitoring
2. Creating a CI/CD pipeline for automated deployments
3. Implementing a staging environment for pre-production testing
4. Adding more comprehensive end-to-end tests
# Coach Invitation Guide

This guide explains how to send coach invitations in production using the TSA Platform.

## Prerequisites

Before inviting coaches to the production environment, ensure you have:

1. **Production `amplify_outputs.json` file** - This contains all necessary configuration for connecting to your production environment.
2. **Appropriate permissions** - Make sure your AWS credentials have permission to call the GraphQL API.

## Inviting Coaches to Production

### Method 1: Using the Interactive CLI Tool

We've created a dedicated tool for sending production invitations:

```bash
# Run the interactive invitation tool
npm run invite-coach:prod

# Or directly
node scripts/prod-invite-coach.js --interactive
```

This will:
1. Prompt you for all coach information
2. Validate the data
3. Send the invitation through the production API
4. Display the invitation link that can be shared with the coach

### Method 2: Using Command Line Arguments

For batch processing or scripting, you can provide all information as command-line arguments:

```bash
node scripts/prod-invite-coach.js \
  --name="Coach Full Name" \
  --email="coach@example.com" \
  --phone="+12345678901" \
  --location="Austin, TX" \
  --d1=5 \
  --bio="Coach biography with relevant experience"
```

### Method 3: Batch Invitations

For sending multiple invitations at once, use the seed script with the production configuration:

```bash
# Make sure to have the production amplify_outputs.json in place
npm run seed-invitations -- --count 3
```

## The Invitation Process

1. When you send an invitation:
   - A record is created in the database with status `PENDING`
   - An invitation token is generated

2. The coach receives an invitation link:
   - Format: `https://your-domain.com/onboarding?invite=TOKEN`
   - This token is used to verify the coach's identity and pre-fill information

3. The coach completes the onboarding process:
   - Information from the invitation is pre-filled
   - The coach confirms or updates this information
   - The coach creates an account and sets up their profile

## Troubleshooting

If you encounter issues with coach invitations:

1. **Configuration Issues**:
   - Ensure your `amplify_outputs.json` file is for the production environment
   - Check that you have the necessary AWS credentials set

2. **API Errors**:
   - "No federated jwt" - You might need to authenticate or use the correct API key
   - "Client could not be generated" - Check your Amplify configuration

3. **Validation Errors**:
   - All coach information must meet validation requirements
   - Phone numbers should include country code (e.g., +12345678901)
   - Bio must be at least 10 characters

For more help, check the logs or contact the development team.

## Invitation Link Format

When a coach is successfully invited, you'll receive an invitation token. The complete URL to share with the coach will be:

```
https://your-production-domain.com/onboarding?invite=INVITATION_TOKEN
```

Replace `your-production-domain.com` with your actual production domain and `INVITATION_TOKEN` with the token received from the invitation process.
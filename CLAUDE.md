# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment Setup

### Prerequisites

- Node.js 18+ and npm
- AWS CLI configured
- Mapbox account with access token
- Amplify CLI v12.5.1+ (`npm install -g @aws-amplify/cli`)

### Environment Variables

Create `.env.local` from `env.example` and add your Mapbox token:

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token_here
```

## Commands

### Development

```bash
# Install dependencies
npm install

# Start the Amplify backend sandbox
npx ampx sandbox

# Start the development server
npm run dev

# Lint code
npm run lint

# Test pages
npm run test:pages
```

### Deployment

```bash
# Development deployment
npm run deploy:dev

# Check Amplify status
npm run amplify:status

# Deploy backend changes
npm run amplify:push

# Full production deployment
amplify push && amplify publish
```

## Architecture Overview

### Frontend

- **Next.js (App Router)** with TypeScript
- **Mapbox GL JS** for interactive mapping
- **TailwindCSS** for styling with custom components from Radix UI

### Backend

- **AWS Amplify Gen2** providing:
  - Authentication (Cognito)
  - Data (AppSync GraphQL API with DynamoDB)
  - Functions (Lambda)

### Key Features

- Interactive TSA Districts map with vector tiles
- Role-based authentication (admin, coach, parent)
- Coach onboarding workflow
- Event management system
- Student enrollment process

## Project Structure

```
tsa-platform/
├── amplify/              # AWS Amplify backend configuration
│   ├── auth/            # Authentication resources
│   ├── data/            # GraphQL API schema and resources
│   └── functions/       # Lambda functions
├── app/                 # Next.js app directory
│   ├── coach/           # Coach dashboard pages
│   ├── map/             # Mapbox map implementation
│   ├── onboarding/      # User onboarding flow
│   ├── layout.tsx       # Root layout with Amplify config
│   └── page.tsx         # Main platform page
├── lib/                 # Shared utilities and components
│   ├── components/      # Reusable UI components
│   ├── constants/       # Configuration constants
│   └── utils/           # Helper functions
├── public/              # Static assets including GeoJSON data
└── scripts/             # Deployment and utility scripts
```

## Data Models

The application uses a comprehensive data schema that includes:

- User management (User, Profile)
- Events & Sessions
- Enrollments & Applications
- Invitations system
- Payments & Tuition tracking
- EdFi-compliant educational data models

## Map Implementation

The interactive map uses Mapbox GL JS with vector tiles:

- Map configuration in `lib/constants/mapbox.ts`
- Map implementation in `app/map/page.tsx`
- Map utilities in `lib/utils/mapUtils.ts`
- TSA District boundaries from GeoJSON in `public/Current_Districts_2025.geojson`

## Authentication Flow

- Amplify Authentication with Cognito
- Email-based user signup/signin
- Role-based access control via groups
- Protected routes via ClientWrapper component

## Common Development Workflows

### Adding New Pages

1. Create new page component in the appropriate directory under `app/`
2. Update navigation components if needed
3. Add route to test script in `scripts/test-pages.js`

### Updating Backend Schema

1. Modify schema in `amplify/data/resource.ts`
2. Push changes with `npm run amplify:push`

### Working with Environment Variables

1. Add new variables to `env.example`
2. Update `.env.local` with actual values
3. Reference in code with `process.env.VARIABLE_NAME`

### Running Tests

- Use `npm run test:pages` to validate all pages load correctly
- The test script checks for proper rendering and no errors

### Adding New Lambda Functions

1. Create a new directory under `amplify/functions/`
2. Add `resource.ts` and `handler.ts` files
3. Update `amplify/backend.ts` to include the new function

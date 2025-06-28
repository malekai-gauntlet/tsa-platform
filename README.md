## TSA Platform

This repository provides a TSA (Transportation Security Administration) platform application built with **Next.js**, **Mapbox GL JS** for interactive mapping, and **AWS Amplify** for backend infrastructure.

## Architecture

- **Frontend**: Next.js (App Router) with TypeScript
- **Mapping**: Mapbox GL JS for superior geo-spatial visualization
- **Backend**: AWS Amplify (Authentication, Data, Functions)
- **Data**: TSA Districts 2025 GeoJSON for district boundaries

## Overview

This TSA Platform combines the best of both worlds: **Mapbox's industry-leading mapping capabilities** for visualizing TSA district boundaries with **AWS Amplify's powerful backend services** for authentication, data management, and serverless functions.

## Quick Start

### Prerequisites

- **Mapbox Account**: Sign up at [mapbox.com](https://account.mapbox.com/) for mapping services
- Node.js 18+ and npm
- AWS CLI configured
- Amplify CLI v12.5.1+ (`npm install -g @aws-amplify/cli`)

### Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure Mapbox (REQUIRED)
cp env.example .env.local
# Add your Mapbox token: NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_token

# 3. Start the backend sandbox
npx ampx sandbox

# 4. Start the development server
npm run dev
```

Visit `http://localhost:3000` to view the platform and `http://localhost:3000/map` for the interactive TSA Districts map.

## Features

- **🗺️ Interactive Mapping**: Powered by Mapbox GL JS with globe projection and 3D atmosphere
- **📍 TSA Districts Visualization**: 2025 district boundaries with interactive popups
- **🔐 Authentication**: Secure user authentication with Amazon Cognito
- **📊 Data Management**: Real-time database powered by Amazon DynamoDB
- **⚡ Serverless API**: GraphQL endpoint with AWS AppSync
- **🎯 Click Interactions**: District information on map click
- **📱 Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
tsa-platform/
├── amplify/              # AWS Amplify backend configuration
│   ├── auth/            # Authentication resources
│   ├── data/            # Data/API resources
│   └── backend.ts       # Backend definition
├── app/                 # Next.js app directory
│   ├── map/            # Mapbox map page and components
│   ├── layout.tsx      # Root layout with Amplify configuration
│   └── page.tsx        # Main platform page
├── public/
│   └── Current_Districts_2025.geojson  # TSA districts data
├── scripts/
│   └── deploy-dev.sh   # Development deployment script
├── DEPLOYMENT.md       # Comprehensive deployment guide
└── env.example        # Environment variables template
```

## Environment Variables

Copy `env.example` to `.env.local` and configure:

```bash
# Required: Mapbox token for maps to work
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_public_token_here
```

**Get your Mapbox token:**

1. Sign up at [Mapbox](https://account.mapbox.com/)
2. Go to [Access Tokens](https://account.mapbox.com/access-tokens/)
3. Copy your default public token (starts with `pk.`)

## Map Features

### Current Implementation

- **Data Source**: TSA Districts 2025 GeoJSON (~71MB)
- **Rendering**: Client-side with Mapbox GL JS
- **Interactions**: Click for district info, hover effects
- **Styling**: Custom TSA blue color scheme
- **Performance**: Optimized for modern browsers

### Map Controls

- **Navigation**: Zoom in/out, rotate, tilt
- **Fullscreen**: Full browser window mode
- **Globe View**: 3D atmosphere when zoomed out
- **District Info**: Click any district for details

## Deployment

For complete deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy to AWS

```bash
# Deploy backend and frontend
npm run deploy:dev  # Development
# OR
amplify push && amplify publish  # Production
```

### Environment Variables in Production

In Amplify Console → App Settings → Environment Variables:

- Add: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` = `pk.your_token`

## Vector Tiles Options

For production optimization, consider these approaches:

### Option 1: Current GeoJSON (Recommended for Most Cases)

- ✅ Simple setup, no additional costs
- ✅ Full styling control
- ✅ Good performance for this data size

### Option 2: Mapbox Tiling Service (High Traffic)

```bash
npm install -g @mapbox/mapbox-cli
mapbox upload username.tsa-districts ./public/Current_Districts_2025.geojson
```

### Option 3: Tippecanoe (Open Source)

```bash
brew install tippecanoe
tippecanoe -o tsa-districts.mbtiles --maximum-zoom=12 public/Current_Districts_2025.geojson
```

## Development

### Best Practices

1. **Hybrid Architecture**: Mapbox for mapping excellence + Amplify for backend power
2. **Environment Management**: Automatic configuration via `amplify_outputs.json`
3. **Error Handling**: Graceful fallbacks for missing tokens/data
4. **Performance**: Optimized for large geo-spatial datasets
5. **Security**: Environment variables, proper token management

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run deploy:dev` - Run development deployment script
- `npm run sandbox` - Start Amplify sandbox

## Monitoring

- **Mapbox Usage**: [Mapbox Statistics](https://account.mapbox.com/statistics/)
- **AWS Resources**: Amplify Console + CloudWatch
- **Performance**: Browser DevTools Network tab

## Troubleshooting

### Map Not Loading

- Verify Mapbox token in `.env.local`
- Check token starts with `pk.`
- Check browser console for errors

### Districts Not Appearing

- Ensure file is at `/public/Current_Districts_2025.geojson`
- Zoom to level 3+ to see districts
- Check Network tab for 404 errors

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## Security

See [CONTRIBUTING.md](CONTRIBUTING.md#security-issue-notifications) for security information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

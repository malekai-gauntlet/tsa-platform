# TSA Platform Deployment Guide

This guide follows best practices for deploying the TSA Platform with **Mapbox** for geo-spatial visualization and **AWS Amplify** for backend infrastructure.

## Architecture Overview

- **Frontend**: Next.js with Mapbox GL JS for interactive mapping
- **Backend**: AWS Amplify (Auth, Data, Functions)
- **Mapping**: Mapbox for superior mapping experience and TSA districts visualization
- **Data**: TSA Districts 2025 GeoJSON served client-side

## Prerequisites

1. **Mapbox Account** and access token from [Mapbox Studio](https://studio.mapbox.com/)
2. **AWS CLI** configured with appropriate permissions
3. **Node.js** 18+ and npm
4. **Amplify CLI** v12.5.1 or higher (`npm install -g @aws-amplify/cli`)

## Initial Setup

### 1. Clone and Install Dependencies

```bash
git clone <your-repo>
cd tsa-dashboard
npm install
```

### 2. Configure Environment Variables

```bash
# Copy the example file
cp env.example .env.local

# Add your Mapbox token (REQUIRED for maps to work)
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_public_token_here
```

**Get your Mapbox token:**
1. Sign up at [Mapbox](https://account.mapbox.com/)
2. Go to [Access Tokens](https://account.mapbox.com/access-tokens/)
3. Copy your default public token (starts with `pk.`)

## Backend Deployment

### Option 1: Sandbox Development (Recommended for Development)

```bash
# Start the sandbox environment
npx ampx sandbox

# This will:
# - Deploy backend resources
# - Generate amplify_outputs.json
# - Enable hot-reloading for backend changes
```

### Option 2: Full Deployment

```bash
# Initialize Amplify (first time only)
amplify init

# Deploy all resources
amplify push
```

## Frontend Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:3000
# Map will be available at http://localhost:3000/map
```

## Production Deployment

### Deploy to Amplify Hosting

1. **Connect Repository**
   ```bash
   amplify add hosting
   amplify publish
   ```

2. **Or use Amplify Console**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Add environment variable: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`

### Environment Variables in Production

In Amplify Console:
1. Go to App Settings > Environment Variables
2. Add: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` = `pk.your_token`

## Vector Tiles for TSA Districts

### Current Implementation: Client-Side GeoJSON

**Pros:**
- ✅ Simple setup
- ✅ No additional Mapbox costs
- ✅ Full control over styling

**Current Setup:**
```javascript
// Automatically loads TSA districts data
map.addSource('tsa-districts', {
  'type': 'geojson',
  'data': '/Current_Districts_2025.geojson'
});
```

### Production Optimization Options

#### Option 1: Mapbox Tiling Service (Recommended for High Traffic)

1. **Upload to Mapbox Studio**
   ```bash
   # Install Mapbox CLI
   npm install -g @mapbox/mapbox-cli

   # Upload the tileset
   mapbox upload your-username.tsa-districts ./public/Current_Districts_2025.geojson
   ```

2. **Update map to use vector tiles**
   ```javascript
   map.addSource('tsa-districts', {
     'type': 'vector',
     'url': 'mapbox://your-username.tsa-districts'
   });
   ```

#### Option 2: Tippecanoe + CDN (Open Source)

1. **Generate vector tiles**
   ```bash
   brew install tippecanoe
   tippecanoe -o tsa-districts.mbtiles \
     --maximum-zoom=12 \
     --minimum-zoom=1 \
     --layer=districts \
     public/Current_Districts_2025.geojson
   ```

2. **Host on CDN** (CloudFront, etc.)

#### Option 3: Keep GeoJSON (Current - Good for Most Use Cases)

The current implementation is efficient for most use cases:
- File is ~71MB but served once and cached
- Modern browsers handle it well
- No additional Mapbox tile costs

## Performance Considerations

### Map Optimization

- **Zoom-based filtering**: Only show districts at appropriate zoom levels
- **Clustering**: For high-density point data
- **Progressive loading**: Load districts by region

### Mapbox Best Practices

- Use appropriate zoom levels to minimize API calls
- Implement proper error handling for network issues
- Cache map styles for offline capability

## Monitoring and Costs

### Mapbox Usage Monitoring

- **Statistics**: Visit [Mapbox Statistics](https://account.mapbox.com/statistics/)
- **Billing**: Monitor your [Mapbox usage](https://account.mapbox.com/billing/)

### AWS Amplify Monitoring

- **Statistics**: AWS Amplify Console
- **CloudWatch**: Backend monitoring

## Troubleshooting

### Common Issues

1. **Map not loading**
   - Check Mapbox access token in environment variables
   - Verify token is public (starts with `pk.`)
   - Check browser console for errors

2. **TSA Districts not appearing**
   - Verify `Current_Districts_2025.geojson` is in `/public` directory
   - Check network tab for 404 errors
   - Zoom to appropriate level (districts appear at zoom 3+)

3. **amplify_outputs.json not found**
   - Run `npx ampx sandbox` or `amplify push`
   - Ensure backend deployment completed successfully

## Security Best Practices

1. **Mapbox Tokens**: Use public tokens only, restrict domains in production
2. **AWS IAM**: Follow principle of least privilege
3. **Environment Variables**: Never commit tokens to Git
4. **CORS**: Configure appropriate CORS settings

## Next Steps

1. Set up Mapbox token domain restrictions
2. Implement map performance monitoring
3. Add data refresh mechanisms
4. Set up CI/CD pipelines
5. Configure custom domains 
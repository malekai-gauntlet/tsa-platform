# Vector Tiles Setup for TSA Platform

This guide explains how to create and use vector tiles with Mapbox for the TSA Districts map.

## Prerequisites

1. A Mapbox account with access to Mapbox Tiling Service
2. GeoJSON data file (`Current_Districts_2025.geojson`)
3. Mapbox CLI tools installed

## Step 1: Install Mapbox CLI Tools

```bash
npm install -g @mapbox/mapbox-tiling-service-cli
```

## Step 2: Authenticate with Mapbox

```bash
mapbox login
```

## Step 3: Upload GeoJSON as a Tileset Source

```bash
# Using username: danielmotta7
mapbox tilesets create-source danielmotta7.tsa-districts-source \
  --file ./public/Current_Districts_2025.geojson
```

## Step 4: Create a Tileset Recipe

Create a file named `recipe.json` with the following content:

```json
{
  "version": 1,
  "layers": {
    "districts": {
      "source": "mapbox://tileset-source/danielmotta7/tsa-districts-source",
      "minzoom": 0,
      "maxzoom": 10
    }
  }
}
```

## Step 5: Create and Publish the Tileset

```bash
# Create tileset
mapbox tilesets create danielmotta7.tsa-districts \
  --recipe recipe.json \
  --name "TSA Districts 2025"

# Publish tileset
mapbox tilesets publish danielmotta7.tsa-districts

# Check status
mapbox tilesets status danielmotta7.tsa-districts
```

## Step 6: Get Source Layer Name

After publishing, get the source layer name:

```bash
mapbox tilesets tilejson danielmotta7.tsa-districts
```

Look for the vector_layers[].id value in the output.

## Step 7: Update Configuration in Code

Update the vector tiles configuration in `lib/constants/mapbox.ts`:

```typescript
export const vectorTiles = {
  // Replace with your tileset ID
  tilesetId: 'danielmotta7.tsa-districts',
  // Replace with the source layer name from Step 6
  sourceLayer: 'districts', // This may be different, check the tilejson output
};
```

## Current Configuration

The current implementation uses:

- tilesetId: `blackbirddash.dbg7wg1v`
- sourceLayer: `Current_Districts_2025-a8192i`

## Troubleshooting

1. If you see error messages in console related to vector tiles:
   - Verify the access token has correct permissions
   - Check that the tileset exists and is published
   - Confirm the sourceLayer name is exactly correct

2. No map or districts appearing:
   - Check browser console for errors
   - Verify the .env.local file contains the correct token
   - Try using a public Mapbox style first to verify token works

3. Performance issues:
   - Consider optimizing the GeoJSON before upload
   - Adjust the maxzoom level in the recipe to appropriate detail level

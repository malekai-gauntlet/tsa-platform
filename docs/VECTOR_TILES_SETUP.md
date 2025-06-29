# Vector Tiles Setup Guide

This document explains how to configure and use vector tiles with Mapbox in the TSA Platform.

## Overview

Vector tiles provide efficient, scalable map rendering by delivering geographic data in small, compressed packages. The TSA Platform uses Mapbox GL JS with custom vector tile sources for optimal performance.

## Configuration

### Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token_here
NEXT_PUBLIC_MAPBOX_STYLE_URL=mapbox://styles/your-username/your-style-id
```

### Mapbox Style Configuration

1. **Create a custom Mapbox style** in your Mapbox Studio account
2. **Configure data sources** for your vector tiles
3. **Set up styling layers** for different geographic features
4. **Publish the style** and copy the style URL

## Implementation

### Basic Map Setup

```typescript
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Set the access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

// Initialize the map
const map = new mapboxgl.Map({
  container: 'map-container',
  style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!,
  center: [-98.5795, 39.8283], // Center of US
  zoom: 4,
});
```

### Adding Custom Vector Tile Sources

```typescript
map.on('load', () => {
  // Add a vector tile source
  map.addSource('custom-data', {
    type: 'vector',
    tiles: ['https://your-domain.com/tiles/{z}/{x}/{y}.pbf'],
    minzoom: 0,
    maxzoom: 14,
  });

  // Add a layer using the vector tiles
  map.addLayer({
    id: 'custom-layer',
    type: 'fill',
    source: 'custom-data',
    'source-layer': 'your-layer-name',
    paint: {
      'fill-color': '#088',
      'fill-opacity': 0.8,
    },
  });
});
```

### Interactive Features

```typescript
// Add click handlers for vector tile features
map.on('click', 'custom-layer', e => {
  const features = e.features;
  if (features && features.length > 0) {
    const feature = features[0];

    // Show popup with feature information
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `
        <div>
          <h3>${feature.properties.name}</h3>
          <p>${feature.properties.description}</p>
        </div>
      `
      )
      .addTo(map);
  }
});

// Change cursor on hover
map.on('mouseenter', 'custom-layer', () => {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'custom-layer', () => {
  map.getCanvas().style.cursor = '';
});
```

## Vector Tile Generation

### Using Tippecanoe (Recommended)

```bash
# Install tippecanoe
brew install tippecanoe

# Convert GeoJSON to vector tiles
tippecanoe -o output.mbtiles \
  --maximum-zoom=14 \
  --minimum-zoom=0 \
  --layer=your-layer-name \
  input.geojson

# Extract tiles to directory structure
mb-util output.mbtiles tiles --image_format=pbf
```

### Tile Server Setup

For production, consider using:

- **Tileserver GL**: Open-source tile server
- **PostGIS + pg_tileserv**: For PostgreSQL/PostGIS data
- **Martin**: Rust-based tile server
- **Mapbox Tiling Service**: Hosted solution

Example with Tileserver GL:

```bash
# Install tileserver-gl
npm install -g tileserver-gl

# Serve tiles
tileserver-gl-light --file output.mbtiles
```

## Performance Optimization

### Tile Caching

```typescript
// Configure tile caching
map.addSource('cached-tiles', {
  type: 'vector',
  tiles: ['https://your-domain.com/tiles/{z}/{x}/{y}.pbf'],
  minzoom: 0,
  maxzoom: 14,
  // Enable tile caching
  scheme: 'xyz',
  tileSize: 512,
});
```

### Layer Filtering

```typescript
// Use expressions for efficient filtering
map.setFilter('custom-layer', ['all', ['>=', 'population', 10000], ['<=', 'population', 100000]]);
```

### Clustering for Point Data

```typescript
map.addSource('points', {
  type: 'vector',
  tiles: ['https://your-domain.com/points/{z}/{x}/{y}.pbf'],
  cluster: true,
  clusterMaxZoom: 14,
  clusterRadius: 50,
});

// Add cluster circles
map.addLayer({
  id: 'clusters',
  type: 'circle',
  source: 'points',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
});
```

## Data Preparation

### GeoJSON Optimization

```javascript
// Simplify geometries to reduce file size
const turf = require('@turf/turf');

function optimizeGeoJSON(geojson) {
  return {
    ...geojson,
    features: geojson.features.map(feature => ({
      ...feature,
      geometry: turf.simplify(feature.geometry, { tolerance: 0.001 }),
    })),
  };
}
```

### Property Selection

```bash
# Use mapshaper to reduce properties and simplify
mapshaper input.geojson \
  -filter-fields name,population,category \
  -simplify 0.1% \
  -o output.geojson
```

## Troubleshooting

### Common Issues

1. **Tiles not loading**
   - Check access token validity
   - Verify tile URL format
   - Check CORS headers on tile server

2. **Performance issues**
   - Reduce maximum zoom level
   - Simplify geometries
   - Use appropriate tile sizes

3. **Styling problems**
   - Verify source-layer names
   - Check data properties
   - Use Mapbox Studio for debugging

### Debug Tools

```typescript
// Log tile loading events
map.on('sourcedata', e => {
  if (e.sourceId === 'your-source' && e.isSourceLoaded) {
    console.log('Source loaded:', e.sourceId);
  }
});

// Log errors
map.on('error', e => {
  console.error('Map error:', e);
});

// Show tile boundaries for debugging
map.showTileBoundaries = true;
```

## Production Considerations

### CDN Configuration

- Use a CDN for tile delivery
- Configure appropriate cache headers
- Consider using a tile cache like Varnish

### Monitoring

- Monitor tile request patterns
- Track loading performance
- Set up alerts for tile service availability

### Security

- Implement rate limiting on tile endpoints
- Use signed URLs for sensitive data
- Validate zoom/x/y parameters

## Example Implementation

```typescript
// components/Map.tsx
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

interface MapProps {
  onFeatureClick?: (feature: any) => void;
}

export function Map({ onFeatureClick }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!,
      center: [-98.5795, 39.8283],
      zoom: 4
    });

    map.current.on('load', () => {
      // Add your vector tile sources and layers here
      setupVectorTiles(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const setupVectorTiles = (mapInstance: mapboxgl.Map) => {
    // Implementation specific to your data
  };

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
```

This setup provides a solid foundation for using vector tiles in the TSA Platform with optimal performance and scalability.

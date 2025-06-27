// Map configuration constants
export const MAP_CONFIG = {
  // Default map position (centered on Texas)
  center: [-99.9, 31.5] as [number, number],
  zoom: 6,
  projection: 'globe' as const,
} as const;

// Vector tiles configuration
// Based on Mapbox Vector Tiles API: https://docs.mapbox.com/api/maps/vector-tiles/
export const VECTOR_TILES = {
  // Tileset ID follows format: username.id
  tilesetId: 'blackbirddash.dbg7wg1v',
  // Source layer within the tileset (must match uploaded data)
  sourceLayer: 'Current_Districts_2025-a8192i',
  // API Performance Notes:
  // - Rate limit: 100,000 requests/minute
  // - Caching: 12 hours device cache, 5 minutes CDN cache
  // - Format: Vector tiles (.mvt) for optimal performance vs GeoJSON
} as const;

// District styling
export const DISTRICT_STYLES = {
  fill: {
    color: '#627BC1',
    opacity: 0.4
  },
  line: {
    color: '#1e40af',
    width: 2
  }
} as const; 
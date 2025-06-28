// Mapbox configuration constants
export const mapboxStyles = {
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  streets: 'mapbox://styles/mapbox/streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
} as const;

// Default map settings
export const mapDefaults = {
  center: [-99.9, 31.5] as [number, number], // Centered on Texas (updated from generic US center)
  zoom: 6, // Better zoom level for Texas districts
  projection: 'globe' as const,
} as const;

// Fog configuration for globe view
export const fogConfig = {
  'horizon-blend': 0.3,
  color: '#f8f8f8',
  'high-color': '#add8e6',
  'space-color': '#d8f2ff',
  'star-intensity': 0.0,
} as const;

// Vector tiles configuration
// Based on Mapbox Vector Tiles API: https://docs.mapbox.com/api/maps/vector-tiles/
export const vectorTiles = {
  // Tileset ID follows format: username.id
  tilesetId: 'danielmotta7.9a4o9e36',
  // Source layer within the tileset (must match uploaded data)
  sourceLayer: 'Current_Districts_2025-04m3ev',
  // API Performance Notes:
  // - Rate limit: 100,000 requests/minute
  // - Caching: 12 hours device cache, 5 minutes CDN cache
  // - Format: Vector tiles (.mvt) for optimal performance vs GeoJSON
} as const;

// TSA district styling with proper TypeScript interfaces
interface DistrictFillStyle {
  readonly color: string;
  readonly opacity: number;
}

interface DistrictLineStyle {
  readonly color: string;
  readonly width: number;
}

export const districtStyles = {
  fill: {
    color: '#627BC1',
    opacity: 0.4,
  } as DistrictFillStyle,
  line: {
    color: '#1e40af',
    width: 2,
  } as DistrictLineStyle,
  hoverColor: '#1e40af',
} as const;

// Data sources
export const dataSources = {
  districtsGeojson: '/Current_Districts_2025.geojson',
} as const;

// Layer IDs
export const layerIds = {
  districtsFill: 'districts-fill',
  districtsLine: 'districts-line',
  districtsSource: 'districts',
} as const;

// Legacy exports for backward compatibility
export const mapConfig = {
  center: mapDefaults.center,
  zoom: mapDefaults.zoom,
  projection: mapDefaults.projection,
} as const;

// Legacy SCREAMING_SNAKE_CASE exports for backward compatibility (deprecated)
/** @deprecated Use mapboxStyles instead */
export const MAPBOX_STYLES = mapboxStyles;
/** @deprecated Use mapDefaults instead */
export const MAP_DEFAULTS = mapDefaults;
/** @deprecated Use vectorTiles instead */
export const VECTOR_TILES = vectorTiles;
/** @deprecated Use districtStyles instead */
export const DISTRICT_STYLES = districtStyles;
/** @deprecated Use dataSources instead */
export const DATA_SOURCES = dataSources;
/** @deprecated Use layerIds instead */
export const LAYER_IDS = layerIds;
/** @deprecated Use mapConfig instead */
export const MAP_CONFIG = mapConfig;

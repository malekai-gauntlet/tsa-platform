// Mapbox configuration constants
export const MAPBOX_STYLES = {
  LIGHT: 'mapbox://styles/mapbox/light-v11',
  DARK: 'mapbox://styles/mapbox/dark-v11',
  SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
  STREETS: 'mapbox://styles/mapbox/streets-v12',
  OUTDOORS: 'mapbox://styles/mapbox/outdoors-v12',
} as const;

// Default map settings
export const MAP_DEFAULTS = {
  CENTER: [-95.7129, 37.0902] as [number, number], // Geographic center of US
  ZOOM: 3,
  PROJECTION: 'globe' as const,
} as const;

// Fog configuration for globe view
export const FOG_CONFIG = {
  'horizon-blend': 0.3,
  'color': '#f8f8f8',
  'high-color': '#add8e6',
  'space-color': '#d8f2ff',
  'star-intensity': 0.0,
} as const;

// TSA district styling
export const DISTRICT_STYLES = {
  FILL_COLOR: '#627BC1',
  FILL_OPACITY: 0.4,
  BORDER_COLOR: '#1e40af',
  BORDER_WIDTH: 2,
  HOVER_COLOR: '#1e40af',
} as const;

// Data sources
export const DATA_SOURCES = {
  DISTRICTS_GEOJSON: '/Current_Districts_2025.geojson',
} as const;

// Layer IDs
export const LAYER_IDS = {
  DISTRICTS_FILL: 'districts-fill',
  DISTRICTS_LINE: 'districts-line',
  DISTRICTS_SOURCE: 'districts',
} as const; 
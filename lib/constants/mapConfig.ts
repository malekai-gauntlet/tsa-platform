// Map configuration constants
export const MAP_CONFIG = {
  // Default map position (centered on Texas)
  center: [-99.9, 31.5] as [number, number],
  zoom: 6,
  projection: 'globe' as const,
} as const;

// Vector tiles configuration
export const VECTOR_TILES = {
  tilesetId: 'blackbirddash.dbg7wg1v',
  sourceLayer: 'Current_Districts_2025-a8192i',
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
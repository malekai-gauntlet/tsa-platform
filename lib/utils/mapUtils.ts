import mapboxgl from 'mapbox-gl';
import { VECTOR_TILES, DISTRICT_STYLES } from '@/lib/constants/mapConfig';

/**
 * Sets up TSA district layers on the map
 */
export function setupDistrictLayers(map: mapboxgl.Map) {
  // Add vector tiles source with enhanced error handling
  map.addSource('districts', {
    type: 'vector',
    url: `mapbox://${VECTOR_TILES.tilesetId}`,
    // Optional: Add timeout for tile requests
    timeout: 30000
  });
  
  // Monitor source loading with specific error handling
  map.on('sourcedata', (e) => {
    if (e.sourceId === 'districts') {
      if (e.isSourceLoaded) {
        console.log('✅ TSA districts vector tiles loaded successfully');
      }
    }
  });

  // Enhanced error handling for vector tile loading issues
  map.on('error', (e) => {
    const error = e.error;
    if (error?.message?.includes('districts') || error?.message?.includes(VECTOR_TILES.tilesetId)) {
      console.error('🚨 Vector tiles error:', {
        message: error.message,
        tileset: VECTOR_TILES.tilesetId,
        sourceLayer: VECTOR_TILES.sourceLayer,
        // Common Vector Tiles API errors from documentation:
        // 401: Invalid/missing token
        // 403: Account issue or URL restrictions
        // 404: Tileset doesn't exist
        // 422: Invalid zoom level or raster tileset
        possibleCauses: [
          'Check if tileset exists and is accessible',
          'Verify access token has proper permissions', 
          'Confirm tileset is vector (not raster)',
          'Check network connectivity to api.mapbox.com'
        ]
      });
    }
  });
  
  // Add district fill layer
  map.addLayer({
    id: 'districts-fill',
    type: 'fill',
    source: 'districts',
    'source-layer': VECTOR_TILES.sourceLayer,
    layout: {},
    paint: {
      'fill-color': DISTRICT_STYLES.fill.color,
      'fill-opacity': DISTRICT_STYLES.fill.opacity
    }
  });

  // Add district border layer
  map.addLayer({
    id: 'districts-line',
    type: 'line',
    source: 'districts',
    'source-layer': VECTOR_TILES.sourceLayer,
    layout: {},
    paint: {
      'line-color': DISTRICT_STYLES.line.color,
      'line-width': DISTRICT_STYLES.line.width
    }
  });
}

/**
 * Sets up district interactions (click and hover)
 */
export function setupDistrictInteractions(map: mapboxgl.Map) {
  // Click handler for district popups
  map.on('click', 'districts-fill', (e) => {
    if (e.features && e.features[0]) {
      const properties = e.features[0].properties;
      const coordinates = e.lngLat;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(`
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 10px 0; color: #1e40af;">District Info</h3>
            <p style="margin: 0;"><strong>District:</strong> ${properties?.DISTRICT || properties?.NAME || 'N/A'}</p>
            <p style="margin: 5px 0 0 0;"><strong>Name:</strong> ${properties?.NAME20 || properties?.NAME2 || 'N/A'}</p>
            ${properties?.GEOID20 ? `<p style="margin: 5px 0 0 0;"><strong>GEOID:</strong> ${properties.GEOID20}</p>` : ''}
          </div>
        `)
        .addTo(map);
    }
  });

  // Cursor style changes on hover
  map.on('mouseenter', 'districts-fill', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'districts-fill', () => {
    map.getCanvas().style.cursor = '';
  });
}

/**
 * Sets up atmospheric effects for the map
 */
export function setupAtmosphericEffects(map: mapboxgl.Map) {
  map.setFog({
    'horizon-blend': 0.3,
    'color': '#f8f8f8',
    'high-color': '#add8e6',
    'space-color': '#d8f2ff',
    'star-intensity': 0.0
  });
} 
import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { vectorTiles, districtStyles, fogConfig, dataSources } from '@/lib/constants/mapbox';

/**
 * Sets up TSA district layers on the map
 */
export function setupDistrictLayers(map: Map): void {
  try {
    // Add vector tiles source with enhanced error handling
    map.addSource('districts', {
      type: 'vector',
      url: `mapbox://${vectorTiles.tilesetId}`,
      // Optional: Add timeout for tile requests
      timeout: 30000,
    });

    // Monitor source loading with specific error handling
    map.on('sourcedata', e => {
      if (e.sourceId === 'districts' && e.isSourceLoaded) {
        console.log('✅ TSA districts vector tiles loaded successfully');
      }
    });

    // Enhanced error handling for vector tile loading issues
    map.on('error', e => {
      const error = e.error;
      if (
        error?.message?.includes('districts') ||
        error?.message?.includes(vectorTiles.tilesetId)
      ) {
        console.error('🚨 Vector tiles error:', {
          message: error.message,
          tileset: vectorTiles.tilesetId,
          sourceLayer: vectorTiles.sourceLayer,
          // Common Vector Tiles API errors from documentation:
          // 401: Invalid/missing token
          // 403: Account issue or URL restrictions
          // 404: Tileset doesn't exist
          // 422: Invalid zoom level or raster tileset
          possibleCauses: [
            'Check if tileset exists and is accessible',
            'Verify access token has proper permissions',
            'Confirm tileset is vector (not raster)',
            'Check network connectivity to api.mapbox.com',
          ],
        });

        // Fallback to GeoJSON file if vector tiles fail
        console.log('Falling back to GeoJSON file...');
        loadGeoJSONFallback(map);
        return;
      }
    });

    // Add district fill layer
    map.addLayer({
      id: 'districts-fill',
      type: 'fill',
      source: 'districts',
      'source-layer': vectorTiles.sourceLayer,
      layout: {},
      paint: {
        'fill-color': districtStyles.fill.color,
        'fill-opacity': districtStyles.fill.opacity,
      },
    });

    // Add district border layer
    map.addLayer({
      id: 'districts-line',
      type: 'line',
      source: 'districts',
      'source-layer': vectorTiles.sourceLayer,
      layout: {},
      paint: {
        'line-color': districtStyles.line.color,
        'line-width': districtStyles.line.width,
      },
    });
  } catch (err) {
    console.error('Error setting up district layers:', err);
    loadGeoJSONFallback(map);
  }
}

/**
 * Fallback function to load GeoJSON directly if vector tiles fail
 */
function loadGeoJSONFallback(map: Map): void {
  // Remove existing source and layers if they exist
  try {
    if (map.getLayer('districts-fill')) map.removeLayer('districts-fill');
    if (map.getLayer('districts-line')) map.removeLayer('districts-line');
    if (map.getSource('districts')) map.removeSource('districts');
  } catch (e) {
    // Ignore errors if layers/source don't exist
    console.log('Error removing existing layers:', e);
  }

  try {
    console.log('Loading GeoJSON from:', dataSources.districtsGeojson);

    // First try to use direct fetch for better error reporting
    fetch(dataSources.districtsGeojson)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('GeoJSON data fetched successfully, features:', data.features?.length || 0);

        // Add GeoJSON source
        map.addSource('districts', {
          type: 'geojson',
          data: data,
          generateId: true,
        });

        addDistrictLayers(map);
      })
      .catch(error => {
        console.error('Error fetching GeoJSON:', error);

        // Fallback to direct path
        try {
          // Add GeoJSON source
          map.addSource('districts', {
            type: 'geojson',
            data: dataSources.districtsGeojson,
          });

          addDistrictLayers(map);
        } catch (e) {
          console.error('Failed to load GeoJSON directly:', e);
        }
      });
  } catch (e) {
    console.error('Error in loadGeoJSONFallback:', e);
  }
}

/**
 * Helper to add district layers to map
 */
function addDistrictLayers(map: Map): void {
  // Add fill layer
  map.addLayer({
    id: 'districts-fill',
    type: 'fill',
    source: 'districts',
    layout: {},
    paint: {
      'fill-color': districtStyles.fill.color,
      'fill-opacity': districtStyles.fill.opacity,
    },
  });

  // Add line layer
  map.addLayer({
    id: 'districts-line',
    type: 'line',
    source: 'districts',
    layout: {},
    paint: {
      'line-color': districtStyles.line.color,
      'line-width': districtStyles.line.width,
    },
  });

  console.log('✅ GeoJSON layers added successfully');
}

/**
 * Sets up district interactions (click and hover)
 */
export function setupDistrictInteractions(map: Map): void {
  // Click handler for district popups
  map.on('click', 'districts-fill', e => {
    if (e.features?.[0]) {
      const properties = e.features[0].properties;
      const coordinates = e.lngLat;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 10px 0; color: #1e40af;">District Info</h3>
            <p style="margin: 0;"><strong>District:</strong> ${properties?.DISTRICT || properties?.NAME || 'N/A'}</p>
            <p style="margin: 5px 0 0 0;"><strong>Name:</strong> ${properties?.NAME20 || properties?.NAME2 || 'N/A'}</p>
            ${properties?.GEOID20 ? `<p style="margin: 5px 0 0 0;"><strong>GEOID:</strong> ${properties.GEOID20}</p>` : ''}
          </div>
        `
        )
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
export function setupAtmosphericEffects(map: Map): void {
  map.setFog(fogConfig);
}

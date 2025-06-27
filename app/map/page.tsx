'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token - you'll need to add this to your environment variables
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Configuration - vector tiles only (no GeoJSON fallback)
const VECTOR_TILESET_ID = 'blackbirddash.dbg7wg1v';
const VECTOR_SOURCE_LAYER = 'Current_Districts_2025-a8192i';

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(-99.9);
  const [lat] = useState(31.5);
  const [zoom] = useState(6);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once

    // Check if Mapbox token is available
    if (!MAPBOX_ACCESS_TOKEN) {
      console.warn('Mapbox access token not found. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables.');
      return;
    }

    // Set the access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: '/mapbox-light-style.json', // Local style file
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe' // Nice globe view when zoomed out
    });

    // Add navigation control (zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Handle style loading
    map.current.on('style.load', () => {
      if (map.current) {
        // Add nice fog effect
        map.current.setFog({
          'horizon-blend': 0.3,
          'color': '#f8f8f8',
          'high-color': '#add8e6',
          'space-color': '#d8f2ff',
          'star-intensity': 0.0
        });

        // Add vector tiles source with error handling
        try {
          map.current.addSource('districts', {
            'type': 'vector',
            'url': `mapbox://${VECTOR_TILESET_ID}`,
            'timeout': 30000 // 30 second timeout
          });
          
          // Add district boundaries layer
          map.current.addLayer({
            'id': 'districts-fill',
            'type': 'fill',
            'source': 'districts',
            'source-layer': VECTOR_SOURCE_LAYER,
            'layout': {},
            'paint': {
              'fill-color': '#627BC1',
              'fill-opacity': 0.4
            }
          });

          // Add district borders
          map.current.addLayer({
            'id': 'districts-line',
            'type': 'line',
            'source': 'districts',
            'source-layer': VECTOR_SOURCE_LAYER,
            'layout': {},
            'paint': {
              'line-color': '#1e40af',
              'line-width': 2
            }
          });

          console.log('Vector tiles layers added successfully');

          // Add click event for districts
          map.current.on('click', 'districts-fill', (e) => {
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
                .addTo(map.current!);
            }
          });

          // Change cursor on hover
          map.current.on('mouseenter', 'districts-fill', () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = 'pointer';
            }
          });

          map.current.on('mouseleave', 'districts-fill', () => {
            if (map.current) {
              map.current.getCanvas().style.cursor = '';
            }
          });

        } catch (error) {
          console.error('Error adding vector tiles source:', error);
        }
      }
    });

    // Error handling for debugging
    map.current.on('error', (e) => {
      console.error('Mapbox error:', e.error);
      // Don't stop the map from working - just log the error
    });

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [lng, lat, zoom]);

  return (
    <div className="map-page">
      {/* Only show error overlay if token is missing */}
      {!MAPBOX_ACCESS_TOKEN && (
        <div className="map-overlay error-overlay">
          <strong>⚠️ Configuration Required:</strong> Please add your Mapbox access token to .env.local
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="map-container"
        style={{ 
          width: '100vw', 
          height: '100vh',
        }} 
      />
      
      <style jsx>{`
        .map-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        .map-overlay {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        
        .error-overlay {
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          color: #92400e;
        }
      `}</style>
    </div>
  );
} 
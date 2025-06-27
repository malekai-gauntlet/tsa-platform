'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token - you'll need to add this to your environment variables
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Configuration - update this when you upload to Mapbox Studio
const USE_VECTOR_TILES = true; // Set to true once you upload to Mapbox Studio
const VECTOR_TILESET_ID = 'blackbirddash.945h4nkg'; // Replace with your actual tileset ID after upload
const VECTOR_SOURCE_LAYER = 'Current_Districts_2025-6fysrt'; // This will be the layer name in your vector tileset

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(-95.7129);
  const [lat] = useState(37.0902);
  const [zoom] = useState(3);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [dataSource, setDataSource] = useState<'geojson' | 'vector'>('geojson');

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
      style: 'mapbox://styles/mapbox/light-v11', // Clean style for data visualization
      center: [lng, lat],
      zoom: zoom,
      projection: 'globe' // Nice globe view when zoomed out
    });

    // Add navigation control (zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Add atmosphere for a nicer globe effect
    map.current.on('style.load', () => {
      if (map.current) {
        map.current.setFog({
          'horizon-blend': 0.3,
          'color': '#f8f8f8',
          'high-color': '#add8e6',
          'space-color': '#d8f2ff',
          'star-intensity': 0.0
        });

        // Choose data source based on configuration
        if (USE_VECTOR_TILES) {
          // Use vector tiles for better performance
          map.current.addSource('districts', {
            'type': 'vector',
            'url': `mapbox://${VECTOR_TILESET_ID}`
          });
          setDataSource('vector');
          console.log('Using vector tiles for districts data');
        } else {
          // Fallback to GeoJSON
          map.current.addSource('districts', {
            'type': 'geojson',
            'data': '/Current_Districts_2025.geojson'
          });
          setDataSource('geojson');
          console.log('Using GeoJSON for districts data');
        }

        // Add district boundaries layer
        // Note: for vector tiles, you need to specify the source-layer
        const layerConfig = {
          'id': 'districts-fill',
          'type': 'fill' as const,
          'source': 'districts',
          'layout': {},
          'paint': {
            'fill-color': '#627BC1',
            'fill-opacity': 0.4
          }
        };

        if (dataSource === 'vector') {
          // For vector tiles, add source-layer property
          // The source-layer name is typically the original filename without extension
          (layerConfig as any)['source-layer'] = VECTOR_SOURCE_LAYER;
        }

        map.current.addLayer(layerConfig);

        // Add district borders
        const borderConfig = {
          'id': 'districts-line',
          'type': 'line' as const,
          'source': 'districts',
          'layout': {},
          'paint': {
            'line-color': '#1e40af',
            'line-width': 2
          }
        };

        if (dataSource === 'vector') {
          (borderConfig as any)['source-layer'] = VECTOR_SOURCE_LAYER;
        }

        map.current.addLayer(borderConfig);

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

        setMapLoaded(true);
        console.log('Districts map loaded successfully');
      }
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
      {/* Minimal overlay for status messages */}
      {!MAPBOX_ACCESS_TOKEN && (
        <div className="map-overlay error-overlay">
          <strong>⚠️ Configuration Required:</strong> Please add your Mapbox access token to .env.local
        </div>
      )}
      {MAPBOX_ACCESS_TOKEN && !mapLoaded && (
        <div className="map-overlay loading-overlay">
          Loading TSA districts data...
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
        
        .loading-overlay {
          background-color: rgba(0, 0, 0, 0.8);
          color: white;
        }
      `}</style>
    </div>
  );
} 
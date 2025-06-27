'use client';

import { useEffect, useRef } from 'react';
import type { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapConfig } from '@/lib/constants/mapbox';
import { setupDistrictLayers, setupDistrictInteractions, setupAtmosphericEffects } from '@/lib/utils/mapUtils';

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('Mapbox access token not found. Please add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to your environment variables.');
      return;
    }

    // Set the access token
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Initialize map with inline style to avoid TypeScript issues
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
              'background-color': 'hsl(220, 1%, 97%)'
            }
          }
        ]
      },
      center: mapConfig.center,
      zoom: mapConfig.zoom,
      projection: mapConfig.projection
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    // Setup map features when style loads
    map.current.on('style.load', () => {
      if (map.current) {
        setupAtmosphericEffects(map.current);
        setupDistrictLayers(map.current);
        setupDistrictInteractions(map.current);
      }
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="map-page">
      {/* Error overlay for missing token */}
      {!MAPBOX_ACCESS_TOKEN && (
        <div className="error-overlay">
          <strong>⚠️ Configuration Required:</strong> Please add your Mapbox access token to .env.local
        </div>
      )}
      
      <div 
        ref={mapContainer} 
        className="map-container"
      />
      
      <style jsx>{`
        .map-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          margin: 0;
          padding: 0;
        }
        
        .map-container {
          width: 100%;
          height: 100%;
        }
        
        .error-overlay {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          background-color: #fef3c7;
          border: 1px solid #f59e0b;
          color: #92400e;
        }
      `}</style>
    </div>
  );
} 
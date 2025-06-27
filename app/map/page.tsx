'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token - you'll need to add this to your environment variables
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(-95.7129);
  const [lat] = useState(37.0902);
  const [zoom] = useState(3);
  const [mapLoaded, setMapLoaded] = useState(false);

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

        // Load Districts GeoJSON data
        map.current.addSource('districts', {
          'type': 'geojson',
          'data': '/Current_Districts_2025.geojson'
        });

        // Add district boundaries layer
        map.current.addLayer({
          'id': 'districts-fill',
          'type': 'fill',
          'source': 'districts',
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
          'layout': {},
          'paint': {
            'line-color': '#1e40af',
            'line-width': 2
          }
        });

        // Add click event for districts
        map.current.on('click', 'districts-fill', (e) => {
          if (e.features && e.features[0]) {
            const properties = e.features[0].properties;
            const coordinates = e.lngLat;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                <div style="padding: 10px;">
                  <h3 style="margin: 0 0 10px 0; color: #1e40af;">District</h3>
                  <p style="margin: 0;"><strong>District:</strong> ${properties?.DISTRICT || 'N/A'}</p>
                  <p style="margin: 5px 0 0 0;"><strong>Region:</strong> ${properties?.REGION || 'N/A'}</p>
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
      <div className="map-header">
        <h1>TSA Districts Map</h1>
        <p>Transportation Security Administration District Overview</p>
        {!MAPBOX_ACCESS_TOKEN && (
          <div style={{ 
            backgroundColor: '#fef3c7', 
            border: '1px solid #f59e0b', 
            borderRadius: '6px', 
            padding: '12px', 
            margin: '10px 0',
            color: '#92400e'
          }}>
            <strong>⚠️ Configuration Required:</strong> Please add your Mapbox access token to .env.local
          </div>
        )}
        {MAPBOX_ACCESS_TOKEN && !mapLoaded && (
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            Loading districts data...
          </p>
        )}
      </div>
      
      <div 
        ref={mapContainer} 
        className="map-container"
        style={{ 
          width: '100%', 
          height: 'calc(100vh - 120px)',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          backgroundColor: '#f3f4f6'
        }} 
      />
      
      <style jsx>{`
        .map-page {
          padding: 20px;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        .map-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .map-header h1 {
          color: #1e293b;
          margin: 0 0 8px 0;
          font-size: 2rem;
          font-weight: 600;
        }
        .map-header p {
          color: #64748b;
          margin: 0;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
} 
// District data structure from GeoJSON properties
export interface DistrictProperties {
  DISTRICT: string;
  REGION: string;
  [key: string]: any; // Allow for additional properties
}

// GeoJSON feature structure for districts
export interface DistrictFeature {
  type: 'Feature';
  properties: DistrictProperties;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

// District popup data
export interface DistrictPopupData {
  district: string;
  region: string;
  coordinates: [number, number];
}

// Map initialization options
export interface MapInitOptions {
  container: string | HTMLDivElement;
  style?: string;
  center?: [number, number];
  zoom?: number;
  projection?: string;
}

// Map controls configuration
export interface MapControlsConfig {
  navigation?: boolean;
  fullscreen?: boolean;
  scale?: boolean;
  geolocate?: boolean;
}

export interface EarthquakeFeature {
  type: "Feature";
  properties: {
    mag: number | null;
    place: string;
    time: number;
    updated: number;
    tz: number | null;
    url: string;
    detail: string;
    felt?: number;
    cdi?: number;
    mmi?: number;
    alert?: string;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst?: number;
    dmin?: number;
    rms?: number;
    gap?: number;
    magType: string;
    type: string;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number, number];
  };
  id: string;
}

export type EarthquakeParams = {
  starttime?: string;
  endtime?: string;
  minmagnitude?: number;
  maxmagnitude?: number;
  limit?: number;
  offset?: number;
  format?: "geojson" | "xml" | "text" | "kml" | "quakeml";
};

export interface EarthquakeResponse {
  type: "FeatureCollection";
  metadata: {
    generated: number;
    url: string;
    title: string;
    api: string;
    count: number;
    status: number;
  };
  bbox: [number, number, number, number, number, number];
  features: EarthquakeFeature[];
}

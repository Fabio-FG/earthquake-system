import { api } from "../../lib/axios";
import type { EarthquakeParams, EarthquakeResponse } from "./types";

export async function getEarthquakes(
  params: EarthquakeParams
): Promise<EarthquakeResponse> {
  const result = await api.get("1/query", {
    params: {
      format: "geojson",
      ...params,
    },
  });

  return result.data;
}

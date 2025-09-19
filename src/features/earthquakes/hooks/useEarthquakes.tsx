import { useQuery } from "@tanstack/react-query";
import { getEarthquakes } from "../api";
import type { EarthquakeParams } from "../types";

export default function useEarthquakes() {
  const queryParams: EarthquakeParams = { minmagnitude: 4 };

  const {
    data: earthquakes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["earthquake"],
    queryFn: () => getEarthquakes(queryParams),
    staleTime: 1000 * 60 * 5,
  });

  return { earthquakes, isLoading, error };
}

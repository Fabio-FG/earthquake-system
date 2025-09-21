import { useQuery } from "@tanstack/react-query";
import { getEarthquakes } from "../api";
import type { EarthquakeParams } from "../types";

export default function useEarthquakes(params: EarthquakeParams) {
  const {
    data: earthquakes,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["earthquakes", params],
    queryFn: () => getEarthquakes(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  return { earthquakes, isLoading, error, isFetching };
}

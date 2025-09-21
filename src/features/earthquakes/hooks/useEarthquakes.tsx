import { useQuery } from "@tanstack/react-query";
import { getEarthquakes } from "../api";
import type { earthquakeSearchSchema } from "../schemas/earthquake.schemas";

export default function useEarthquakes(params: earthquakeSearchSchema) {
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

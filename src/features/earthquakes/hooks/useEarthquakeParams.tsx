import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";
import { getDateRange } from "../../../helpers/setRange.helper";

export function useEarthquakeParams(defaultDays = 1) {
  const search = useSearch({ from: "/" });
  const navigate = useNavigate();

  //Memoize to avoid infinite loops while getting date range.
  const defaults = useMemo(
    () => ({
      ...getDateRange(defaultDays),
      minmagnitude: 4,
      orderby: "time" as const,
    }),
    [defaultDays]
  );

  //memo the final params
  const params = useMemo(
    () => ({
      ...defaults,
      ...search,
    }),
    [defaults, search]
  );

  function setDays(days: number) {
    const range = getDateRange(days);
    navigate({
      to: "/",
      search: {
        ...search,
        starttime: range.starttime,
        endtime: range.endtime,
      },
      replace: true,
    });
  }

  function setMinMagnitude(mag: number) {
    navigate({
      to: "/",
      search: {
        ...search,
        minmagnitude: mag,
      },
      replace: true,
    });
  }

  function setOrder(
    order: "time" | "time-asc" | "magnitude" | "magnitude-asc"
  ) {
    navigate({
      to: "/",
      search: {
        ...search,
        orderby: order,
      },
      replace: true,
    });
  }

  function setPagination(offset: number, limit: number) {
    navigate({
      to: "/",
      search: {
        ...search,
        offset,
        limit,
      },
      replace: true,
    });
  }

  return { setDays, setMinMagnitude, setOrder, setPagination, params };
}

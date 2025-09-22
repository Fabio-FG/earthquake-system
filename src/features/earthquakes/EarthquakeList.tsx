import { ErrorComponent } from "@tanstack/react-router";
import { WiEarthquake, WiTime1 } from "react-icons/wi";
import { Card } from "../../components/Card";

import Range, { type RangeLevel } from "../../components/Range";
import SortFilter from "../../components/SortFilter";
import { formatLocation } from "../../helpers/formatLocation.helper";
import { formatTime } from "../../helpers/formatTime.helper";
import { cn } from "../../utils/cn";
import { useEarthquakeParams } from "./hooks/useEarthquakeParams";
import useEarthquakes from "./hooks/useEarthquakes";
import { useEarthquakeStore } from "./stores/earthquake.store";
import type { EarthquakeFeature } from "./types";
import OrderFilter, { type OrderString } from "../../components/OrderFilter";
import { useDisplayView } from "../../stores/ui";
import { useEffect, useState } from "react";

const dateSortOptions = [
  { label: "Last day", value: 1 },
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
];
const quakeSortOptions: { label: string; value: OrderString }[] = [
  { label: "Newest", value: "time" },
  { label: "Oldest", value: "time-asc" },
  { label: "Biggest", value: "magnitude" },
  { label: "Smallest", value: "magnitude-asc" },
];

const quakeMagnitudes: { label: string; value: number }[] = [
  { label: "3.0+", value: 3 },
  { label: "4.0+", value: 4 },
  { label: "5.0+", value: 5 },
  { label: "6.0+", value: 6 },
  { label: "7.0+", value: 7 },
];

export default function EarthquakeList() {
  const { params, setDays, setOrder, setMinMagnitude } = useEarthquakeParams();
  const [isMobile, setIsMobile] = useState(false);
  const { toggleMapView } = useDisplayView();

  const { earthquakes, error, isLoading } = useEarthquakes(params);

  const { setSelectedEarthquake, selectedEarthquake } = useEarthquakeStore();

  //handle screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSelectQuake(quake: EarthquakeFeature) {
    setSelectedEarthquake(quake);
    if (isMobile) {
      toggleMapView();
    }
  }

  function handleRangePicker(index: RangeLevel) {
    setMinMagnitude(index.value);
  }

  if (error) {
    return <ErrorComponent error={"Error while fetching"} />;
  }

  if (isLoading && !earthquakes) {
    return <p>Loading...</p>;
  }

  if (!earthquakes) {
    return <p>no earthquake data</p>;
  }

  return (
    <div className="">
      <div className="md:ml-2">
        <SortFilter sortOptions={dateSortOptions} onChange={setDays} />
        <div className="mt-6 md:mt-4 justify-center flex flex-col ml-2 mr-2 mb-4 flex-wrap h-auto">
          <Range
            levels={quakeMagnitudes}
            onChange={handleRangePicker}
            showCurrentValue
            defaultValue={4}
          />
        </div>
        <OrderFilter orderOptions={quakeSortOptions} onChange={setOrder} />
      </div>
      {earthquakes &&
        earthquakes.features.map((quake) => {
          const isSelected =
            quake.id === (selectedEarthquake && selectedEarthquake.id);
          return (
            <Card
              className={cn(
                "flex gap-4 items-center py-2 px-2 mx-2 my-2 justify-center",
                isSelected && "border-teal-500 bg-main text-white"
              )}
              key={quake.id}
              onClick={() => handleSelectQuake(quake)}
            >
              <div className="flex flex-col items-center ml-2">
                <WiEarthquake
                  color={isSelected ? "white" : "teal"}
                  className="border-2 rounded-full"
                  size={16}
                />

                <p className={isSelected ? "text-white" : "text-teal-500"}>
                  {quake.properties.mag}
                </p>
              </div>
              <div className="flex flex-col p-1 h-auto items-start flex-1">
                <p className="text-sm leading-none mb-1">
                  {quake.properties.place
                    ? formatLocation(quake.properties.place)
                    : "N/A"}
                </p>
                <div className="flex flex-row items-center gap-2">
                  <WiTime1 color={isSelected ? "white" : "teal"} />
                  <p
                    className={cn(
                      "text-sm",
                      isSelected ? "text-white" : "text-red-400"
                    )}
                  >
                    {formatTime(quake.properties.time)}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
    </div>
  );
}

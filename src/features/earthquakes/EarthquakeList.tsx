import { ErrorComponent } from "@tanstack/react-router";
import useEarthquakes from "./hooks/useEarthquakes";
import { WiEarthquake, WiTime1 } from "react-icons/wi";
import { formatTime } from "../../helpers/formatTime";
import { Card } from "../../components/Card";

export default function EarthquakeList() {
  const { earthquakes, error, isLoading } = useEarthquakes();

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
    <div className="bg-blue-300">
      {earthquakes &&
        earthquakes.features.map((quake) => {
          return (
            <Card className="flex gap-4 items-start mx-2 my-2">
              <div className="flex flex-col items-center align-middle ">
                <WiEarthquake color="red" />
                <p className="text-red-400">{quake.properties.mag}</p>
              </div>
              <div className="flex flex-col p-0 h-auto items-start  py-0">
                <p className="text-md">{quake.properties.place}</p>
                <div className="flex flex-row items-center gap-2">
                  <WiTime1 color="gray" />
                  <p className="text-gray-500 text-sm">
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

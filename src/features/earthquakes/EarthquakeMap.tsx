import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import createEarthquakeIcon from "../../assets/icons/earthquake.icon";
import { formatTime } from "../../helpers/formatTime";
import { getEarthquakes } from "./api";
import { useEarthquakeStore } from "./stores/earthquake.store";
import type { EarthquakeParams } from "./types";

function MapController() {
  const { selectedEarthquake } = useEarthquakeStore();
  const map = useMap();

  useEffect(() => {
    if (selectedEarthquake) {
      const [lon, lat] = selectedEarthquake.geometry.coordinates;

      map.setView([lat, lon], 10);
    }
  }, [selectedEarthquake, map]);

  return null;
}

export default function EarthquakeMap() {
  const { selectedEarthquake } = useEarthquakeStore();
  const queryParams: EarthquakeParams = { minmagnitude: 2 };

  const {
    data: earthquakes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["earthquake"],
    queryFn: () => getEarthquakes(queryParams),
    staleTime: 1000 * 60 * 5,
  });

  const [center] = useState<[number, number]>([38.7169, -9.139]);

  if (isLoading) {
    return (
      <div className="border-2 flex items-center justify-center w-screen h-screen">
        <div className="text-lg">Loading Earthquake data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-2 flex items-center justify-center w-screen h-screen">
        <div className="text-lg text-red-500">
          Error while fetching earthquake data.
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={3}
      maxZoom={5}
      scrollWheelZoom={true}
      minZoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      className="w-screen h-screen lg:w-full lg:h-screen md:w-full md:min-h-dvh"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapController />

      <Marker position={center}>
        <Popup>
          {earthquakes?.features[0]
            ? `Most recent quake: ${earthquakes.features[0].properties.place}`
            : "My location(Lisbon)"}
        </Popup>
      </Marker>

      {/* <MarkerClusterGroup showCoverageOnHover={true}> */}
      {earthquakes &&
        earthquakes.features.map((quake) => {
          const [lon, lat] = quake.geometry.coordinates;
          return (
            <Marker
              key={quake.id}
              position={[lat, lon]}
              icon={createEarthquakeIcon(
                quake.properties.mag,
                !!selectedEarthquake
              )}
            >
              <Popup className="m-0">
                <div className="flex flex-col gap-0 m-0">
                  <p className="mx-0">Location: {quake.properties.place}</p>
                  <p className="mx-0">Magnitude: {quake.properties.mag}</p>
                  <p className="mx-0">
                    Time: {formatTime(quake.properties.time)}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      {/* </MarkerClusterGroup> */}
    </MapContainer>
  );
}

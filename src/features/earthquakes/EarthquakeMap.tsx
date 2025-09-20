import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import useEarthquakes from "./hooks/useEarthquakes";
import { formatTime } from "../../helpers/formatTime";

export default function EarthquakeMap() {
  const { earthquakes } = useEarthquakes();

  const [lon, lat] = earthquakes
    ? earthquakes.features[0].geometry.coordinates
    : [38.7169, -9.139];

  const [center, setCenter] = useState<[number, number]>([lon, lat]);

  return (
    <div className="border-2 flex">
      <MapContainer
        center={center}
        zoom={3}
        maxZoom={8}
        scrollWheelZoom={true}
        className="w-screen h-screen lg:w-full lg:h-screen md:w-full md:min-h-dvh"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>Lisboa 🌍</Popup>
        </Marker>
        <MarkerClusterGroup showCoverageOnHover={true}>
          {earthquakes &&
            earthquakes.features.map((quake) => {
              const [lat, long] = quake.geometry.coordinates;
              return (
                <Marker key={quake.id} position={[long, lat]}>
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
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

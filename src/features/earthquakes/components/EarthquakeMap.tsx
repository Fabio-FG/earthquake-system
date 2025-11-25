import { useEffect, useState } from "react";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";

const { BaseLayer } = LayersControl;

import EarthquakeMagDisplay from "./EarthquakeMagDisplay";
import { QuakeRegionMenu } from "./EarthquakeRegionMenu";
import { useEarthquakeStore } from "../stores/earthquake.store";
import { useEarthquakeParams } from "../hooks/useEarthquakeParams";
import useEarthquakes from "../hooks/useEarthquakes";
import type { EarthquakeFeature } from "../types";
import SystemMessage from "../../../components/SystemError";
import createEarthquakeIcon from "../../../assets/icons/earthquake.icon";
import { cn } from "../../../utils/cn";
import { formatTime } from "../../../utils/formatTime";

function MapController() {
  const { selectedEarthquake } = useEarthquakeStore();
  const map = useMap();

  useEffect(() => {
    if (selectedEarthquake === null) {
      map.setZoom(2);
    }

    if (selectedEarthquake) {
      const [lon, lat] = selectedEarthquake.geometry.coordinates;

      map.setView([lat, lon], 12);
    }
  }, [selectedEarthquake, map]);

  return null;
}

export default function EarthquakeMap() {
  const { selectedEarthquake, setSelectedEarthquake } = useEarthquakeStore();
  const { params } = useEarthquakeParams();

  const { earthquakes, isLoading, error, isFetching } = useEarthquakes({
    ...params,
    limit: undefined,
  });

  function handleQuake(quake: EarthquakeFeature) {
    setSelectedEarthquake(quake);
  }

  function onCloseMarker() {
    setSelectedEarthquake(null);
  }

  const [center] = useState<[number, number]>([29.636, 129.59]);

  return (
    <MapContainer
      center={center}
      zoom={3}
      maxZoom={7}
      minZoom={2}
      worldCopyJump={true}
      bounceAtZoomLimits={true}
      zoomControl={false}
      zoomAnimation={true}
      scrollWheelZoom={true}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      className="w-screen h-[calc(100vh-80px)] lg:w-full lg:h-screen md:w-full md:min-h-dvh Z-10"
    >
      <LayersControl position="topright" collapsed>
        {/* OpenStreetMap */}
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
          />
        </BaseLayer>

        {/* Carto Light */}
        <BaseLayer name="Carto Light">
          <TileLayer
            url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/'>CARTO</a>"
          />
        </BaseLayer>

        <BaseLayer name="Ocean">
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://leafletjs.com/examples/layers-control.html">USGS The National Map</a>'
            url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>

        {/* Google Maps */}
        <BaseLayer name="Google Maps">
          <TileLayer
            url="http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="&copy; <a href='https://maps.google.com/'>Google</a>"
          />
        </BaseLayer>

        {/* Google Satellite */}
        <BaseLayer name="Satellite">
          <TileLayer
            url="http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution="&copy; <a href='https://maps.google.com/'>Google</a>"
          />
        </BaseLayer>
      </LayersControl>

      <SystemMessage
        isFetching={isFetching}
        isLoading={isLoading}
        error={error}
      />
      <div className="flex flex-col h-auto flex-wrap">
        <ZoomControl position="topright" />
        <QuakeRegionMenu />
      </div>
      <EarthquakeMagDisplay />
      <MapController />
      {earthquakes &&
        earthquakes.features.map((quake) => {
          const [lon, lat] = quake.geometry.coordinates;
          return (
            <div onClick={() => handleQuake(quake)} key={quake.id}>
              <Marker
                key={quake.id}
                zIndexOffset={selectedEarthquake?.id == quake.id ? 100 : 0}
                position={[lat, lon]}
                icon={createEarthquakeIcon(
                  quake.properties.mag,
                  selectedEarthquake?.id == quake.id
                )}
                eventHandlers={{
                  click: () => handleQuake(quake),
                  popupclose: () => onCloseMarker(),
                }}
              >
                <Popup
                  className={cn("custom-popup leaflet-popup-content")}
                  closeButton={true}
                  autoPan={true}
                  keepInView={true}
                >
                  <div className="flex flex-col gap-0 m-0 flex-wrap">
                    <p>
                      <span className="text-teal-500">Location:</span>{" "}
                      {quake.properties.place}
                    </p>
                    <p className="mx-0">
                      <span className="text-teal-500">Magnitude:</span>{" "}
                      {quake.properties.mag}
                    </p>
                    <p className="mx-0">
                      <span className="text-teal-500">Time:</span>{" "}
                      {formatTime(quake.properties.time)}
                    </p>
                    <p>
                      <span className="text-teal-500">Depth:</span>{" "}
                      {`${quake.geometry.coordinates[2]} Km`}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
    </MapContainer>
  );
}

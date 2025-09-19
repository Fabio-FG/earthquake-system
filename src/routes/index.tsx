import { createFileRoute } from "@tanstack/react-router";
import EarthquakeLayout from "../features/earthquakes/EarthquakeLayout";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-2 mx-2">
      <p className="text-lg font-light">Realtime Earthquakes</p>
      <p className="text-sm font-light">Sort by:</p>
      <EarthquakeLayout />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import EarthquakeLayout from "../features/earthquakes/EarthquakeLayout";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <EarthquakeLayout />
    </div>
  );
}

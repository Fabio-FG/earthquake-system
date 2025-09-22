import { createFileRoute } from "@tanstack/react-router";
import EarthquakeLayout from "../features/earthquakes/components/EarthquakeLayout";

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

import { useEffect, useState } from "react";
import { useDisplayView } from "../../stores/ui";
import EarthquakeList from "./EarthquakeList";
import EarthquakeMap from "./EarthquakeMap";

export default function EarthquakeLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const { listView, mapView } = useDisplayView();

  //handle screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return (
      <div className="flex flex-row w-full h-screen">
        <div className="flex-1 h-full overflow-y-auto">
          <EarthquakeList />
        </div>
        <div className="flex-2 h-full">
          <EarthquakeMap />
        </div>
      </div>
    );
  }

  return (
    <div>
      {listView && <EarthquakeList />}
      {mapView && <EarthquakeMap />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useMapStore } from "../../stores/ui";
import EarthquakeList from "./EarthquakeList";
import EarthquakeMap from "./EarthquakeMap";

export default function EarthquakeLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const showMap = useMapStore((s) => s.showMap);

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
        <div className="w-1/2 h-full overflow-y-auto">
          <EarthquakeList />
        </div>
        <div className="w-1/2 h-full mx-4">
          <EarthquakeMap />
        </div>
      </div>
    );
  }

  return <div>{showMap ? <EarthquakeList /> : <EarthquakeMap />}</div>;
}

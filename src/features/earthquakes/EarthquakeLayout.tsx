import { useEffect, useState } from "react";
import { useMapStore } from "../../stores/ui";
import EarthquakeList from "./EarthquakeList";

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
      <div className="flex flex-1 flex-row ">
        <EarthquakeList />
      </div>
    );
  }

  return <div>{showMap ? <EarthquakeList /> : <p>map</p>}</div>;
}

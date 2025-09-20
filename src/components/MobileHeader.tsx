import { CiViewList } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { useDisplayView } from "../stores/ui";

export default function MobileHeader() {
  const { toggleListView, toggleMapView, mapView } = useDisplayView();

  console.log({ mapView });
  return (
    <div className="md:hidden">
      <div className="flex items-center p-4 mb-4">
        <p className="text-lg font-medium">Realtime Earthquakes</p>
        <div className="flex flex-row gap-4 ml-auto">
          <CiViewList size={24} onClick={toggleListView} />
          <FaGlobeAsia size={24} onClick={toggleMapView} />
        </div>
      </div>
    </div>
  );
}

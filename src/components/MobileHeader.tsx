import { CiViewList } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { useDisplayView } from "../stores/ui";
import { WiEarthquake } from "react-icons/wi";

export default function MobileHeader() {
  const { toggleListView, toggleMapView, mapView } = useDisplayView();

  console.log({ mapView });
  return (
    <div className="md:hidden">
      <div className="flex items-center px-2">
        <div className="flex flex-row items-center">
          <div className="border-2 rounded-full border-teal-500 p-1">
            <WiEarthquake size={30} />
          </div>
          <p className="text-lg font-medium  p-2 rounded-2xl ">
            Realtime
            <span className="bg-teal-500 p-1 rounded-2xl text-black">
              Quakes
            </span>
          </p>
        </div>
        <div className="flex flex-row gap-4 ml-auto">
          <CiViewList size={24} onClick={toggleListView} />
          <FaGlobeAsia size={24} onClick={toggleMapView} />
        </div>
      </div>
    </div>
  );
}

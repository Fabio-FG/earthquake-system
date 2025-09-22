import { CiViewList } from "react-icons/ci";
import { FaGithub, FaGlobeAsia } from "react-icons/fa";
import { useDisplayView } from "../stores/ui";
import { WiEarthquake } from "react-icons/wi";

export default function MobileHeader() {
  const { toggleListView, toggleMapView, mapView, listView } = useDisplayView();

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
          {mapView && <CiViewList size={24} onClick={toggleListView} />}
          {listView && <FaGlobeAsia size={24} onClick={toggleMapView} />}
          <a
            href="https://github.com/Fabio-FG/earthquake-system"
            target="_blank"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}

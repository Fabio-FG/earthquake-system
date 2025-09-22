import { Link } from "@tanstack/react-router";
import { CiViewList } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { useDisplayView } from "../stores/ui";
import { WiEarthquake } from "react-icons/wi";

export default function DesktopHeader() {
  const { toggleListView, toggleMapView } = useDisplayView();
  return (
    <div className="hidden md:flex gap-4 items-center justify-between px-4 mb-4 ">
      <Link to="/" className="flex flex-row items-center">
        <div className="border-2 rounded-full border-teal-500 p-1">
          <WiEarthquake size={30} />
        </div>
        <p className="text-lg font-medium  p-2 rounded-2xl ">
          Realtime
          <span className="bg-teal-500 p-1 rounded-2xl text-black">Quakes</span>
        </p>
      </Link>

      <div className="flex flex-row gap-10 flex-wrap flex-1 justify-between items-center">
        <nav className="gap-10 flex ml-6"></nav>
        <div className="gap-6 flex mr-4">
          <button
            onClick={toggleMapView}
            className="hover:text-teal-500 transition-colors p-1"
            aria-label="Toggle map view"
          >
            <FaGlobeAsia size={20} />
          </button>
          <button
            onClick={toggleListView}
            className="hover:text-teal-500 transition-colors p-1"
            aria-label="Toggle list view"
          >
            <CiViewList size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

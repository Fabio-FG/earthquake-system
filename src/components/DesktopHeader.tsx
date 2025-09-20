import { Link } from "@tanstack/react-router";
import { CiViewList } from "react-icons/ci";
import { FaGlobeAsia } from "react-icons/fa";
import { useDisplayView } from "../stores/ui";

export default function DesktopHeader() {
  const { toggleListView, toggleMapView } = useDisplayView();
  return (
    <div className="hidden md:flex p-2 gap-4 items-center justify-between px-4 mb-4 ">
      <p className="text-lg font-medium">Realtime Earthquakes</p>
      <div className="flex flex-row gap-10 flex-wrap flex-1 justify-between items-center">
        <nav className="gap-10 flex ml-6">
          <Link
            to="/"
            className="[&.active]:font-bold hover:text-gray-200 transition-colors font-extralight"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="[&.active]:font-bold hover:text-gray-200 transition-colors font-extralight"
          >
            About
          </Link>
        </nav>
        <div className="gap-6 flex mr-4">
          <button
            onClick={toggleMapView}
            className="hover:text-gray-200 transition-colors p-1"
            aria-label="Toggle map view"
          >
            <FaGlobeAsia size={20} />
          </button>
          <button
            onClick={toggleListView}
            className="hover:text-gray-200 transition-colors p-1"
            aria-label="Toggle list view"
          >
            <CiViewList size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

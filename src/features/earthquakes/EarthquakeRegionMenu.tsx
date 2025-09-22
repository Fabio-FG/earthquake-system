import { useMap } from "react-leaflet";
import { QuakeRegions } from "./EarthquakeRegions";
import { useState } from "react";
import { FaGlobeAfrica } from "react-icons/fa";

export function QuakeRegionMenu() {
  const map = useMap();
  const [showList, setShowList] = useState<boolean>(false);

  const handleClick = (region: string) => {
    const bounds = QuakeRegions[region];
    if (bounds) {
      map.flyToBounds(bounds, { padding: [50, 50] });
    }
  };

  return (
    <div className="absolute top-35 right-3 bg-white p-2 rounded-lg shadow-md z-999 cursor-pointer">
      {!showList && (
        <FaGlobeAfrica
          size={20}
          color="teal"
          onClick={() => setShowList(!showList)}
          onFocus={() => setShowList(!showList)}
        />
      )}

      {showList && (
        <div className="flex flex-col">
          <button
            className="items-center flex justify-center bg-main text-white text-center rounded p-2 text-md mb-2"
            onClick={() => setShowList(!showList)}
          >
            <p className="uppercase text-teal-500">close</p>
          </button>
          {Object.keys(QuakeRegions).map((region) => (
            <button
              key={region}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
              onClick={() => handleClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

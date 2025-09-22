import { WiEarthquake } from "react-icons/wi";
import { cn } from "../../utils/cn";

const quakeMagnitudes = [
  { label: "3.0+", value: 3 },
  { label: "4.0+", value: 4 },
  { label: "5.0+", value: 5 },
  { label: "6.0+", value: 6 },
  { label: "7.0+", value: 7 },
];


const magnitudeColors: Record<number, string> = {
  3: "w-2 h-2 bg-green-600 border-green-300",
  4: "w-3 h-3 bg-yellow-500 border-yellow-200",
  5: "w-4 h-4 bg-yellow-600 border-yellow-300",
  6: "w-5 h-5 bg-orange-600 border-orange-300",
  7: "w-6 h-6 bg-red-700 border-red-300",
};

export default function EarthquakeMagDisplay() {
  return (
    <div className="absolute bottom-35 right-5 bg-white p-2 rounded-lg shadow-md z-[1000] flex flex-col">
      <p className="mb-2 text-center font-light text-main">Magnitude levels</p>
      <div className="flex flex-row gap-4">
        {quakeMagnitudes.map((quake) => (
          <div className="flex flex-col gap-2">
            <div key={quake.value} className="flex mt-auto">
              <WiEarthquake
                className={cn(
                  "border-2 rounded-full text-white p-1 ",
                  magnitudeColors[quake.value]
                )}
              />
            </div>
            <div className="mt-auto text-center text-main font-light">
              <p className="self-end">{quake.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

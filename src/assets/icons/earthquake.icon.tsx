import { renderToString } from "react-dom/server";
import { WiEarthquake } from "react-icons/wi";
import L from "leaflet";
import { cn } from "../../utils/cn";

export default function createEarthquakeIcon(
  magnitude: number | null,
  isSelected: boolean
) {
  const getIconClasses = (mag: number) => {
    if (mag >= 7)
      return {
        containerClass: "w-10 h-10 bg-red-600 border-red-300",
        iconClass: "text-white text-2xl",
      };
    if (mag >= 6)
      return {
        containerClass: "w-9 h-9 bg-orange-600 border-orange-300",
        iconClass: "text-white text-xl",
      };
    if (mag >= 5)
      return {
        containerClass: "w-8 h-8 bg-yellow-600 border-yellow-300",
        iconClass: "text-white text-lg",
      };
    if (mag >= 4)
      return {
        containerClass: "w-7 h-7 bg-yellow-500 border-yellow-200",
        iconClass: "text-white text-base",
      };
    return {
      containerClass: "w-6 h-6 bg-green-600 border-green-300",
      iconClass: "text-white text-sm",
    };
  };

  const { containerClass, iconClass } = getIconClasses(magnitude!);

  //leaflet doesnt accept react components so i need to convert this to HTML str
  const renderIcon = renderToString(
    <div
      className={cn(
        "border-2 rounded-full flex items-center justify-center shadow-lg",
        isSelected && "border-white border-10",
        containerClass
      )}
    >
      <WiEarthquake className={iconClass} />
    </div>
  );

  return L.divIcon({
    html: renderIcon,
    className: "custom-earthquake-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}

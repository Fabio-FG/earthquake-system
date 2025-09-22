import { useEarthquakeParams } from "../features/earthquakes/hooks/useEarthquakeParams";
import { cn } from "../utils/cn";

export type OrderString = "time" | "time-asc" | "magnitude" | "magnitude-asc";

export interface OrderFilterProps {
  orderOptions: {
    label: string;
    value: OrderString;
  }[];
  onChange: (option: OrderString) => void;
}

export default function OrderFilter({
  orderOptions,
  onChange,
}: OrderFilterProps) {
  const { params } = useEarthquakeParams();
  return (
    <div className="flex flex-row flex-wrap items-center gap-4 justify-center mb-4 h-auto flex-1 ">
      <div className="flex flex-row gap-2 flex-wrap">
        {orderOptions.map((option, idx) => {
          const isSelected = option.value === params.orderby;

          return (
            <p
              className={cn(
                "text-sm text-teal-500 font-light border-2 shadow border-teal-500 p-2 rounded-2xl",
                isSelected && "bg-teal-500 text-white"
              )}
              key={idx}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </p>
          );
        })}
      </div>
    </div>
  );
}

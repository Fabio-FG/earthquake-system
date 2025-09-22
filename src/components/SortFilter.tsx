import { useEarthquakeParams } from "../features/earthquakes/hooks/useEarthquakeParams";
import { cn } from "../utils/cn";

export interface SortProps {
  sortOptions: {
    label: string;
    value: number;
  }[];
  onChange: (option: number) => void;
}

export default function SortFilter({ sortOptions, onChange }: SortProps) {
  const { params } = useEarthquakeParams();

  const diff =
    new Date(params.endtime).getTime() - new Date(params.starttime).getTime();
  const msConvertToDay = 1000 * 60 * 60 * 24;
  const duration = diff / msConvertToDay;

  return (
    <div className="flex flex-row gap-4 justify-center mt-4 flex-wrap h-auto">
      {sortOptions.map((option, idx) => {
        const isSelected = duration === option.value;

        return (
          <p
            className={cn(
              "p-2 rounded-xl shadow font-light cursor-pointer border-2 border-teal-500 text-teal-500 hover:border-main",
              isSelected && "bg-teal-500 text-white border-teal-500"
            )}
            key={idx}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </p>
        );
      })}
    </div>
  );
}

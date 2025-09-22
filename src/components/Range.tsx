import { useState } from "react";

export interface RangeLevel {
  label: string;
  value: number;
}

export interface RangeProps {
  levels: RangeLevel[];
  defaultValue?: number;
  onChange: (level: RangeLevel) => void;
  minLabel?: string;
  maxLabel?: string;
  showCurrentValue?: boolean;
}

export default function Range({
  levels,
  defaultValue,
  onChange,
  minLabel,
  maxLabel,
  showCurrentValue = true,
}: RangeProps) {
  const getInitialIndex = () => {
    if (defaultValue !== undefined) {
      const index = levels.findIndex((level) => level.value === defaultValue);
      return index !== -1 ? index : 0;
    }
    return 0;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);

  function handleRangeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIndex = Number(event.target.value);
    setCurrentIndex(newIndex);
    onChange(levels[newIndex]);
  }

  const minValue = 0;
  const maxValue = levels.length - 1;
  const currentLevel = levels[currentIndex];

  return (
    <div className="relative mb-6">
      <label htmlFor="labels-range-input">Magnitude</label>

      <input
        id="labels-range-input"
        type="range"
        value={currentIndex}
        min={minValue}
        max={maxValue}
        onChange={handleRangeChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-main range-thumb-style"
      />

      <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
        {minLabel || levels[0].label}
      </span>

      {showCurrentValue && (
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -bottom-6 transform -translate-x-1/2">
          {currentLevel.label}
        </span>
      )}

      <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
        {maxLabel || levels[maxValue].label}
      </span>
    </div>
  );
}

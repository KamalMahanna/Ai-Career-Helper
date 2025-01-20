import React, { useState, useEffect, useRef } from 'react';

interface WordLimitSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function WordLimitSlider({ value, onChange }: WordLimitSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const min = Number(sliderRef.current.min);
      const max = Number(sliderRef.current.max);
      const percentage = ((value - min) / (max - min)) * 100;
      setTooltipPosition(percentage);
    }
  }, [value]);

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Summary Word Limit
      </label>
      <div className="relative pt-5 pb-2">
        {/* Value tooltip */}
        <div 
          className={`absolute -top-1 transform -translate-x-1/2 px-2 py-1 bg-blue-600 text-white text-sm rounded transition-opacity ${showTooltip ? 'opacity-100' : 'opacity-0'}`}
          style={{ left: `${tooltipPosition}%` }}
        >
          {value}
        </div>
        <input
          ref={sliderRef}
          type="range"
          min="50"
          max="500"
          step="50"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>50</span>
          <span>500</span>
        </div>
      </div>
    </div>
  );
}
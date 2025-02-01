import React from 'react';

interface SegmentedButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedButton({ options, value, onChange, className = '' }: SegmentedButtonProps) {
  // Calculate the position of the active segment for the sliding effect
  const activeIndex = options.findIndex(option => option === value);
  const segmentWidth = 100 / options.length;

  return (
    <div className={`relative touch-manipulation ${className}`}>
      <div className="w-full flex items-center">
        {/* Sliding background */}
        <div
          className="absolute inset-0 transition-all duration-300 ease-spring"
          style={{
            left: `${activeIndex * segmentWidth}%`,
            width: `${segmentWidth}%`,
          }}
        >
          <div className="h-full w-[95%] mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-sm" />
        </div>

        {/* Buttons */}
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
              relative z-10 px-4 py-2 text-sm font-medium
              transition-colors duration-200 flex-1 min-w-[90px] text-center
              select-none touch-manipulation active:scale-95
              ${value === option 
                ? 'text-primary font-semibold' 
                : 'text-gray-600 hover:text-primary/90'}
            `}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <span className="capitalize select-none">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

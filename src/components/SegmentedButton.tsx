import React from 'react';

interface SegmentedButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedButton({ options, value, onChange, className = '' }: SegmentedButtonProps) {
  return (
    <div className={`inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 ${className}`}>
      {options.map((option, index) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`
            px-3 py-1.5 text-sm font-medium rounded-md transition-colors
            ${value === option ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}
            ${index === 0 ? 'ml-0' : 'ml-1'}
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
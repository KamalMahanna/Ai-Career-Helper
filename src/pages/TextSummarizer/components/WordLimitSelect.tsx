import React from 'react';

interface WordLimitSelectProps {
  value: number;
  onChange: (value: number) => void;
}

export function WordLimitSelect({ value, onChange }: WordLimitSelectProps) {
  const wordLimits = [50, 100, 200, 300, 500];

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Summary Word Limit
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      >
        {wordLimits.map((limit) => (
          <option key={limit} value={limit}>
            {limit} words
          </option>
        ))}
      </select>
    </div>
  );
}
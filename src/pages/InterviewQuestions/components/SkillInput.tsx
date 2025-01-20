import React from 'react';

interface SkillInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SkillInput({ value, onChange }: SkillInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skills or Position
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your skills (e.g., React, Node.js, Python) or position (e.g., Frontend Developer, Data Scientist)..."
      />
      <p className="mt-2 text-sm text-gray-500">
        For better results, include specific technologies, frameworks, and relevant experience level.
      </p>
    </div>
  );
}
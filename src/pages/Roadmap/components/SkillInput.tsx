import React from 'react';

interface SkillInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SkillInput({ value, onChange }: SkillInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Skill to Learn
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter the skill or technology you want to learn (e.g., React, Machine Learning, Cloud Computing)"
      />
      <p className="mt-2 text-sm text-gray-500">
        Be specific about what you want to learn to get a more detailed roadmap
      </p>
    </div>
  );
}
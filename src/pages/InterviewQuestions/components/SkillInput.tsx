import React from 'react';

interface SkillInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SkillInput({ value, onChange }: SkillInputProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Skills or Position
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field h-32 resize-none transition-all duration-250
          placeholder:text-gray-400"
        placeholder="Enter your skills (e.g., React, Node.js, Python) or position (e.g., Frontend Developer, Data Scientist)..."
      />
      <p className="text-sm text-gray-500/80 italic">
        For better results, include specific technologies, frameworks, and relevant experience level.
      </p>
    </div>
  );
}

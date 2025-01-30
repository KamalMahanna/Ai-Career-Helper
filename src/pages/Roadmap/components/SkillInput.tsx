import React from 'react';

interface SkillInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SkillInput({ value, onChange }: SkillInputProps) {
  return (
    <div className="space-y-3 animate-fade-in">
      <label className="block text-sm font-medium bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-2">
        Skill to Learn
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field h-32 resize-none transition-all duration-250
          placeholder:text-gray-400 hover:shadow-lg hover:shadow-primary/5"
        placeholder="Enter the skill or technology you want to learn (e.g., React, Machine Learning, Cloud Computing)"
      />
      <p className="text-sm text-gray-500/80 italic">
        Be specific about what you want to learn to get a more detailed roadmap
      </p>
    </div>
  );
}

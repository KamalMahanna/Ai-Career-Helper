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
        Your Skills
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-field h-32 resize-none transition-colors duration-250
            placeholder:text-gray-400 hover:shadow-lg hover:shadow-primary/5
            w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-black/5
            border border-white/10 focus:border-primary/50
            focus:ring-2 focus:ring-primary/20 outline-none
            touch-manipulation z-10"
          placeholder="Enter your skills (e.g., React, Node.js, Python, etc.)"
          style={{ willChange: 'transform' }}
        />
      </div>
      <p className="text-sm text-gray-500/80 italic">
        List the technologies and frameworks you're familiar with
      </p>
    </div>
  );
}

import React from 'react';
import { SegmentedButton } from '../../../components/SegmentedButton';
import { Difficulty } from '../types';

interface DifficultySelectProps {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
}

export function DifficultySelect({ value, onChange }: DifficultySelectProps) {
  const options = ['beginner', 'intermediate', 'expert'];

  return (
    <div className="space-y-3 animate-fade-in">
      <label className="block text-sm font-medium bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-2">
        Project Difficulty
      </label>
      <div className="relative z-10 w-fit glass-panel rounded-[20px] p-1 touch-manipulation">
        <SegmentedButton
          options={options}
          value={value}
          onChange={(v) => onChange(v as Difficulty)}
          className="bg-white/30 relative z-10"
        />
      </div>
      <p className="text-sm text-gray-500/80 italic">
        Select the complexity level for project suggestions
      </p>
    </div>
  );
}

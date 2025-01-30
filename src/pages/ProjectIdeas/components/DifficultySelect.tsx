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
      <div className="w-fit glass-panel rounded-[20px] p-1">
        <SegmentedButton
          options={options}
          value={value}
          onChange={(v) => onChange(v as Difficulty)}
          className="bg-white/30"
        />
      </div>
    </div>
  );
}

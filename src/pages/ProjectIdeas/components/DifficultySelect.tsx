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
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Project Difficulty
      </label>
      <div className="flex">
        <SegmentedButton
          options={options}
          value={value}
          onChange={(v) => onChange(v as Difficulty)}
        />
      </div>
    </div>
  );
}
import React from 'react';

interface InterestInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function InterestInput({ value, onChange }: InterestInputProps) {
  return (
    <div className="space-y-3 animate-fade-in">
      <label className="block text-sm font-medium bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-2">
        Your Interests and Hobbies
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field h-48 resize-none transition-all duration-250
          placeholder:text-gray-400 hover:shadow-lg hover:shadow-primary/5"
        placeholder="Tell us about your interests, hobbies, and what you enjoy doing. The more details you provide, the better suggestions we can give!"
      />
      <p className="text-sm text-gray-500/80 italic">
        Include activities you enjoy, subjects you're passionate about, and skills you'd like to develop.
      </p>
    </div>
  );
}

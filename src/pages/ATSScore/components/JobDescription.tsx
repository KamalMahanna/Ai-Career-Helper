import React from 'react';

interface JobDescriptionProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescription({ value, onChange }: JobDescriptionProps) {
  return (
    <div className="mb-6 animate-fade-in">
      <label className="block text-sm font-medium bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-2">
        Job Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field h-48 resize-none transition-all duration-250
          placeholder:text-gray-400 hover:shadow-lg hover:shadow-primary/5"
        placeholder="Paste the job description here..."
      />
    </div>
  );
}

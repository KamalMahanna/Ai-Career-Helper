import React from 'react';

interface InterestInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function InterestInput({ value, onChange }: InterestInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your Interests and Hobbies
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Tell us about your interests, hobbies, and what you enjoy doing. The more details you provide, the better suggestions we can give!"
      />
      <p className="mt-2 text-sm text-gray-500">
        Include activities you enjoy, subjects you're passionate about, and skills you'd like to develop.
      </p>
    </div>
  );
}
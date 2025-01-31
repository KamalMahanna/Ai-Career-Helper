import React from 'react';
import { Trash2 } from 'lucide-react';

interface ClearButtonProps {
  onClick: () => void;
}

export function ClearButton({ onClick }: ClearButtonProps) {
  return (
    <button
      onClick={onClick}
      className="glass-button p-2 group"
      title="Clear all"
    >
      <Trash2 
        size={20} 
        className="text-gray-400 group-hover:text-red-500 transition-all duration-300 
          group-hover:scale-110" 
      />
    </button>
  );
}

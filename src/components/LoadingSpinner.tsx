import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full border-4 border-primary/30 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin-slow"></div>
        <div className="absolute w-full h-full rounded-full bg-gradient-to-t from-primary/10 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
}

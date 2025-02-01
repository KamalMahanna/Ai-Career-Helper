import React, { ButtonHTMLAttributes } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  retrySeconds?: number;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', isLoading = false, variant = 'primary', fullWidth = false, disabled, retrySeconds = 0, ...props }, ref) => {
    // Base styles
    const baseStyles = 'relative px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden inline-flex items-center justify-center min-w-fit';
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/40',
      secondary: 'bg-secondary text-white shadow-lg shadow-secondary/30 hover:shadow-secondary/40',
      outline: 'border-2 border-primary text-primary hover:bg-primary/10'
    };

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
        disabled={isLoading || disabled || retrySeconds > 0}
        {...props}
      >
        <div className="relative flex items-center justify-center">
          {retrySeconds > 0 ? (
            <span className="flex items-center justify-center gap-2">
              Retry in: {retrySeconds}s
            </span>
          ) : (
            <>
              <span 
                className={`flex items-center justify-center gap-2 transition-all duration-300 transform ${
                  isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                {children}
              </span>
              
              <div 
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform ${
                  isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{ width: '24px', height: '24px' }}
              >
                <LoadingSpinner className="text-current" />
              </div>
            </>
          )}
        </div>
        
        {/* Hover overlay with ripple effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 hover:opacity-100 dark:bg-black/10" />
        </div>
        
        {/* Button pressed flash effect */}
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-75 active:opacity-100" />
      </button>
    );
  }
);

Button.displayName = 'Button';

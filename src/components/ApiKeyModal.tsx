import React, { useState, useEffect } from 'react';
import { KeyRound, X } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ isOpen, onClose }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setError('');
      setIsProcessing(false);
      // Delay setting visibility for enter animation
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      const trimmedKey = apiKey.trim();
      if (!trimmedKey) {
        setError('API key is required');
        return;
      }

      // Store the key
      localStorage.setItem('gemini_api_key', trimmedKey);
      
      // Animate out before closing
      setIsVisible(false);
      setTimeout(() => {
        onClose();
        // Refresh the page to ensure new key is used
        window.location.reload();
      }, 300);
      
    } catch (err) {
      setError('Failed to save API key. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50
                  transition-all duration-300 ease-out
                  ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
      <div 
        className={`backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/10 
                    rounded-2xl p-6 w-full max-w-md relative
                    transition-all duration-300 transform
                    ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        style={{ willChange: 'transform' }}
      >
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 
                     transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          style={{ willChange: 'transform' }}
        >
          <X size={20} />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <KeyRound className={`text-primary w-6 h-6 transition-transform duration-300
                              ${isProcessing ? 'rotate-12' : ''}`} />
          <h2 className="text-xl font-semibold">Enter API Key</h2>
        </div>

        <p className={`text-gray-600 dark:text-gray-400 text-sm mb-4
                      transition-all duration-300 transform
                      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          Please enter your Gemini API key to use this feature. Your key will be stored locally on your device.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full px-4 py-2 rounded-lg bg-white/5 dark:bg-black/5 
                     border border-white/10 focus:border-primary/50 
                     focus:ring-2 focus:ring-primary/20 outline-none
                     transition-all duration-300 transform hover:scale-[1.01]"
            style={{ willChange: 'transform' }}
            required
          />
          
          {error && (
            <p className="text-red-500 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              {error}
            </p>
          )}
          
          <button
            type="submit"
            disabled={!apiKey.trim() || isProcessing}
            className="w-full px-6 py-2 rounded-lg bg-primary/10 text-primary
                     hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 transform hover:scale-[1.02]
                     flex items-center justify-center gap-2"
            style={{ willChange: 'transform' }}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-primary border-t-transparent 
                               rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              'Save API Key'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

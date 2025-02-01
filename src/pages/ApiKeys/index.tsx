import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { KeyRound, Trash2, AlertCircle, Info } from 'lucide-react';
import { Button } from '../../components/Button';

function ApiKeys() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle ESC key to close guide
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowGuide(false);
    };
    if (showGuide) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [showGuide]);

  useEffect(() => {
    // Get API key from localStorage
    const storedApiKey = localStorage.getItem('gemini_api_key');
    setApiKey(storedApiKey);
    
    // Check URL parameters for error
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get('error');
    
    if (error === 'invalid_key' || error === 'rate_limit') {
      setShowError(true);
      const message = error === 'invalid_key'
        ? 'The API key you provided is invalid. Please ensure you have copied the correct key from Google AI Studio.'
        : 'API rate limit exceeded. Please wait for 60 seconds before making another request.';
      setErrorMessage(message);
      
      // Remove error parameter from URL
      searchParams.delete('error');
      const newUrl = searchParams.toString()
        ? `${location.pathname}?${searchParams.toString()}`
        : location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      // Clear the error after 10 seconds
      const timer = setTimeout(() => {
        setShowError(false);
        setErrorMessage('');
      }, 10000);
      
      return () => clearTimeout(timer);
    }

    // Simulate loading for smoother transitions
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(loadTimer);
  }, [location.search, location.pathname]);

  const handleSaveKey = () => {
    if (inputValue.trim()) {
      localStorage.setItem('gemini_api_key', inputValue.trim());
      setApiKey(inputValue.trim());
      setInputValue('');
      navigate(-1); // Go back to previous page
    }
  };

  const handleDeleteKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey(null);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div 
        className={`backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/10 
                   rounded-2xl p-6 shadow-lg transition-opacity duration-500 ease-out 
                   ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        {showError && errorMessage && (
          <div 
            className="mb-4 p-4 rounded-lg bg-red-500/10 text-red-500 flex items-center gap-2
                     animate-in fade-in slide-in-from-top-4 duration-300"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex items-center mb-6">
          <KeyRound className={`w-6 h-6 text-primary mr-3 transition-transform duration-300 
                              ${isLoading ? 'scale-95' : 'scale-100'}`} />
          <h1 className="text-2xl font-semibold">API Keys</h1>
        </div>

        <div className="space-y-6">
          {!apiKey ? (
            <div className={`space-y-4 pb-2 transition-all duration-300 
                           ${showGuide ? 'border-b border-white/10' : ''}`}>
              <p className="text-gray-600 dark:text-gray-400 animate-in fade-in duration-500">
                Please enter your Gemini API key. Your key will be stored locally on your device.
              </p>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                    <input
                    type="password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your API key"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 dark:bg-black/5 
                             border border-white/10 focus:border-primary/50 
                             focus:ring-2 focus:ring-primary/20 outline-none
                             transition-colors duration-300
                             touch-manipulation z-10"
                    style={{ willChange: 'transform' }}
                  />
                  <button
                    onClick={() => setShowGuide(!showGuide)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2
                             text-gray-400 hover:text-primary hover:scale-110
                             transition-all duration-300"
                    style={{ willChange: 'transform' }}
                    title="How to get an API key"
                  >
                    <Info className={`w-5 h-5 transition-transform duration-300 
                                    ${showGuide ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <Button
                  onClick={handleSaveKey}
                  disabled={!inputValue.trim()}
                  variant="outline"
                  className="transform hover:scale-105 transition-transform duration-300"
                  style={{ willChange: 'transform' }}
                >
                  <span>Save</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
              <p className="text-gray-600 dark:text-gray-400">
                Your API key is securely stored in your browser.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-2 rounded-lg bg-white/5 dark:bg-black/5 
                              border border-white/10 transform hover:scale-[1.01] transition-transform duration-300"
                     style={{ willChange: 'transform' }}>
                  <span className="text-gray-600 dark:text-gray-400">
                    ••••••••{apiKey.slice(-4)}
                  </span>
                </div>
                <Button
                  onClick={handleDeleteKey}
                  variant="secondary"
                  className="transform hover:scale-105 transition-transform duration-300"
                  style={{ willChange: 'transform' }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>
          )}

          {/* API Key Guide - Integrated */}
          <div 
            className={`transform transition-all duration-500 ease-out overflow-hidden
                       ${showGuide 
                         ? 'opacity-100 max-h-[500px] translate-y-0' 
                         : 'opacity-0 max-h-0 -translate-y-4'}`}
            style={{ willChange: 'transform, opacity, max-height' }}
          >
            <div className="space-y-3 animate-in fade-in-50 duration-500">
              <p className="text-gray-600 dark:text-gray-400 flex gap-2">
                <span className="text-primary font-semibold min-w-[1.5rem] text-right">1.</span>
                <span>
                  Visit the{' '}
                  <a href="https://makersuite.google.com/app/apikey" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-primary hover:underline transform hover:scale-105 inline-block transition-transform duration-300"
                     style={{ willChange: 'transform' }}>
                    Google AI Studio
                  </a>
                  {' '}and sign in with your Google account.
                </span>
              </p>

              <p className="text-gray-600 dark:text-gray-400 flex gap-2">
                <span className="text-primary font-semibold min-w-[1.5rem] text-right">2.</span>
                <span>Click on "Get API key" button and either create a new key or select an existing one.</span>
              </p>

              <p className="text-gray-600 dark:text-gray-400 flex gap-2">
                <span className="text-primary font-semibold min-w-[1.5rem] text-right">3.</span>
                <span>Copy your API key and paste it into the input field on this page.</span>
              </p>

              <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-white/10 transform hover:scale-[1.01] transition-transform duration-300"
                   style={{ willChange: 'transform' }}>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  🔒 Your API key is stored locally on your device and is never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ApiKeys as default };

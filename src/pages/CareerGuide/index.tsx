import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Compass } from 'lucide-react';
import { InterestInput } from './components/InterestInput';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { Button } from '../../components/Button';
import { useApiKey } from '../../hooks/useApiKey';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useRetryTimer } from '../../hooks/useRetryTimer';

function CareerGuide() {
  const [interests, setInterests] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { checkApiKey } = useApiKey();
  const resultRef = useRef<HTMLDivElement>(null);
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    if (result && !isLoading) {
      scrollToElement(resultRef.current, { offset: 80, delay: 150 });
    }
  }, [result, isLoading, scrollToElement]);

  const { retrySeconds, handleResourceExhausted } = useRetryTimer({
    onRetry: async () => {
      await handleGetSuggestions();
    }
  });

  const handleGetSuggestions = async () => {
    setError(null);
    if (!checkApiKey()) return;
    if (!interests.trim()) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/career-guide', {
        data: { interests }
      });
      setResult(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Resource has been exhausted') || 
            error.message.includes('rate limit exceeded')) {
          handleResourceExhausted();
        }
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      setResult('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInterests('');
    setResult('');
    setError(null);
  };

  return (
    <div className="section-container max-w-4xl">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent 
          bg-clip-text text-transparent mb-4">
          Career Path Guide
        </h1>
        <p className="text-xl text-gray-600 glass-panel inline-block px-6 py-2 rounded-full">
          Discover career paths based on your interests and hobbies
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg animate-fade-in">
          {error}
        </div>
      )}

      <div className="glass-panel rounded-2xl p-8 animate-fade-in">
        <InterestInput value={interests} onChange={setInterests} />

        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            onClick={handleGetSuggestions}
            disabled={!interests.trim()}
            isLoading={isLoading}
            retrySeconds={retrySeconds}
          >
            <Compass className="w-4 h-4" />
            <span>Get Suggestions</span>
          </Button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {result && (
        <div ref={resultRef} className="mt-8 glass-panel rounded-2xl p-8 animate-fade-in">
          <ResultSection content={result} />
        </div>
      )}
    </div>
  );
}

export default CareerGuide;

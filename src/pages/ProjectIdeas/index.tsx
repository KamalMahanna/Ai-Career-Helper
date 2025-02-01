import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { SkillInput } from './components/SkillInput';
import { DifficultySelect } from './components/DifficultySelect';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { Button } from '../../components/Button';
import { useApiKey } from '../../hooks/useApiKey';
import { Difficulty } from './types';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useRetryTimer } from '../../hooks/useRetryTimer';

function ProjectIdeas() {
  const [skills, setSkills] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
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
    if (!skills.trim()) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/project-ideas', {
        data: { skills, difficulty }
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
    setSkills('');
    setDifficulty('beginner');
    setResult('');
    setError(null);
  };

  return (
    <div className="section-container max-w-4xl">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-0">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-8 sm:mb-12 animate-fade-in relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent 
          bg-clip-text text-transparent mb-4">
          Project Ideas
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 glass-panel inline-block px-4 sm:px-6 py-2 rounded-full">
          Get personalized project suggestions based on your skills
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg animate-fade-in relative z-10">
          {error}
        </div>
      )}

      <div className="glass-panel rounded-2xl p-6 sm:p-8 animate-fade-in relative z-10">
        <div className="space-y-8 touch-manipulation">
          <SkillInput value={skills} onChange={setSkills} />
          <DifficultySelect value={difficulty} onChange={setDifficulty} />

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handleGetSuggestions}
              disabled={!skills.trim()}
              isLoading={isLoading}
              retrySeconds={retrySeconds}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Get Project Ideas</span>
            </Button>
            <ClearButton onClick={handleClear} />
          </div>
        </div>
      </div>

      {result && (
        <div ref={resultRef} className="mt-8 glass-panel rounded-2xl p-6 sm:p-8 animate-fade-in relative z-10">
          <ResultSection content={result} />
        </div>
      )}
    </div>
  );
}

export default ProjectIdeas;

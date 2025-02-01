import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { SkillInput } from './components/SkillInput';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { Button } from '../../components/Button';
import { useApiKey } from '../../hooks/useApiKey';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useRetryTimer } from '../../hooks/useRetryTimer';

function InterviewQuestions() {
  const [skills, setSkills] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
      await handleGenerateQuestions();
    }
  });

  const handleGenerateQuestions = async () => {
    if (!skills.trim()) return;
    if (!checkApiKey()) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await makeApiRequest('/interview-questions', {
        data: { skills }
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
        setError('Failed to generate interview questions');
      }
      setResult('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSkills('');
    setResult('');
    setError('');
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
          Interview Questions
        </h1>
        <p className="text-xl text-gray-600 glass-panel inline-block px-6 py-2 rounded-full">
          Generate relevant interview questions based on your skill set
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-8 animate-fade-in">
        <SkillInput value={skills} onChange={setSkills} />

        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            onClick={handleGenerateQuestions}
            disabled={!skills.trim()}
            isLoading={isLoading}
            retrySeconds={retrySeconds}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Generate Questions</span>
          </Button>
          <ClearButton onClick={handleClear} />
        </div>

        {error && (
          <div className="mt-6 glass-panel bg-red-50/50 p-4 rounded-xl border border-red-200/50 text-red-600">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div ref={resultRef} className="mt-8 glass-panel rounded-2xl p-8 animate-fade-in">
          <ResultSection content={result} />
        </div>
      )}
    </div>
  );
}

export default InterviewQuestions;

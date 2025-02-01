import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigateWithError } from '../../hooks/useNavigateWithError';
import { Upload } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { JobDescription } from './components/JobDescription';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { Button } from '../../components/Button';
import { useApiKey } from '../../hooks/useApiKey';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useRetryTimer } from '../../hooks/useRetryTimer';

function ATSScore() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
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

  const { handleApiError } = useNavigateWithError();

  const { retrySeconds, handleResourceExhausted } = useRetryTimer({
    onRetry: async () => {
      await handleAnalyze();
    }
  });

  const handleAnalyze = async () => {
    setError(null);
    if (!checkApiKey()) return;
    if (!file || !jobDescription) return;
    
    setIsLoading(true);
    try {
      const response = await makeApiRequest('/ats-score', {
        files: [file],
        data: { jobDescription }
      });
      setResult(response);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Resource has been exhausted') || 
            error.message.includes('rate limit exceeded')) {
          handleResourceExhausted();
        } else {
          try {
            handleApiError(error);
          } catch (e) {
            setError(error.message);
          }
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setJobDescription('');
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
          ATS Score & Resume Optimizer
        </h1>
        <p className="text-xl text-gray-600 glass-panel inline-block px-6 py-2 rounded-full">
          Check how well your resume matches the job description
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg animate-fade-in">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <FileUpload file={file} onFileChange={setFile} />
        <JobDescription value={jobDescription} onChange={setJobDescription} />

        <div className="flex items-center justify-center gap-4 animate-fade-in">
          <Button
            onClick={handleAnalyze}
            disabled={!file || !jobDescription}
            isLoading={isLoading}
            retrySeconds={retrySeconds}
          >
            <Upload className="w-4 h-4" />
            <span>Analyze Resume</span>
          </Button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {result && (
        <div ref={resultRef} className="mt-8 animate-fade-in">
          <ResultSection className="glass-panel p-6 rounded-xl" content={result} />
        </div>
      )}
    </div>
  );
}

export default ATSScore;

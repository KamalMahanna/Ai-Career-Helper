import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { Button } from '../../components/Button';
import { useApiKey } from '../../hooks/useApiKey';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useRetryTimer } from '../../hooks/useRetryTimer';

function TextSummarizer() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
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
      await handleSummarize();
    }
  });

  const handleSummarize = async () => {
    setError(null);
    if (!checkApiKey()) return;
    if (!text && !url && !file) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/summarize', {
        files: file ? [file] : [],
        data: { text, url }
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
    setText('');
    setUrl('');
    setFile(null);
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
          Text Summarizer
        </h1>
        <p className="text-xl text-gray-600 glass-panel inline-block px-6 py-2 rounded-full">
          Generate concise summaries from text, URLs, or PDF files
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg animate-fade-in">
          {error}
        </div>
      )}

      <div className="glass-panel rounded-2xl p-8 animate-fade-in">
        <InputSection
          text={text}
          onTextChange={setText}
          url={url}
          onUrlChange={setUrl}
          file={file}
          onFileChange={setFile}
        />

        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            onClick={handleSummarize}
            disabled={!text && !url && !file}
            isLoading={isLoading}
            retrySeconds={retrySeconds}
          >
            <FileText className="w-4 h-4" />
            <span>Summarize</span>
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

export default TextSummarizer;

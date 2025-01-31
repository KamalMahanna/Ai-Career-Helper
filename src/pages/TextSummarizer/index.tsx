import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function TextSummarizer() {
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text && !url && !file) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/summarize', {
        files: file ? [file] : [],
        data: { text, url }
      });
      setResult(response);
    } catch (error) {
      console.error('Summarization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setUrl('');
    setFile(null);
    setResult('');
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

      <div className="glass-panel rounded-2xl p-8 animate-fade-in">
        <InputSection
          text={text}
          onTextChange={setText}
          url={url}
          onUrlChange={setUrl}
          file={file}
          onFileChange={setFile}
        />

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handleSummarize}
            disabled={(!text && !url && !file) || isLoading}
            className="primary-button flex items-center justify-center group"
          >
            <FileText className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
            Summarize
          </button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {isLoading && (
        <div className="mt-8">
          <LoadingSpinner />
        </div>
      )}
      {result && (
        <div className="mt-8 glass-panel rounded-2xl p-8 animate-fade-in">
          <ResultSection content={result} />
        </div>
      )}
    </div>
  );
}

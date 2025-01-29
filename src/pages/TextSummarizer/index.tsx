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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Summarizer</h1>
        <p className="text-gray-600">Generate concise summaries from text, URLs, or PDF files</p>
      </div>

      <div className="space-y-6">
        <InputSection
          text={text}
          onTextChange={setText}
          url={url}
          onUrlChange={setUrl}
          file={file}
          onFileChange={setFile}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handleSummarize}
            disabled={(!text && !url && !file) || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-4 h-4 mr-2" />
            Summarize
          </button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {result && <ResultSection content={result} />}
    </div>
  );
}

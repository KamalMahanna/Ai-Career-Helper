import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { JobDescription } from './components/JobDescription';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function ATSScore() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !jobDescription) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/ats-score', {
        files: [file],
        data: { jobDescription }
      });
      setResult(response);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setJobDescription('');
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
          ATS Score & Resume Optimizer
        </h1>
        <p className="text-xl text-gray-600 glass-panel inline-block px-6 py-2 rounded-full">
          Check how well your resume matches the job description
        </p>
      </div>

      <div className="space-y-8">
        <FileUpload file={file} onFileChange={setFile} />
        <JobDescription value={jobDescription} onChange={setJobDescription} />

        <div className="flex items-center gap-4 animate-fade-in">
          <button
            onClick={handleAnalyze}
            disabled={!file || !jobDescription || isLoading}
            className="primary-button flex items-center justify-center group"
          >
            <Upload className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
            Analyze Resume
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
        <div className="mt-8 animate-fade-in">
          <ResultSection className="glass-panel p-6 rounded-xl" content={result} />
        </div>
      )}
    </div>
  );
}

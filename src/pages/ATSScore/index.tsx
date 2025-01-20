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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ATS Score & Resume Optimizer</h1>
        <p className="text-gray-600">Check how well your resume matches the job description</p>
      </div>

      <div className="space-y-6">
        <FileUpload file={file} onFileChange={setFile} />
        <JobDescription value={jobDescription} onChange={setJobDescription} />

        <div className="flex items-center gap-4">
          <button
            onClick={handleAnalyze}
            disabled={!file || !jobDescription || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 mr-2" />
            Analyze Resume
          </button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {result && <ResultSection className="mt-4" content={result} />}
    </div>
  );
}

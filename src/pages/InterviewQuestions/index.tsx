import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { SkillInput } from './components/SkillInput';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function InterviewQuestions() {
  const [skills, setSkills] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateQuestions = async () => {
    if (!skills.trim()) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await makeApiRequest('/interview-questions', {
        data: { skills }
      });
      setResult(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate interview questions';
      setError(message);
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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Questions</h1>
        <p className="text-gray-600">Generate relevant interview questions based on your skill set</p>
      </div>

      <div className="space-y-6">
        <SkillInput value={skills} onChange={setSkills} />

        <div className="flex items-center gap-4">
          <button
            onClick={handleGenerateQuestions}
            disabled={!skills.trim() || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Generate Questions
          </button>
          <ClearButton onClick={handleClear} />
        </div>

        {error && (
          <div className="text-red-600 bg-red-50 p-4 rounded-md">
            {error}
          </div>
        )}
      </div>

      {isLoading && <LoadingSpinner />}
      {result && <ResultSection content={result} />}
    </div>
  );
}
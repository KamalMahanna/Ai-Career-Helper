import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { InterestInput } from './components/InterestInput';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function CareerGuide() {
  const [interests, setInterests] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestions = async () => {
    if (!interests.trim()) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/career-guide', {
        data: { interests }
      });
      setResult(response);
    } catch (error) {
      console.error('Failed to get career suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInterests('');
    setResult('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Path Guide</h1>
        <p className="text-gray-600">Discover career paths based on your interests and hobbies</p>
      </div>

      <div className="space-y-6">
        <InterestInput value={interests} onChange={setInterests} />

        <div className="flex items-center gap-4">
          <button
            onClick={handleGetSuggestions}
            disabled={!interests.trim() || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Compass className="w-4 h-4 mr-2" />
            Get Suggestions
          </button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {result && <ResultSection content={result} />}
    </div>
  );
}
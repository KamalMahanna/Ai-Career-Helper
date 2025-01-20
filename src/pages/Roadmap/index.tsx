import React, { useState } from 'react';
import { Map } from 'lucide-react';
import { SkillInput } from './components/SkillInput';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export function Roadmap() {
  const [skill, setSkill] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateRoadmap = async () => {
    if (!skill.trim()) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/roadmap', {
        data: { skill }
      });
      setResult(response);
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSkill('');
    setResult('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Roadmap</h1>
        <p className="text-gray-600">Get a detailed roadmap with resources for your learning journey</p>
      </div>

        <SkillInput value={skill} onChange={setSkill} />

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleGenerateRoadmap}
            disabled={!skill.trim() || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Map className="w-4 h-4 mr-2" />
            Generate Roadmap
          </button>
          <ClearButton onClick={handleClear} />
        </div>

      {isLoading && <LoadingSpinner />}
      {result && <ResultSection content={result} />}
    </div>
  );
}

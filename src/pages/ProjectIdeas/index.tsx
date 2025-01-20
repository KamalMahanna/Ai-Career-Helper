import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { SkillInput } from './components/SkillInput';
import { DifficultySelect } from './components/DifficultySelect';
import { ResultSection } from './components/ResultSection';
import { ClearButton } from '../../components/ClearButton';
import { makeApiRequest } from '../../utils/api';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Difficulty } from './types';

export function ProjectIdeas() {
  const [skills, setSkills] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestions = async () => {
    if (!skills.trim()) return;

    setIsLoading(true);
    try {
      const response = await makeApiRequest('/project-ideas', {
        data: { skills, difficulty }
      });
      setResult(response);
    } catch (error) {
      console.error('Failed to get project suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSkills('');
    setDifficulty('beginner');
    setResult('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Ideas</h1>
        <p className="text-gray-600">Get personalized project suggestions based on your skills</p>
      </div>

      <div className="space-y-6">
        <SkillInput value={skills} onChange={setSkills} />
        <DifficultySelect value={difficulty} onChange={setDifficulty} />

        <div className="flex items-center gap-4">
          <button
            onClick={handleGetSuggestions}
            disabled={!skills.trim() || isLoading}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Get Project Ideas
          </button>
          <ClearButton onClick={handleClear} />
        </div>
      </div>

      {isLoading && <LoadingSpinner />}
      {result && <ResultSection content={result} />}
    </div>
  );
}
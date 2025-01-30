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
    <div className="section-container max-w-4xl">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent 
          bg-clip-text text-transparent mb-4">
          Project Ideas
        </h1>
        <p className="text-xl text-gray-600 glass-panel inline-block px-6 py-2 rounded-full">
          Get personalized project suggestions based on your skills
        </p>
      </div>

      <div className="glass-panel rounded-2xl p-8 animate-fade-in">
        <div className="space-y-8">
          <SkillInput value={skills} onChange={setSkills} />
          <DifficultySelect value={difficulty} onChange={setDifficulty} />

          <div className="flex items-center gap-4">
            <button
              onClick={handleGetSuggestions}
              disabled={!skills.trim() || isLoading}
              className="primary-button flex items-center justify-center group"
            >
              <Lightbulb className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Get Project Ideas
            </button>
            <ClearButton onClick={handleClear} />
          </div>
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

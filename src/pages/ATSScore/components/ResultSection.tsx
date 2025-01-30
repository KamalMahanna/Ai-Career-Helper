import React from 'react';
import { MarkdownRenderer } from '../../../components/MarkdownRenderer';

interface ResultSectionProps {
  content: string;
  className?: string;
}

export function ResultSection({ content, className = '' }: ResultSectionProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-6">
        Analysis Results
      </h2>
      <div className="prose prose-emerald max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}

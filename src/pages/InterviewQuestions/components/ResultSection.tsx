import React from 'react';
import { MarkdownRenderer } from '../../../components/MarkdownRenderer';

interface ResultSectionProps {
  content: string;
}

export function ResultSection({ content }: ResultSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary 
        bg-clip-text text-transparent mb-6">
        Interview Questions
      </h2>
      <div className="prose prose-indigo max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}

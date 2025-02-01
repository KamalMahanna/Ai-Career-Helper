import React from 'react';
import { MarkdownRenderer } from '../../../components/MarkdownRenderer';

interface ResultSectionProps {
  content: string;
}

export function ResultSection({ content }: ResultSectionProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggested Projects</h2>
      <MarkdownRenderer content={content} />
    </>
  );
}

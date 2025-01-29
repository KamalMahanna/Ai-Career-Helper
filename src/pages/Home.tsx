import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, FileSearch, Book, MessageSquare, 
  Lightbulb, Map
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'ATS Score & Resume Optimizer',
    description: 'Check your resume\'s ATS score and get suggestions for improvement',
    link: '/ats-score'
  },
  {
    icon: FileSearch,
    title: 'Text Summarizer',
    description: 'Summarize articles, PDFs, or text with customizable word limits',
    link: '/summarizer'
  },
  {
    icon: Book,
    title: 'Career Path Guide',
    description: 'Get personalized career path suggestions based on your interests',
    link: '/career-guide'
  },
  {
    icon: MessageSquare,
    title: 'Interview Questions',
    description: 'Generate relevant interview questions based on your skill set',
    link: '/interview'
  },
  {
    icon: Lightbulb,
    title: 'Project Ideas',
    description: 'Get project suggestions based on your skills and experience level',
    link: '/project-ideas'
  },
  {
    icon: Map,
    title: 'Learning Roadmap',
    description: 'Get detailed roadmaps with resources for your learning journey',
    link: '/roadmap'
  }
];

export function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your AI Career Assistant
        </h1>
        <p className="text-xl text-gray-600">
          Empowering your career journey with AI-powered tools and guidance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <Icon className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
import { 
  FileText, FileSearch, Book, MessageSquare, 
  Lightbulb, Map
} from 'lucide-react';

export const features = [
  {
    icon: FileText,
    title: 'ATS Score & Resume Optimizer',
    description: 'Check your resume\'s ATS score and get suggestions for improvement',
    href: '/ats-score'
  },
  {
    icon: FileSearch,
    title: 'Text Summarizer',
    description: 'Summarize articles, PDFs, or text with customizable word limits',
    href: '/summarizer'
  },
  {
    icon: Book,
    title: 'Career Path Guide',
    description: 'Get personalized career path suggestions based on your interests',
    href: '/career-guide'
  },
  {
    icon: MessageSquare,
    title: 'Interview Questions',
    description: 'Generate relevant interview questions based on your skill set',
    href: '/interview'
  },
  {
    icon: Lightbulb,
    title: 'Project Ideas',
    description: 'Get project suggestions based on your skills and experience level',
    href: '/project-ideas'
  },
  {
    icon: Map,
    title: 'Learning Roadmap',
    description: 'Get detailed roadmaps with resources for your learning journey',
    href: '/roadmap'
  }
] as const;

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
    <div className="section-container relative min-h-[90vh] flex flex-col">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
          bg-accent/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero section */}
      <div className="text-center mb-20 animate-fade-in pt-8">
        <div className="relative inline-block mb-8">
          {/* Multiple gradient layers for enhanced effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-secondary 
            opacity-50 blur-2xl rounded-full"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-primary to-accent 
            opacity-30 blur-xl rounded-full"></div>
          
          <h1 className="relative text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="inline-block animate-shine bg-clip-text text-transparent 
              filter drop-shadow-sm hover:scale-[1.02] transition-all duration-500">
              Your AI Career Assistant
            </span>
          </h1>
        </div>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 
            rounded-2xl blur-xl -z-10"></div>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto glass-panel 
            rounded-2xl py-6 px-8 leading-relaxed">
            Empowering your career journey with AI-powered tools and guidance
          </p>
        </div>
      </div>

      {/* Features grid with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-auto">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="group relative block glass-panel rounded-2xl p-6 overflow-hidden animate-fade-in
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Decorative background gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-secondary/5 
                rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20
                  transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-lg">
                  <Icon className="h-6 w-6 text-primary transition-colors duration-300" />
                </div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent 
                  bg-clip-text text-transparent">
                  {feature.title}
                </h2>
              </div>
              <p className="text-gray-600/90 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { FeatureCard } from './components/FeatureCard';
import { features } from './data/features';

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
        {features.map((feature) => (
          <FeatureCard
            key={feature.href}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            href={feature.href}
          />
        ))}
      </div>
    </div>
  );
}

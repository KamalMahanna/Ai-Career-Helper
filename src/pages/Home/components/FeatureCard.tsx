import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <Link
      to={href}
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
          {title}
        </h2>
      </div>
      <p className="text-gray-600/90 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
        {description}
      </p>
    </Link>
  );
}

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
      className="block bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
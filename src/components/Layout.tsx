import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, FileText, FileSearch, Book, MessageSquare, 
  Lightbulb, Map, Menu, X 
} from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useClickOutside(sidebarRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'ATS Score', href: '/ats-score', icon: FileText },
    { name: 'Text Summarizer', href: '/summarizer', icon: FileSearch },
    { name: 'Career Guide', href: '/career-guide', icon: Book },
    { name: 'Interview Questions', href: '/interview', icon: MessageSquare },
    { name: 'Project Ideas', href: '/project-ideas', icon: Lightbulb },
    { name: 'Roadmap', href: '/roadmap', icon: Map },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-40
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-8">AI Assistant</h1>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${location.pathname === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, FileText, FileSearch, Book, MessageSquare, 
  Lightbulb, Map, Menu, X 
} from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';
import { useThemeSwitch } from '../hooks/useThemeSwitch';

export function Layout({ children }: { children: React.ReactNode }) {
  useThemeSwitch(); // Apply theme based on current route
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
    <div className="min-h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-full glass-panel
          hover:scale-105 active:scale-95 transition-all duration-250"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 glass-panel border-r border-white/20
          transform transition-transform duration-300 ease-out z-40
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary 
            bg-clip-text text-transparent mb-8">
            AI Assistant
          </h1>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
                    transition-all duration-250 group
                    ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-500/5 hover:text-primary'}
                  `}
                >
                  <Icon 
                    className={`mr-3 h-5 w-5 transition-transform duration-250
                      ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}
                      group-hover:scale-110`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 min-h-screen">
        <main className="p-6 sm:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}

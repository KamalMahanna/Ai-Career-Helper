import React, { useRef, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, FileText, FileSearch, Book, MessageSquare, 
  Lightbulb, Map, Menu, X, KeyRound 
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
    { name: 'API Keys', href: '/api-keys', icon: KeyRound },
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-3 right-4 z-50 p-2 rounded-lg
          backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/10
          hover:scale-105 active:scale-95 transition-all duration-250"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Navigation Bar */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Desktop Navigation */}
        <div
          ref={sidebarRef}
          className={`
            fixed top-6 left-1/2 -translate-x-1/2 pointer-events-auto
            backdrop-blur-md bg-white/5 dark:bg-black/5
            border border-white/10 shadow-lg rounded-full
            transition-all duration-300 ease-out
            hidden lg:block
          `}
        >
          <div className="px-6 py-2">
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center px-3 py-1.5 text-sm font-medium rounded-full
                      transition-all duration-300 group hover:scale-105
                      ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-500/5 hover:text-primary'}
                    `}
                  >
                    <Icon 
                      className={`h-5 w-5 transition-transform duration-250
                        ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}
                        group-hover:scale-110`} 
                    />
                    <span className={`
                      ml-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease
                      ${isActive ? 'ml-2 max-w-[100px] opacity-100' : 'max-w-0 opacity-0'}
                      group-hover:ml-2 group-hover:max-w-[100px] group-hover:opacity-100
                      [transform:translate3d(0,0,0)] animate-wobble-hover
                    `}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`
            lg:hidden fixed top-16 left-4 right-4 pointer-events-auto
            backdrop-blur-md bg-white/10 dark:bg-black/10
            border border-white/20 shadow-lg rounded-2xl
            transition-all duration-300 ease-out
            touch-manipulation
            ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          <nav className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-base font-medium rounded-lg
                    transition-all duration-300 group
                    active:scale-[0.98] touch-manipulation
                    ${isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-500/5 hover:text-primary'}
                  `}
                >
                  <Icon 
                    className={`h-5 w-5 transition-transform duration-250
                      ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}
                      group-hover:scale-110`} 
                  />
                  <span className={`
                    ml-2 transition-all duration-300 ease
                    ${isActive ? 'opacity-100' : 'opacity-70'}
                  `}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-16 min-h-screen">
        <main className="p-6 sm:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}

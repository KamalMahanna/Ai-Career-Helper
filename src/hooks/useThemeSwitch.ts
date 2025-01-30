import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useThemeSwitch() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Remove existing theme
    const root = document.documentElement;
    root.removeAttribute('data-theme');

    // Set new theme based on route
    const route = pathname.split('/')[1];
    switch (route) {
      case 'ats-score':
        root.setAttribute('data-theme', 'ats-score');
        break;
      case 'summarizer':
        root.setAttribute('data-theme', 'summarizer');
        break;
      case 'career-guide':
        root.setAttribute('data-theme', 'career-guide');
        break;
      case 'interview':
        root.setAttribute('data-theme', 'interview');
        break;
      case 'project-ideas':
        root.setAttribute('data-theme', 'project-ideas');
        break;
      case 'roadmap':
        root.setAttribute('data-theme', 'roadmap');
        break;
      default:
        // Home theme (default root styles)
        break;
    }
  }, [pathname]);
}

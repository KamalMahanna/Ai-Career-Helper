import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/LoadingSpinner';
import { NavigationProvider } from './providers/NavigationProvider';

// Lazy load route components
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
          <div className="text-red-500 mb-4">Something went wrong loading this page.</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lazy loaded components with explicit module types
const Home = React.lazy(() => import('./pages/Home').then(mod => ({ default: mod.default })));
const ATSScore = React.lazy(() => import('./pages/ATSScore').then(mod => ({ default: mod.default })));
const TextSummarizer = React.lazy(() => import('./pages/TextSummarizer').then(mod => ({ default: mod.default })));
const CareerGuide = React.lazy(() => import('./pages/CareerGuide').then(mod => ({ default: mod.default })));
const InterviewQuestions = React.lazy(() => import('./pages/InterviewQuestions').then(mod => ({ default: mod.default })));
const ProjectIdeas = React.lazy(() => import('./pages/ProjectIdeas').then(mod => ({ default: mod.default })));
const Roadmap = React.lazy(() => import('./pages/Roadmap').then(mod => ({ default: mod.default })));
const ApiKeys = React.lazy(() => import('./pages/ApiKeys').then(mod => ({ default: mod.default })));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <NavigationProvider>
        <Layout>
        <ErrorBoundary>
          <Suspense 
            fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <LoadingSpinner className="text-primary animate-spin w-10 h-10" />
                <div className="ml-4 text-gray-600">Loading...</div>
              </div>
            }
          >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ats-score" element={<ATSScore />} />
            <Route path="/summarizer" element={<TextSummarizer />} />
            <Route path="/career-guide" element={<CareerGuide />} />
            <Route path="/interview" element={<InterviewQuestions />} />
            <Route path="/project-ideas" element={<ProjectIdeas />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/api-keys" element={<ApiKeys />} />
          </Routes>
          </Suspense>
        </ErrorBoundary>
        </Layout>
      </NavigationProvider>
    </Router>
  );
}

export default App;

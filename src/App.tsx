import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load route components
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const ATSScore = React.lazy(() => import('./pages/ATSScore').then(module => ({ default: module.ATSScore })));
const TextSummarizer = React.lazy(() => import('./pages/TextSummarizer').then(module => ({ default: module.TextSummarizer })));
const CareerGuide = React.lazy(() => import('./pages/CareerGuide').then(module => ({ default: module.CareerGuide })));
const InterviewQuestions = React.lazy(() => import('./pages/InterviewQuestions').then(module => ({ default: module.InterviewQuestions })));
const ProjectIdeas = React.lazy(() => import('./pages/ProjectIdeas').then(module => ({ default: module.ProjectIdeas })));
const Roadmap = React.lazy(() => import('./pages/Roadmap').then(module => ({ default: module.Roadmap })));

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
      <Layout>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-[50vh]">
              <LoadingSpinner />
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
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;

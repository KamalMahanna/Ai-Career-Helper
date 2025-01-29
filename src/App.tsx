import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ATSScore } from './pages/ATSScore';
import { TextSummarizer } from './pages/TextSummarizer';
import { CareerGuide } from './pages/CareerGuide';
import { InterviewQuestions } from './pages/InterviewQuestions';
import { ProjectIdeas } from './pages/ProjectIdeas';
import { Roadmap } from './pages/Roadmap';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ats-score" element={<ATSScore />} />
          <Route path="/summarizer" element={<TextSummarizer />} />
          <Route path="/career-guide" element={<CareerGuide />} />
          <Route path="/interview" element={<InterviewQuestions />} />
          <Route path="/project-ideas" element={<ProjectIdeas />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

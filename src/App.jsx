import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/common/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { SkillGapAnalysisPage } from './pages/SkillGapAnalysisPage';
import { PersonalizedLearningPage } from './pages/PersonalizedLearningPage';
import { CourseDetailsPage } from './pages/CourseDetailsPage';
import { AIQuizGeneratorPage } from './pages/AIQuizGeneratorPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { ProgressTrackingPage } from './pages/ProgressTrackingPage';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { ManagerSkillGapPage } from './pages/ManagerSkillGapPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Application Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<EmployeeDashboard />} />
            <Route path="/skills" element={<SkillGapAnalysisPage />} />
            <Route path="/learning" element={<PersonalizedLearningPage />} />
            <Route path="/learning/:id" element={<CourseDetailsPage />} />
            <Route path="/quiz" element={<AIQuizGeneratorPage />} />
            <Route path="/quiz/result" element={<QuizResultPage />} />
            <Route path="/progress" element={<ProgressTrackingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/skills" element={<ManagerSkillGapPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

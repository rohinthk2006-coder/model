import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { SIHBanner } from './SIHBanner';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { ToastContainer } from './ToastContainer';
import { AIProcessingModal } from './AIProcessingModal';
import { AICopilotDrawer } from './AICopilotDrawer';
import { ChevronRight, Home, Shield, Award } from 'lucide-react';

export const AppLayout = () => {
  const { sidebarCollapsed } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return null;

    const routeNames = {
      dashboard: 'Employee Dashboard',
      jobs: 'Government Job Match',
      analyzer: 'AI Notification Analyzer',
      'study-plan': 'Adaptive AI Study Plan',
      learning: 'Personalized Learning',
      skills: 'AI Skill Gap Analysis',
      quiz: 'AI-Powered Assessment',
      result: 'Assessment Evaluation',
      progress: 'Progress & GovReady',
      profile: 'Official Profile',
      manager: 'Executive Team Overview',
    };

    return (
      <nav className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4 overflow-x-auto whitespace-nowrap py-1">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {paths.map((p, idx) => {
          const isLast = idx === paths.length - 1;
          const url = `/${paths.slice(0, idx + 1).join('/')}`;
          const displayName = routeNames[p] || p.replace(/-/g, ' ');

          return (
            <React.Fragment key={url}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {isLast ? (
                <span className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={url}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors capitalize"
                >
                  {displayName}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* SIH 2026 Top Announcement Banner */}
      <SIHBanner />

      {/* Main Top Header Navigation */}
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex-1 flex w-full max-w-[1700px] mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Dynamic Page Content */}
        <main
          className={`flex-1 ${
            sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
          } flex flex-col min-w-0 transition-all duration-300`}
        >
          <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
            {getBreadcrumbs()}
            <Outlet />
          </div>

          {/* Clean Dashboard Footer */}
          <footer className="mt-auto border-t border-slate-200 dark:border-navy-800/80 bg-white/50 dark:bg-navy-900/50 py-4 px-6 text-center text-xs text-slate-600 dark:text-slate-300">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">GovLearn AI</span>
                <span>•</span>
                <span>Smart India Hackathon 2026 (SIH26101)</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-300">
                <span>Team: <strong>BOCT</strong></span>
                <span>•</span>
                <span>Theme: <strong>Smart Automation</strong></span>
                <span>•</span>
                <span>Visual Prototype</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Interactive Modals & Toasts */}
      <AIProcessingModal />
      <ToastContainer />
      <AICopilotDrawer />
    </div>
  );
};

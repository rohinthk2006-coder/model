import React, { useState } from 'react';
import { Award, Sparkles, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SIHBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Smart India Hackathon 2026 Prototype Notice" className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 dark:from-navy-900 dark:via-blue-900 dark:to-indigo-950 text-white text-xs py-1.5 px-4 border-b border-blue-400/30 dark:border-cyan-500/20 shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-200 dark:bg-cyan-500/20 dark:text-cyan-300 font-semibold px-2 py-0.5 rounded-full border border-blue-400/30 dark:border-cyan-500/30 text-[11px] tracking-wide">
            <Award className="w-3 h-3 text-blue-300 dark:text-cyan-400" />
            SIH 2026 PROTOTYPE
          </span>
          <span className="hidden sm:inline text-slate-300 font-normal">
            PS ID: <strong className="text-white font-mono">SIH26101</strong> • Theme: <strong className="text-white">Smart Automation</strong> • Team: <strong className="text-blue-200 dark:text-cyan-300">BOCT</strong>
          </span>
          <span className="text-slate-400 hidden md:inline">|</span>
          <span className="text-slate-200 hidden md:inline">
            AI-Enabled Learning Platform for Government Employees
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-blue-200 hover:text-white dark:text-cyan-300 dark:hover:text-cyan-100 flex items-center gap-0.5 text-[11px] font-medium transition-colors"
          >
            Switch Role <ChevronRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

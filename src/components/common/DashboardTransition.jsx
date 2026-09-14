import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DashboardTransition = ({ onComplete }) => {
  const [stage, setStage] = useState(1);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    // Stage 1: "Preparing your personalized learning environment..."
    const t1 = setTimeout(() => {
      setStage(2);
      setProgress(75);
    }, 600);

    // Stage 2: "AI Analysis Complete"
    const t2 = setTimeout(() => {
      setProgress(100);
      setStage(3);
    }, 1100);

    // Fade out and reveal dashboard
    const t3 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 dark:bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300">
      <div className="max-w-md w-full bg-white dark:bg-navy-900 rounded-2xl p-6 sm:p-8 border border-blue-200 dark:border-cyan-500/30 shadow-2xl text-center space-y-5">
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-blue-50 dark:bg-cyan-500/20 border border-blue-200 dark:border-cyan-500/40 animate-pulse" />
          {stage === 3 ? (
            <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-emerald-400 animate-bounce" />
          ) : (
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          )}
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono tracking-widest uppercase text-blue-600 dark:text-cyan-400 font-bold">
            GovLearn Neural Environment
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white transition-all">
            {stage === 1 && 'Preparing your personalized learning environment...'}
            {stage === 2 && 'Calibrating Competency Baseline...'}
            {stage === 3 && 'AI Analysis Complete'}
          </h3>
          <p className="text-xs text-slate-400">
            MeghRaj GI Cloud • Secure Federal Session
          </p>
        </div>

        {/* Progress line */}
        <div className="w-full bg-slate-100 dark:bg-navy-950 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-600 dark:via-cyan-400 dark:to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

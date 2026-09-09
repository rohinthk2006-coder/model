import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, CheckCircle2, Loader2, ShieldCheck, Cpu } from 'lucide-react';

export const AIProcessingModal = () => {
  const { aiModalOpen, aiModalTitle, aiModalSteps, aiCurrentStep, closeAiModal } = useApp();

  const [counterPercent, setCounterPercent] = useState(0);

  const defaultSteps = [
    'Analyzing learning history...',
    'Evaluating skill performance...',
    'Identifying knowledge gaps...',
    'Generating recommendations...',
    'Analysis complete',
  ];

  const stepsToUse = aiModalSteps.length > 0 ? aiModalSteps : defaultSteps;

  useEffect(() => {
    if (!aiModalOpen) {
      setCounterPercent(0);
      return;
    }

    const stepInterval = 650;
    const target = Math.min(100, Math.round(((aiCurrentStep + 1) / stepsToUse.length) * 100));

    // Smooth counter progression
    const interval = setInterval(() => {
      setCounterPercent((prev) => {
        if (prev < target) return prev + 2;
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [aiModalOpen, aiCurrentStep, stepsToUse.length]);

  if (!aiModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-cyan-500/40 overflow-hidden text-slate-900 dark:text-white">
        {/* Top Scanning Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 animate-pulse" />

        {/* Header with Title & Percentage Counter */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-cyan-glow text-white">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {aiModalTitle}
                </h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
                  Autonomous Competency Diagnostics
                </p>
              </div>
            </div>

            {/* Percentage Counter (0 -> 100%) */}
            <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-extrabold">
              {counterPercent}%
            </div>
          </div>
        </div>

        {/* Animated Visual Core */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-navy-950/60 border-y border-slate-200 dark:border-navy-800">
          <div className="relative flex items-center justify-center py-5">
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/20 animate-ping opacity-75" />
            <div className="absolute w-20 h-20 rounded-full border border-blue-500/30 animate-pulse" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-800 to-cyan-900 flex items-center justify-center shadow-lg border border-cyan-500/40 z-10">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          {/* Sequential 5-Stage Step List */}
          <div className="space-y-2.5 mt-2">
            {stepsToUse.map((step, idx) => {
              const isCompleted = idx < aiCurrentStep;
              const isCurrent = idx === aiCurrentStep;
              const isUpcoming = idx > aiCurrentStep;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs transition-all duration-300 ${
                    isCurrent
                      ? 'text-cyan-600 dark:text-cyan-300 font-bold translate-x-1'
                      : isCompleted
                      ? 'text-slate-500 dark:text-slate-400 font-medium'
                      : 'text-slate-300 dark:text-navy-600'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-navy-700" />
                    )}
                  </div>
                  <span className="flex-1 leading-snug">{step}</span>
                </div>
              );
            })}
          </div>

          {/* Animated Progress Line */}
          <div className="mt-5 w-full bg-slate-200 dark:bg-navy-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${counterPercent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-navy-900">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted Neural Session • MeghRaj Baseline</span>
          </div>

          <button
            onClick={closeAiModal}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

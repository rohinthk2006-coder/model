import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { careerRoadmapSteps } from '../../data/mockGovJobs';
import {
  UserCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Calendar,
  Award,
  BrainCircuit,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Zap,
} from 'lucide-react';

const iconMap = {
  UserCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Calendar,
  Award,
  BrainCircuit,
  TrendingUp,
  CheckCircle2,
};

export const CareerRoadmap = ({ compact = false }) => {
  const navigate = useNavigate();
  const { t, govCareerProfile } = useApp();

  return (
    <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-navy-800 shadow-xl bg-white dark:bg-navy-900 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-navy-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white font-display tracking-tight">
              {t('careerRoadmap', 'My Government Career Roadmap')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized 9-stage progression pipeline for{' '}
              <strong className="text-slate-700 dark:text-slate-300">
                {govCareerProfile?.targetExam || 'SSC CGL'}
              </strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
            Stage 5 of 9 Active
          </span>
          <span className="text-slate-400 font-mono">76% Overall Completion</span>
        </div>
      </div>

      {/* Visual Roadmap Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-3">
        {careerRoadmapSteps.map((step, idx) => {
          const Icon = iconMap[step.icon] || CheckCircle2;
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isPending = step.status === 'pending';

          return (
            <div
              key={step.id}
              className={`relative rounded-xl p-3 border transition-all flex flex-col justify-between group ${
                isActive
                  ? 'bg-cyan-500/10 dark:bg-cyan-950/40 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                  : isCompleted
                  ? 'bg-slate-50 dark:bg-navy-950/60 border-emerald-500/30 hover:border-emerald-500/50'
                  : 'bg-slate-50/60 dark:bg-navy-950/30 border-slate-200 dark:border-navy-800 opacity-75'
              }`}
            >
              {/* Step Number & Connector Indicator */}
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-extrabold font-mono w-5 h-5 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-cyan-500 text-white animate-pulse'
                      : 'bg-slate-200 dark:bg-navy-800 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </span>

                <div
                  className={`p-1 rounded-lg ${
                    isActive
                      ? 'text-cyan-500 bg-cyan-500/20'
                      : isCompleted
                      ? 'text-emerald-500 bg-emerald-500/10'
                      : 'text-slate-400 bg-slate-100 dark:bg-navy-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1 mb-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {step.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
                  {step.subtitle}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(step.actionLink)}
                className={`w-full py-1.5 px-2 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all ${
                  isActive
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-sm'
                    : isCompleted
                    ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-200/80 dark:bg-navy-800 hover:bg-slate-300 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{step.actionText}</span>
                <ChevronRight className="w-3 h-3 shrink-0" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useCountUp } from '../../hooks/useCountUp';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  BrainCircuit,
  Target,
  Zap,
} from 'lucide-react';

export const GovReadyScoreCard = ({ compact = false }) => {
  const navigate = useNavigate();
  const { govCareerProfile, t } = useApp();

  const score = govCareerProfile?.govReadyScore || 76;
  const animatedScore = useCountUp(score, 1200);

  const subjects = [
    {
      name: t('reasoning', 'Reasoning & Intelligence'),
      score: govCareerProfile?.subjectReadiness?.reasoning || 82,
      status: 'Strong',
      color: 'emerald',
      barColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      name: t('quantitative', 'Quantitative Aptitude'),
      score: govCareerProfile?.subjectReadiness?.quantitative || 71,
      status: 'Good',
      color: 'blue',
      barColor: 'bg-blue-500',
      badgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    },
    {
      name: t('english', 'English Comprehension'),
      score: govCareerProfile?.subjectReadiness?.english || 63,
      status: 'Average',
      color: 'amber',
      barColor: 'bg-amber-500',
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
    {
      name: t('generalAwareness', 'General Awareness & GK'),
      score: govCareerProfile?.subjectReadiness?.generalAwareness || 48,
      status: 'Needs Focus',
      color: 'rose',
      barColor: 'bg-rose-500',
      badgeBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      flagged: true,
    },
  ];

  const radius = compact ? 40 : 54;
  const strokeWidth = compact ? 7 : 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-navy-800 shadow-xl bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-navy-900 dark:via-navy-900/90 dark:to-navy-950 relative overflow-hidden">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-100 dark:border-navy-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white shadow-blue-glow">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display tracking-tight">
                {t('govReadyScore', 'GovReady Score')}
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                PROTOTYPE AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Target: <strong className="text-slate-700 dark:text-slate-300">{govCareerProfile?.targetExam || 'SSC CGL 2026'}</strong>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <TrendingUp className="w-3 h-3" />
            <span>Tier-1 Cutoff Probable</span>
          </span>
        </div>
      </div>

      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'} gap-6 items-center`}>
        {/* Left: Circular Visual Meter */}
        <div className={`${compact ? 'w-full' : 'md:col-span-5'} flex flex-col items-center justify-center p-2`}>
          <div className="relative flex items-center justify-center">
            <svg
              className={`${compact ? 'w-32 h-32' : 'w-40 h-40'} -rotate-90`}
              viewBox={`0 0 ${radius * 2 + 20} ${radius * 2 + 20}`}
            >
              {/* Background Track Circle */}
              <circle
                cx={radius + 10}
                cy={radius + 10}
                r={radius}
                className="text-slate-100 dark:text-navy-800"
                strokeWidth={strokeWidth}
                stroke="currentColor"
                fill="transparent"
              />
              {/* Animated Glowing Progress Circle */}
              <circle
                cx={radius + 10}
                cy={radius + 10}
                r={radius}
                className="text-cyan-500 transition-all duration-700 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Stats Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                {animatedScore}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Out of 100
              </span>
              <span className="text-[10px] font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                Qualified Range
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Calibrated from 4 mock tests, syllabus completion (72%), and speed accuracy.
            </p>
          </div>
        </div>

        {/* Right: Subject Readiness Breakdown */}
        <div className={`${compact ? 'w-full' : 'md:col-span-7'} space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-display">
              {t('subjectReadiness', 'Subject Readiness')}
            </span>
            <span className="text-[11px] text-slate-400">Target Benchmark: 75%+</span>
          </div>

          <div className="space-y-2.5">
            {subjects.map((sub, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all ${
                  sub.flagged
                    ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30'
                    : 'bg-slate-50 dark:bg-navy-950/50 border-slate-200/80 dark:border-navy-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5">
                    {sub.flagged ? (
                      <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {sub.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${sub.badgeBg}`}>
                      {sub.status}
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-white font-mono">
                      {sub.score}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-navy-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${sub.barColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${sub.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* AI Insight Highlight */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent border border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5 animate-pulse" />
            <div className="leading-relaxed text-[11px] sm:text-xs">
              <strong className="text-cyan-600 dark:text-cyan-400">AI Insight:</strong> Your strongest
              area is <strong>Reasoning (82%)</strong>. <strong>General Awareness (48%)</strong> is currently
              your biggest improvement area. Spending 40 mins/day on static GK will boost your GovReady Score to <strong>84+</strong>.
            </div>
          </div>

          {/* Improve My Score CTA Button */}
          <button
            onClick={() => navigate('/study-plan')}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-cyan-glow transition-all flex items-center justify-center gap-2 btn-command"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{t('improveMyScore', 'Improve My Score')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

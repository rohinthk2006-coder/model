import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useCountUp } from '../hooks/useCountUp';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Check,
  ShieldCheck,
  TrendingUp,
  Target,
} from 'lucide-react';

export const QuizResultPage = () => {
  const navigate = useNavigate();
  const { quizResult, addToast } = useApp();

  const finalScore = quizResult.score !== undefined ? quizResult.score : 82;
  const correctCount = quizResult.correctCount !== undefined ? quizResult.correctCount : 8;
  const totalCount = quizResult.totalCount !== undefined ? quizResult.totalCount : 10;
  const timeSpent = quizResult.timeSpent || '06:42';
  const topic = quizResult.topic || 'Cybersecurity';

  // Count-up animated score (0 -> 82%)
  const animatedScore = useCountUp(finalScore, 1200);

  useEffect(() => {
    if (finalScore >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#2563eb', '#10b981', '#f59e0b'],
        });
      } catch (e) {
        // Fallback
      }
    }
  }, [finalScore]);

  const circleCircumference = 2 * Math.PI * 52; // ~326.7
  const strokeDashoffset = circleCircumference - (animatedScore / 100) * circleCircumference;

  return (
    <div className="space-y-7 animate-fade-in max-w-4xl mx-auto">
      {/* Top Banner / Assessment Complete Heading */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>EVALUATION RECORDED IN iGOT DOSSIER</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          Assessment Complete
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Domain: <strong className="text-slate-800 dark:text-slate-200">{topic}</strong> • Public Sector Competency Standard
        </p>
      </div>

      {/* Main Score & Analytics Card */}
      <div className="command-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Circular Progress Indicator with Animated Count-up */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="text-slate-200 dark:text-navy-800"
                  strokeWidth="9"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="text-cyan-500 transition-all duration-300 ease-out"
                  strokeWidth="9"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                  {animatedScore}%
                </span>
                <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 tracking-wider font-mono">
                  {finalScore >= 75 ? 'Proficient' : 'Needs Review'}
                </span>
              </div>
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 text-center">
              Standard Target: 75% • Performance:{' '}
              <strong className="text-emerald-500">Strong</strong>
            </p>
          </div>

          {/* Performance Breakdown Metrics (Requirement #10) */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Correct Answers</div>
                <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5 font-display">
                  {correctCount} / {totalCount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Accuracy</div>
                <div className="text-lg sm:text-xl font-black text-emerald-500 mt-0.5 font-display">
                  {finalScore}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center">
                <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Performance</div>
                <div className="text-lg sm:text-xl font-black text-cyan-500 mt-0.5 font-display">
                  Strong
                </div>
              </div>
            </div>

            {/* Performance Analysis Bullet Points */}
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-navy-900/60 border border-emerald-100 dark:border-navy-800 space-y-2 text-xs">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-500" />
                <span>Performance Analysis:</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Strong understanding of basic statutory concepts and encryption purposes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Needs improvement in advanced security practices and rapid 6-hour CERT-In escalation protocols.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Recommendation Card */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 text-white border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-300 font-mono">AI REMEDIATION RECOMMENDATION</div>
              <p className="text-xs text-slate-200 mt-0.5">
                “Review Module 3 before attempting the advanced assessment.”
              </p>
            </div>
          </div>

          <Link
            to="/learning/cybersecurity-essentials"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 text-xs font-bold transition-all shrink-0 btn-command"
          >
            Review Module 3
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate('/quiz')}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all flex items-center gap-2 btn-command"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Quiz</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => addToast('Digital scorecard downloaded to device', 'success')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 btn-command"
            >
              Download Scorecard
            </button>

            <button
              onClick={() => navigate('/learning')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 btn-command"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

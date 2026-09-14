import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SkillRadarChart } from '../components/charts/SkillRadarChart';
import {
  radarSkillData,
  strengthsList,
  skillsToImprove,
} from '../data/mockSkills';
import {
  Sparkles,
  TrendingUp,
  Award,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  BookOpen,
  Zap,
  Target,
  Shield,
  Info,
  Check,
  Cpu,
} from 'lucide-react';

export const SkillGapAnalysisPage = () => {
  const navigate = useNavigate();
  const { triggerAiSimulation, addToast } = useApp();

  const handleSimulatedDiagnostic = () => {
    triggerAiSimulation(
      'Deep AI Competency Gap Diagnostics',
      [
        'Analyzing learning history...',
        'Evaluating skill performance...',
        'Identifying knowledge gaps...',
        'Generating recommendations...',
        'Analysis complete',
      ],
      () => {
        addToast('Competency Diagnostic synchronized with official profile!', 'success');
      }
    );
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              AI Skill Gap Analysis
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-mono">
              v2.4
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Understand your strengths and discover where you can improve.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSimulatedDiagnostic}
            className="px-4 py-2 rounded-xl bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 shadow-sm btn-command"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-500" />
            <span>Analyze Skills</span>
          </button>

          <button
            onClick={() => navigate('/learning')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 btn-command"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Curriculum Catalog</span>
          </button>
        </div>
      </div>

      {/* AI ANALYZED Status Indicator Bar (Requirement #7) */}
      <div className="command-card rounded-2xl p-4 border border-blue-200 dark:border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs bg-white dark:bg-navy-900/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-emerald-500/10 text-blue-600 dark:text-emerald-500">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>Competency Gap Model Calibrated</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-emerald-500/15 text-blue-600 dark:text-emerald-400 font-bold border border-blue-200 dark:border-emerald-500/20">
                ACTIVE
              </span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Diagnostic synthesized across 6 civil service benchmarks • Last sync 4 mins ago
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Department Standard:
          </span>
          <span className="font-bold text-slate-800 dark:text-slate-200">
            MeitY Senior Officer Tier-1
          </span>
        </div>
      </div>

      {/* Two-Column Progress Target Visual (Current vs Target) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Level */}
        <div className="command-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Proficiency
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              Baseline Ready
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Current Skill Level
              </span>
              <span className="font-mono font-bold text-cyan-500">78%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-navy-950 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: '78%' }}
              />
            </div>
          </div>
        </div>

        {/* Target Level */}
        <div className="command-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Target Level (National Goal)
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Level 5 Mastery
            </span>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Target Skill Level
              </span>
              <span className="font-mono font-bold text-emerald-500">90%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-navy-950 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: '90%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATION CARD */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 dark:from-navy-950 dark:via-navy-900 dark:to-emerald-950/50 text-white border border-blue-400/30 dark:border-emerald-500/40 shadow-blue-500/20 dark:shadow-green-glow overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 dark:bg-emerald-500/20 text-white dark:text-emerald-300 border border-white/30 dark:border-emerald-400/30 text-xs font-bold font-mono">
                <Sparkles className="w-3 h-3 text-blue-200 dark:text-emerald-300 animate-spin" style={{ animationDuration: '4s' }} />
                RECOMMENDED FOCUS
              </span>
              <span className="text-[11px] font-semibold text-white/90 dark:text-emerald-400 bg-white/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-white/20 dark:border-emerald-500/20">
                High Impact
              </span>
            </div>

            <p className="text-sm sm:text-base text-white/90 dark:text-slate-200 leading-relaxed font-sans">
              Based on your current performance, completing <strong>Cloud Fundamentals</strong> and{' '}
              <strong>Cybersecurity Essentials</strong> could significantly improve your overall skill profile.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-blue-100 dark:text-slate-400 pt-1">
              <span>Potential Score Lift: <strong>78% → 89%</strong></span>
              <span>•</span>
              <span>Estimated Commitment: <strong>10 hours</strong></span>
              <span>•</span>
              <span className="text-white dark:text-emerald-300">CERT-In Compliance Aligned</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/learning')}
            className="px-5 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-700 dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-600 dark:hover:from-emerald-400 dark:hover:to-teal-500 dark:text-white text-xs font-bold shadow-md dark:shadow-green-glow transition-all flex items-center gap-2 shrink-0 group btn-command"
          >
            <span>View Recommended Learning</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Radar Chart & Skills Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Recharts Radar Chart */}
        <div className="lg:col-span-7 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                  Competency Vector Spider
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visual mapping of 6 core civil services competencies against ministry benchmarks
                </p>
              </div>

              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 font-bold">
                Target: 75%
              </span>
            </div>

            <SkillRadarChart />
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-cyan-400 inline-block" /> Your Active Score
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b border-dashed border-slate-400 inline-block" /> Benchmark Standard (75%)
            </span>
          </div>
        </div>

        {/* Right: Scores Overview Breakdown List */}
        <div className="lg:col-span-5 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                Skill Scores Breakdown
              </h3>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Overall: <strong className="text-cyan-600 dark:text-cyan-400 font-mono">78%</strong>
              </span>
            </div>

            <div className="space-y-4">
              {radarSkillData.map((item, idx) => {
                const isAbove = item.score >= item.benchmark;
                return (
                  <div key={item.skill} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.skill}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-mono">
                          Target: {item.benchmark}%
                        </span>
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded text-xs font-mono ${
                            isAbove
                              ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                              : 'text-rose-500 dark:text-rose-400 bg-rose-500/10'
                          }`}
                        >
                          {item.score}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-100 dark:bg-navy-950 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          isAbove
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-rose-500 to-amber-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800/80 text-[11px] text-slate-600 dark:text-slate-300">
            💡 Digital Governance (86%) and Communication (82%) are currently in top national tier.
          </div>
        </div>
      </div>

      {/* Two Defined Sections: "Your Strengths" and "Skills to Improve" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Strengths Section */}
        <div className="command-card rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-br from-white via-emerald-500/5 to-white dark:from-navy-900 dark:via-emerald-950/10 dark:to-navy-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                  Your Strengths
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Exceeding national civil services benchmarks
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              2 Competencies
            </span>
          </div>

          <div className="space-y-4">
            {strengthsList.map((strength) => (
              <div
                key={strength.name}
                className="p-4 rounded-xl bg-white dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {strength.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {strength.badge}
                    </span>
                    <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      {strength.score}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {strength.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-navy-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{strength.recentMilestone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills to Improve Section */}
        <div className="command-card rounded-2xl p-6 border border-rose-500/20 bg-gradient-to-br from-white via-rose-500/5 to-white dark:from-navy-900 dark:via-rose-950/10 dark:to-navy-900">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                  Skills to Improve
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Targeted deficits requiring remedial coursework
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              Action Required
            </span>
          </div>

          <div className="space-y-4">
            {skillsToImprove.map((gap) => (
              <div
                key={gap.name}
                className="p-4 rounded-xl bg-white dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {gap.name}
                    </span>
                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                      {gap.severity}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-rose-500 text-xs">
                    {gap.score}% (Gap: {gap.gap}%)
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {gap.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Remedial: <strong className="text-slate-700 dark:text-slate-300">{gap.recommendedCourseTitle}</strong>
                  </span>
                  <button
                    onClick={() => navigate(`/learning/${gap.recommendedCourseId}`)}
                    className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Start Course <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

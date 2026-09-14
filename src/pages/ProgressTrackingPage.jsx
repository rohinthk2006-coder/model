import React, { useState } from 'react';
import { StatCard } from '../components/common/StatCard';
import { WeeklyHoursChart } from '../components/charts/WeeklyHoursChart';
import { SkillTrendChart } from '../components/charts/SkillTrendChart';
import {
  Flame,
  Clock,
  BookOpen,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Download,
  Share2,
  Zap,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgressTrackingPage = () => {
  const { addToast } = useApp();
  const [timeFilter, setTimeFilter] = useState('7 Days'); // '7 Days' | '30 Days' | '3 Months'

  const timelineEvents = [
    {
      day: 'Monday',
      title: 'Cybersecurity Module 1: Threat Landscape',
      type: 'course',
      time: '1.5 hrs',
      badge: 'Completed',
      badgeColor: 'emerald',
    },
    {
      day: 'Tuesday',
      title: 'Cloud Module 2: Core Concepts & Architecture',
      type: 'course',
      time: '2.0 hrs',
      badge: 'Completed',
      badgeColor: 'emerald',
    },
    {
      day: 'Wednesday',
      title: 'AI Quiz: Public Sector AI Ethics',
      type: 'quiz',
      time: 'Score: 90% (0.8 hrs)',
      badge: 'Passed',
      badgeColor: 'cyan',
    },
    {
      day: 'Thursday',
      title: 'Data Analytics Module: Administrative Cleaning',
      type: 'course',
      time: '2.5 hrs',
      badge: 'Completed',
      badgeColor: 'emerald',
    },
    {
      day: 'Friday',
      title: 'Cybersecurity Quiz: Incident Reporting Simulation',
      type: 'quiz',
      time: 'Score: 82% (1.0 hr)',
      badge: 'Passed',
      badgeColor: 'cyan',
    },
  ];

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            Learning Progress & Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official training logs, velocity metrics, and certified competency trajectory.
          </p>
        </div>

        {/* Time Filter Toggle (Requirement #11) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs font-semibold">
            {['7 Days', '30 Days', '3 Months'].map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  setTimeFilter(tf);
                  addToast(`Filter updated to past ${tf}`, 'info');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all btn-command ${
                  timeFilter === tf
                    ? 'bg-blue-600 dark:bg-emerald-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => addToast('Official Trajectory Report exported in PDF format', 'success')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-2 shadow-sm btn-command"
          >
            <Download className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-500" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards with Count-ups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Streak"
          value="7 days"
          subtitle="Top 5% of active officers"
          icon={Flame}
          trend="🔥 Active Daily"
          trendPositive={true}
          color="amber"
          progress={70}
          animateValue={true}
        />

        <StatCard
          title="Total Learning Hours"
          value={timeFilter === '7 Days' ? '34.5 hrs' : timeFilter === '30 Days' ? '128.0 hrs' : '342.5 hrs'}
          subtitle={timeFilter === '7 Days' ? 'Target: 40 hrs this quarter' : 'Target: 320 hrs cumulative'}
          icon={Clock}
          trend="+5.5 hrs this week"
          trendPositive={true}
          color="cyan"
          progress={86}
          animateValue={true}
        />

        <StatCard
          title="Courses Completed"
          value="12"
          subtitle="84% average assessment"
          icon={BookOpen}
          trend="+2 completed this cycle"
          trendPositive={true}
          color="blue"
          progress={80}
          animateValue={true}
        />

        <StatCard
          title="Average Quiz Score"
          value="84%"
          subtitle="Department benchmark: 75%"
          icon={Award}
          trend="+6% vs baseline"
          trendPositive={true}
          color="emerald"
          progress={84}
          animateValue={true}
        />
      </div>

      {/* Recharts Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Learning Hours BarChart */}
        <div className="command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                Weekly Learning Hours ({timeFilter})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily active hours logged vs recommended target (1.2 hrs/day)
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 font-mono">
              7.8h Logged
            </span>
          </div>

          <WeeklyHoursChart />
        </div>

        {/* Skill Improvement Over Time Line/AreaChart */}
        <div className="command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                Skill Improvement Trajectory
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Overall score vs Technical core growth from January to June
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-emerald-400">
              +13% 6-Month Lift
            </span>
          </div>

          <SkillTrendChart />
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-cyan-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
              Weekly Learning Activity Timeline
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Verified Activity Log</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-navy-800">
          {timelineEvents.map((item, idx) => (
            <div
              key={idx}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/50 dark:hover:bg-navy-950/40 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-24 font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {item.day}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pl-28 sm:pl-0">
                <span className="text-slate-400 font-mono text-[11px]">{item.time}</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    item.badgeColor === 'emerald'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                      : 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-500/20'
                  }`}
                >
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

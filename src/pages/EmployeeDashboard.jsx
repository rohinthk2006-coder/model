import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import { AIInsightCard } from '../components/common/AIInsightCard';
import { CourseCard } from '../components/learning/CourseCard';
import { DashboardTransition } from '../components/common/DashboardTransition';
import {
  Award,
  BookOpen,
  Clock,
  Flame,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  CheckCircle2,
  PlayCircle,
  HelpCircle,
  FileText,
  ShieldAlert,
} from 'lucide-react';

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, courses, addToast } = useApp();

  // Show transition only once per session
  const [showTransition, setShowTransition] = useState(() => {
    return !sessionStorage.getItem('govlearn_transition_shown');
  });

  const handleTransitionDone = () => {
    sessionStorage.setItem('govlearn_transition_shown', 'true');
    setShowTransition(false);
  };

  const inProgressCourses = courses.filter((c) => c.progress > 0 && c.progress < 100);

  const handleQuickQuizLaunch = () => {
    navigate('/quiz');
  };

  return (
    <>
      {/* 1.2s Quick Calibration Transition */}
      {showTransition && <DashboardTransition onComplete={handleTransitionDone} />}

      <div className="space-y-6 animate-fade-in">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
                Good morning, {currentUser.name.split(' ')[0]}
              </h1>
              <span className="text-lg">👋</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Your personalized learning journey is ready. You have 2 high-priority skill recommendations today.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleQuickQuizLaunch}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 dark:text-cyan-400 text-xs font-bold border border-blue-200 dark:border-cyan-500/30 transition-all flex items-center gap-1.5 btn-command shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Quiz</span>
            </button>

            <button
              onClick={() => navigate('/learning/cloud-fundamentals')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs font-bold shadow-sm dark:shadow-emerald-600/20 transition-all flex items-center gap-1.5 btn-command"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Resume Cloud Course</span>
            </button>
          </div>
        </div>

        {/* 4 Required Stats Cards with Animated Count-Up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Overall Skill Score"
            value="78%"
            subtitle="Ministry Benchmark: 75%"
            icon={Target}
            trend="+4% this month"
            trendPositive={true}
            color="cyan"
            progress={78}
            animateValue={true}
          />

          <StatCard
            title="Courses Completed"
            value="12"
            subtitle="3 In Progress • 1 Capstone"
            icon={BookOpen}
            trend="80% to Q3 Target"
            trendPositive={true}
            color="emerald"
            progress={80}
            animateValue={true}
          />

          <StatCard
            title="Learning Hours"
            value="34.5 hrs"
            subtitle="Target: 40 hrs this quarter"
            icon={Clock}
            trend="+5.5 hrs this week"
            trendPositive={true}
            color="emerald"
            progress={86}
            animateValue={true}
          />

          <StatCard
            title="Current Streak"
            value="7 days"
            subtitle="Personal Best: 14 days"
            icon={Flame}
            trend="Active Daily"
            trendPositive={true}
            color="amber"
            progress={50}
            animateValue={true}
          />
        </div>

        {/* Dynamic AI Competency Gap Insight Card (Sequential Typewriter) */}
        <AIInsightCard />

        {/* In Progress Section */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Continue Learning
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                {inProgressCourses.length} in progress
              </span>
            </div>
            <Link
              to="/learning"
              className="text-xs font-bold text-blue-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              View All Courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inProgressCourses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Quick AI Shortcuts & Weekly Focus Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pt-2">
          {/* Weekly Focus Goals */}
          <div className="lg:col-span-2 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Weekly Competency Milestones
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Target milestones calibrated by GovLearn AI for Section Officers
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 dark:text-emerald-400 bg-blue-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full border border-blue-200 dark:border-emerald-500/20">
                3 of 4 Done
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Complete MeghRaj Cloud Security Principles (Module 2)
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Cloud Fundamentals • 1 hr 15 mins logged
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-emerald-400">
                  Completed
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Pass CERT-In Incident Reporting Practice Assessment
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Score: 82% • Verified by AI Evaluator
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-emerald-400">
                  Completed
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-600 dark:border-cyan-500 shrink-0 animate-pulse" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      Study Data Analytics for Governance (Module 4: Predictive Models)
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      65% complete • Estimated 1.2 hrs remaining
                    </p>
                  </div>
                </div>
                <Link
                  to="/learning/data-analytics-governance"
                  className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline"
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>

          {/* AI Quick Assessment Launcher */}
          <div className="command-card rounded-2xl p-6 border border-blue-200 dark:border-cyan-500/30 flex flex-col justify-between bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-navy-900 dark:via-cyan-950/20 dark:to-navy-900">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-cyan-500/10 border border-blue-200 dark:border-cyan-500/20 flex items-center justify-center text-blue-600 dark:text-cyan-500 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Instant AI Knowledge Check
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Test your retention on government tech frameworks with dynamically generated 5-question micro-quizzes.
              </p>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-navy-950 text-xs space-y-1.5 border border-slate-200 dark:border-navy-800 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Focus Topic:</span>
                  <span className="font-bold text-blue-600 dark:text-cyan-500">Cloud Computing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Difficulty:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Medium</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Time:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">5 mins</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleQuickQuizLaunch}
              className="mt-5 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-500 dark:hover:from-emerald-500 dark:hover:to-teal-400 text-white font-bold text-xs shadow-blue-500/20 dark:shadow-green-glow transition-all flex items-center justify-center gap-2 btn-command"
            >
              <span>Launch AI Quiz Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

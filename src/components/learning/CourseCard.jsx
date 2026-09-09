import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Sparkles,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Shield,
  Cloud,
  Database,
  Cpu,
  FileText,
  BarChart,
  Loader2,
  HelpCircle,
} from 'lucide-react';

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { setCourses, addToast } = useApp();
  const [isLoadingContinue, setIsLoadingContinue] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'cloud':
        return <Cloud className="w-5 h-5 text-cyan-500" />;
      case 'security':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'data':
        return <BarChart className="w-5 h-5 text-indigo-500" />;
      case 'artificial intelligence':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      default:
        return <FileText className="w-5 h-5 text-emerald-500" />;
    }
  };

  const getDifficultyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'intermediate':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'advanced':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const isCompleted = course.progress === 100;

  // Why this course dynamic explanation
  const whyReason =
    course.aiReason ||
    (course.category === 'Cloud'
      ? 'Recommended because your Cloud Computing score is 54%.'
      : course.category === 'Security'
      ? 'Recommended because your Cybersecurity score is 61%.'
      : course.category === 'Data'
      ? 'Recommended to prepare for national DBT predictive analysis.'
      : 'Recommended to align with IndiaAI Mission standards.');

  const handleContinueLearning = (e) => {
    e.stopPropagation();
    setIsLoadingContinue(true);

    setTimeout(() => {
      // Increment course progress by +5% if not completed
      setCourses((prevCourses) =>
        prevCourses.map((c) => {
          if (c.id === course.id) {
            const nextProgress = Math.min(100, c.progress + 5);
            return { ...c, progress: nextProgress };
          }
          return c;
        })
      );
      setIsLoadingContinue(false);
      addToast(`Learning progress updated for "${course.title}" (+5%)`, 'success');
      navigate(`/learning/${course.id}`);
    }, 450);
  };

  return (
    <div className="command-card command-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-navy-800 transition-all duration-300">
      <div>
        {/* Card Header & AI badge */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 shadow-sm">
              {getCategoryIcon(course.category)}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 justify-end">
              {course.isAiRecommended && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 font-mono uppercase">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  AI RECOMMENDED
                </span>
              )}
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyBadge(
                  course.level
                )}`}
              >
                {course.level}
              </span>
            </div>
          </div>

          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {course.description}
          </p>

          {/* "Why this course?" Expandable Intelligence Pill (Requirement #9) */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-navy-800/80">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Why this course?</span>
            </button>

            {showExplanation && (
              <div className="mt-2 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-slate-700 dark:text-slate-200 leading-relaxed animate-fade-in">
                {whyReason}
              </div>
            )}
          </div>
        </div>

        {/* Course Meta Info */}
        <div className="px-5 py-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-navy-800/80 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.duration}</span>
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-300">
            {course.category}
          </div>
        </div>
      </div>

      {/* Progress & Action Bottom */}
      <div className="p-5 pt-3 bg-slate-50/50 dark:bg-navy-950/40 border-t border-slate-100 dark:border-navy-800">
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-500 dark:text-slate-400">
              {isCompleted ? 'Completed' : 'Course Progress'}
            </span>
            <span
              className={
                isCompleted
                  ? 'text-emerald-600 dark:text-emerald-400 font-mono'
                  : 'text-blue-600 dark:text-cyan-400 font-mono'
              }
            >
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-navy-900 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                isCompleted
                  ? 'bg-emerald-500'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-400'
              }`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/learning/${course.id}`)}
            className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all text-center btn-command"
          >
            View Details
          </button>

          <button
            onClick={handleContinueLearning}
            disabled={isLoadingContinue}
            className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm btn-command disabled:opacity-75"
          >
            {isLoadingContinue ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Updating...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Review</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Continue</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

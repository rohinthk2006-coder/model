import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Zap,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const StudyPlanPage = () => {
  const navigate = useNavigate();
  const {
    studyPlan,
    toggleStudyPlanTask,
    recalibrateStudyPlan,
    govCareerProfile,
    addToast,
    t,
  } = useApp();

  const [selectedDay, setSelectedDay] = useState('Monday');
  const [filterPriority, setFilterPriority] = useState('all');

  const currentDayIndex = studyPlan.days.findIndex((d) => d.day === selectedDay);
  const currentDayData = studyPlan.days[currentDayIndex >= 0 ? currentDayIndex : 0];

  const filteredTasks = (currentDayData?.tasks || []).filter((task) => {
    if (filterPriority === 'all') return true;
    return task.priority === filterPriority;
  });

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              {t('studyPlan', 'Adaptive AI Study Plan')}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Dynamic Recalibration
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Syllabus timetable tailored for{' '}
            <strong className="text-slate-700 dark:text-slate-300">
              {studyPlan.targetExam || govCareerProfile?.targetExam}
            </strong>
            . Schedules automatically reallocate toward your weakest subject areas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => recalibrateStudyPlan()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-cyan-glow transition-all flex items-center gap-1.5 btn-command"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{t('regeneratePlan', 'Regenerate My Plan')}</span>
          </button>
        </div>
      </div>

      {/* DYNAMIC WEAKNESS DETECTION BANNER */}
      {studyPlan.weaknessAlert?.active && (
        <div className="command-card rounded-2xl p-5 border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/40 dark:via-navy-900 dark:to-navy-900 shadow-lg animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                    AI Detected a Competency Gap
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    Auto-Adjusted
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {studyPlan.weaknessAlert.message}
                </p>
                <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                  ✓ {studyPlan.weaknessAlert.autoAdjustment}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/quiz')}
              className="self-start sm:self-auto py-2 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Practice Weak Topics Now</span>
            </button>
          </div>
        </div>
      )}

      {/* Weekly Progress Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="command-card rounded-2xl p-4 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[11px]">Syllabus Completion:</span>
            <p className="text-lg font-black text-slate-900 dark:text-white font-display mt-0.5">
              {studyPlan.overallProgress}% Complete
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="command-card rounded-2xl p-4 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[11px]">Weekly Target:</span>
            <p className="text-lg font-black text-slate-900 dark:text-white font-display mt-0.5">
              {studyPlan.completedHoursThisWeek} / {studyPlan.weeklyTargetHours} hrs logged
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="command-card rounded-2xl p-4 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[11px]">GovReady Readiness:</span>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-display mt-0.5">
              {govCareerProfile?.govReadyScore} / 100
            </p>
          </div>
          <button
            onClick={() => navigate('/progress')}
            className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Radar</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Schedule Viewer */}
      <div className="command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-xl space-y-6">
        {/* Day Selector Pills */}
        <div className="flex items-center justify-between gap-3 flex-wrap pb-4 border-b border-slate-100 dark:border-navy-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {studyPlan.days.map((dayObj) => {
              const isSelected = selectedDay === dayObj.day;
              const allDone = dayObj.tasks.every((t) => t.completed);

              return (
                <button
                  key={dayObj.day}
                  onClick={() => setSelectedDay(dayObj.day)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{dayObj.day}</span>
                  {allDone && <span className="text-emerald-400 text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 text-[11px]">Filter:</span>
            {['all', 'urgent', 'high'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2 py-0.5 rounded-lg font-semibold uppercase text-[10px] ${
                  filterPriority === p
                    ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day's Task List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-display">
              {selectedDay} Learning Schedule
            </h3>
            <span className="text-xs text-slate-400">
              {filteredTasks.filter((t) => t.completed).length} of {filteredTasks.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const isUrgent = task.priority === 'urgent';
              const isHigh = task.priority === 'high';

              return (
                <div
                  key={task.id}
                  onClick={() => toggleStudyPlanTask(currentDayIndex, task.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    task.completed
                      ? 'bg-slate-50/60 dark:bg-navy-950/40 border-slate-200/60 dark:border-navy-800/60 opacity-80'
                      : isUrgent
                      ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/30 hover:border-rose-500'
                      : 'bg-white dark:bg-navy-950/70 border-slate-200 dark:border-navy-800 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-300 dark:border-navy-700 hover:border-cyan-500'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm ${
                            task.completed
                              ? 'line-through text-slate-400'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {task.topic}
                        </span>

                        <span
                          className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase ${
                            isUrgent
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                              : isHigh
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                              : 'bg-slate-100 dark:bg-navy-800 text-slate-500'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                        <span className="font-semibold text-cyan-600 dark:text-cyan-400">{task.subject}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {task.duration}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <span
                      className={`text-[11px] font-bold ${
                        task.completed
                          ? 'text-emerald-500'
                          : 'text-slate-400 group-hover:text-cyan-500'
                      }`}
                    >
                      {task.completed ? 'Completed' : 'Click to Mark Done'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { mockExamAlerts } from '../../data/mockGovJobs';
import {
  Bell,
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Filter,
} from 'lucide-react';

export const ExamAlertsSection = ({ maxItems = 6, showFilters = true }) => {
  const navigate = useNavigate();
  const { t } = useApp();
  const [filter, setFilter] = useState('All'); // 'All' | 'Closing Soon' | 'Open' | 'Upcoming'

  const filteredAlerts = mockExamAlerts.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Closing Soon') return item.applicationStatus === 'Closing Soon' || item.daysRemaining <= 14;
    if (filter === 'Open') return item.applicationStatus === 'Open';
    if (filter === 'Upcoming') return item.applicationStatus === 'Upcoming';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white font-display tracking-tight">
              {t('nextExamAlert', 'Government Exam Alerts')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active central & state recruitment cycles matched to your profile
            </p>
          </div>
        </div>

        {showFilters && (
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs font-semibold overflow-x-auto">
            {['All', 'Closing Soon', 'Open', 'Upcoming'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                  filter === tab
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'Closing Soon' ? '🚨 Closing Soon' : tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAlerts.slice(0, maxItems).map((alert) => {
          const isUrgent = alert.urgencyLevel === 'urgent';
          const isMedium = alert.urgencyLevel === 'medium';
          const isUpcoming = alert.urgencyLevel === 'upcoming';

          return (
            <div
              key={alert.id}
              className={`command-card rounded-2xl p-5 border transition-all flex flex-col justify-between group ${
                isUrgent
                  ? 'border-rose-500/40 bg-gradient-to-br from-white via-rose-500/5 to-white dark:from-navy-900 dark:via-rose-950/20 dark:to-navy-900'
                  : isMedium
                  ? 'border-amber-500/40 bg-gradient-to-br from-white via-amber-500/5 to-white dark:from-navy-900 dark:via-amber-950/20 dark:to-navy-900'
                  : 'border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900'
              }`}
            >
              <div>
                {/* Status Badge & Days Left */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider flex items-center gap-1 ${
                      isUrgent
                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse'
                        : isMedium
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {isUrgent && <AlertTriangle className="w-3 h-3" />}
                    {alert.applicationStatus}
                  </span>

                  <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {alert.daysRemaining} days left
                  </span>
                </div>

                {/* Exam Title & Organization */}
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {alert.examName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {alert.organization}
                </p>

                {/* Post info & vacancies */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Posts:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                      {alert.jobTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Vacancies:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      {alert.vacancies}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Last Date:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {alert.lastDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Exam Date:</span>
                    <span className="font-medium text-slate-600 dark:text-slate-300">
                      {alert.examDate}
                    </span>
                  </div>
                </div>

                {/* Eligibility Tag */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{alert.eligibility}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/analyzer?notice=${alert.notificationId || 'ssc-cgl-2026'}`)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 btn-command"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Analyze Notice</span>
                </button>
                <button
                  onClick={() => navigate('/jobs')}
                  className="p-2 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-600 dark:text-slate-300 transition-colors"
                  title="View Exam Match Details"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

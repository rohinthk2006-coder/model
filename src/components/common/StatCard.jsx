import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  color = 'blue',
  progress,
  animateValue = true,
}) => {
  // Extract number and suffix from string like "78%", "34.5 hrs", "7 days", "12"
  const parsedNum = parseFloat(value) || 0;
  const isDecimal = value.toString().includes('.');
  const animatedNumber = useCountUp(parsedNum, 1100, isDecimal, animateValue);

  // Derive suffix
  let suffix = '';
  if (value.toString().includes('%')) suffix = '%';
  else if (value.toString().includes('hrs')) suffix = ' hrs';
  else if (value.toString().includes('days')) suffix = ' days';

  const colorMap = {
    blue: {
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      bar: 'bg-emerald-500',
    },
    cyan: {
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
      bar: 'bg-teal-500',
    },
    emerald: {
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      bar: 'bg-emerald-500',
    },
    amber: {
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      bar: 'bg-amber-500',
    },
  };

  const selected = colorMap[color] || colorMap.blue;

  return (
    <div className="command-card command-card-hover rounded-2xl p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              {animateValue ? `${animatedNumber}${suffix}` : value}
            </span>
            {trend && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                  trendPositive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                }`}
              >
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border ${selected.iconBg} shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {typeof progress === 'number' && (
        <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-navy-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
            <span>Target Benchmark</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-navy-950 rounded-full h-1.5 overflow-hidden">
            <div
              className={`${selected.bar} h-full rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

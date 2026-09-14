import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { radarSkillData } from '../../data/mockSkills';

export const SkillRadarChart = ({ data = radarSkillData, showBenchmark = true }) => {
  const { theme } = useApp();
  const isBright = theme !== 'dark';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-blue-200 dark:border-navy-700 text-xs text-slate-800 dark:text-slate-100">
          <p className="font-bold text-sm text-blue-600 dark:text-cyan-400 mb-1">
            {payload[0].payload.skill}
          </p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-500 dark:text-slate-400">Current Score:</span>
              <span className="font-bold text-blue-600 dark:text-cyan-400">
                {payload[0].value}%
              </span>
            </div>
            {payload[1] && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-500 dark:text-slate-400">Benchmark:</span>
                <span className="font-bold text-slate-600 dark:text-slate-300">
                  {payload[1].value}%
                </span>
              </div>
            )}
            <div className="pt-1 border-t border-slate-100 dark:border-navy-800 text-[10px] text-slate-600 dark:text-slate-300">
              {payload[0].value >= (payload[1]?.value || 75)
                ? '✓ Exceeds Ministry Benchmark'
                : '⚠ Actionable Skill Gap Detected'}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#94a3b8" strokeOpacity={0.25} />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            stroke="#94a3b8"
            strokeOpacity={0.2}
          />
          <Tooltip content={<CustomTooltip />} />
          {showBenchmark && (
            <Radar
              name="Ministry Benchmark"
              dataKey="benchmark"
              stroke="#94a3b8"
              strokeDasharray="4 4"
              fill="#94a3b8"
              fillOpacity={0.1}
            />
          )}
          <Radar
            name="Your Proficiency"
            dataKey="score"
            stroke={isBright ? '#2563eb' : '#06b6d4'}
            strokeWidth={2.5}
            fill={isBright ? '#3b82f6' : '#06b6d4'}
            fillOpacity={0.35}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

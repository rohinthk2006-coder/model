import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { useApp } from '../../context/AppContext';

const weeklyData = [
  { day: 'Mon', hours: 1.5, target: 1.2, course: 'Cybersecurity' },
  { day: 'Tue', hours: 2.0, target: 1.2, course: 'Cloud Computing' },
  { day: 'Wed', hours: 0.8, target: 1.2, course: 'AI Quiz' },
  { day: 'Thu', hours: 2.5, target: 1.2, course: 'Data Analytics' },
  { day: 'Fri', hours: 1.0, target: 1.2, course: 'Cybersecurity Quiz' },
  { day: 'Sat', hours: 0.0, target: 0.5, course: 'Rest' },
  { day: 'Sun', hours: 0.5, target: 0.5, course: 'Review' },
];

export const WeeklyHoursChart = () => {
  const { theme } = useApp();
  const isBright = theme !== 'dark';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-navy-900/95 backdrop-blur-md p-2.5 rounded-xl shadow-xl border border-blue-200 dark:border-navy-700 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100">{label}</p>
          <p className="text-blue-600 dark:text-cyan-400 font-bold mt-1">
            {payload[0].value} Hours Completed
          </p>
          <p className="text-slate-400 text-[10px] mt-0.5">
            Focus: {payload[0].payload.course}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isBright ? '#bfdbfe' : '#94a3b8'} strokeOpacity={isBright ? 0.4 : 0.15} vertical={false} />
          <XAxis dataKey="day" tick={{ fill: isBright ? '#1e3a8a' : '#64748b', fontSize: 11 }} />
          <YAxis tick={{ fill: isBright ? '#1e3a8a' : '#64748b', fontSize: 11 }} unit="h" />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={1.2}
            stroke={isBright ? '#3b82f6' : '#f59e0b'}
            strokeDasharray="3 3"
            label={{ value: 'Daily Target (1.2h)', fill: isBright ? '#1d4ed8' : '#f59e0b', fontSize: 10 }}
          />
          <Bar
            dataKey="hours"
            fill={isBright ? '#2563eb' : '#10b981'}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

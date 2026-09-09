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
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-md p-2.5 rounded-xl shadow-xl border border-slate-200 dark:border-navy-700 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100">{label}</p>
          <p className="text-cyan-600 dark:text-cyan-400 font-bold mt-1">
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
          <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.15} vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} unit="h" />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={1.2} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Daily Target (1.2h)', fill: '#f59e0b', fontSize: 10 }} />
          <Bar dataKey="hours" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

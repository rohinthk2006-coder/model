import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { historicalSkillProgress } from '../../data/mockSkills';

export const SkillTrendChart = () => {
  const { theme } = useApp();
  const isBright = theme !== 'dark';

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={historicalSkillProgress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="overallGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isBright ? "#2563eb" : "#06b6d4"} stopOpacity={0.4} />
              <stop offset="95%" stopColor={isBright ? "#2563eb" : "#06b6d4"} stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isBright ? "#60a5fa" : "#2563eb"} stopOpacity={0.3} />
              <stop offset="95%" stopColor={isBright ? "#60a5fa" : "#2563eb"} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.15} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 11 }} unit="%" />
          <Tooltip
            contentStyle={{
              backgroundColor: isBright ? '#ffffff' : 'rgba(15, 23, 42, 0.9)',
              borderRadius: '12px',
              border: isBright ? '1px solid #bfdbfe' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isBright ? '#1e293b' : '#fff',
              fontSize: '11px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Area
            type="monotone"
            dataKey="overall"
            name="Overall Skill Score"
            stroke={isBright ? "#2563eb" : "#06b6d4"}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#overallGrad)"
          />
          <Area
            type="monotone"
            dataKey="technical"
            name="Technical Core"
            stroke={isBright ? "#60a5fa" : "#2563eb"}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#techGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

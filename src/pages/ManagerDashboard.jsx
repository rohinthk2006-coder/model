import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/common/StatCard';
import {
  CourseCompletionDonut,
  TeamSkillBarChart,
  TeamActivityLineChart,
} from '../components/charts/TeamDistributionChart';
import {
  teamStats,
  mockEmployees,
} from '../data/mockEmployees';
import {
  Users,
  UserCheck,
  Target,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Building2,
  Mail,
  Flame,
  AlertCircle,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
} from 'lucide-react';

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All'); // 'All' | '>80%' | '60-80%' | '<60%'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Excellent' | 'On Track' | 'Needs Attention' | 'Critical Gap'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = ['All', 'IT', 'HR', 'Finance', 'Administration', 'Operations', 'Citizen Services'];
  const scoreFilters = ['All', '>80%', '60-80%', '<60%'];
  const statusFilters = ['All', 'Excellent', 'On Track', 'Needs Attention', 'Critical Gap'];

  // Priority attention count: employees who need attention or have critical gaps
  const attentionEmployees = mockEmployees.filter(
    (e) => e.learningStatus === 'Needs Attention' || e.learningStatus === 'Critical Gap'
  );

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.primarySkillGap.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        departmentFilter === 'All' || emp.department === departmentFilter;

      const matchesStatus =
        statusFilter === 'All' || emp.learningStatus === statusFilter;

      let matchesScore = true;
      if (scoreFilter === '>80%') matchesScore = emp.skillScore >= 80;
      else if (scoreFilter === '60-80%') matchesScore = emp.skillScore >= 60 && emp.skillScore < 80;
      else if (scoreFilter === '<60%') matchesScore = emp.skillScore < 60;

      return matchesSearch && matchesDept && matchesStatus && matchesScore;
    });
  }, [searchQuery, departmentFilter, statusFilter, scoreFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Excellent':
        return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
      case 'On Track':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Needs Attention':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Critical Gap':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  const handlePriorityAttentionClick = () => {
    setStatusFilter('Needs Attention');
    addToast('Filtered roster to show personnel requiring priority training', 'info');
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Dashboard Top Header (Requirement #12) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Team Intelligence
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 border border-blue-500/20 font-mono">
              DIRECTOR COMMAND CENTER
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Monitor learning performance and identify organizational skill gaps.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/manager/skills')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-cyan-glow transition-all flex items-center gap-1.5 btn-command"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Manage Team Skill Gaps</span>
          </button>
        </div>
      </div>

      {/* Priority Attention Alert Banner (Requirement #12) */}
      <div
        onClick={handlePriorityAttentionClick}
        className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 cursor-pointer hover:bg-amber-500/15 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono">
                PRIORITY ATTENTION ALERT
              </span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.2 rounded-full font-bold text-amber-700 dark:text-amber-300">
                Action Required
              </span>
            </div>
            <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5">
              <strong>{attentionEmployees.length} employees</strong> require additional training to meet minimum departmental benchmarks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
          <span>Filter Roster</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* 4 Required Stats from Prompt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={teamStats.totalEmployees.toString()}
          subtitle="Across 6 administrative units"
          icon={Users}
          color="blue"
          progress={100}
          animateValue={true}
        />

        <StatCard
          title="Active Learners"
          value={teamStats.activeLearners.toString()}
          subtitle="81% weekly participation rate"
          icon={UserCheck}
          trend="+5 vs last month"
          trendPositive={true}
          color="emerald"
          progress={81}
          animateValue={true}
        />

        <StatCard
          title="Average Skill Score"
          value={`${teamStats.averageSkillScore}%`}
          subtitle="MeitY Target Standard: 75%"
          icon={Target}
          trend="+3% this quarter"
          trendPositive={true}
          color="cyan"
          progress={teamStats.averageSkillScore}
          animateValue={true}
        />

        <StatCard
          title="Skill Gaps Identified"
          value={teamStats.skillGapsIdentified.toString()}
          subtitle="Cloud & Cyber priority areas"
          icon={AlertTriangle}
          trend="Action Required"
          trendPositive={false}
          color="amber"
          progress={42}
          animateValue={true}
        />
      </div>

      {/* 3 Required Charts Grid: Team Skill Distribution, Course Completion, Learning Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart A: Team Skill Distribution */}
        <div className="command-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display">
              Skill Distribution
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Benchmark: 75%</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Comparing team proficiency average against national standards
          </p>
          <TeamSkillBarChart />
        </div>

        {/* Chart B: Course Completion Donut */}
        <div className="command-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display">
              Course Completion
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">48 Enrolled</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Breakdown across 48 enrolled ministerial personnel
          </p>
          <CourseCompletionDonut />
        </div>

        {/* Chart C: Learning Activity Line */}
        <div className="command-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display">
              Learning Activity Velocity
            </h3>
            <span className="text-[10px] text-emerald-500 font-bold font-mono">+18% MoM</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Total training hours logged across departments
          </p>
          <TeamActivityLineChart />
        </div>
      </div>

      {/* Upgraded Employee Table Section (Requirement #13) */}
      <div className="command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
              Departmental Learner Roster
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive team management with filters and individual drilldown inspection
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employee or ID..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200"
              />
            </div>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  Dept: {d}
                </option>
              ))}
            </select>

            {/* Score Filter (Requirement #13) */}
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300"
            >
              {scoreFilters.map((s) => (
                <option key={s} value={s}>
                  Score: {s}
                </option>
              ))}
            </select>

            {/* Status Filter (Requirement #13) */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300"
            >
              {statusFilters.map((st) => (
                <option key={st} value={st}>
                  Status: {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-navy-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider font-mono">
                <th className="pb-3 px-3">Employee</th>
                <th className="pb-3 px-3">Department</th>
                <th className="pb-3 px-3">Skill Score</th>
                <th className="pb-3 px-3">Courses Completed</th>
                <th className="pb-3 px-3">Learning Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-800 font-medium">
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  onClick={() => setSelectedEmployee(emp)}
                  className="hover:bg-slate-50/80 dark:hover:bg-navy-800/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {emp.name}
                      </span>
                      <span className="block text-[11px] text-slate-400 font-mono">
                        {emp.employeeId}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                    {emp.department}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white font-mono">
                        {emp.skillScore}%
                      </span>
                      <div className="w-14 bg-slate-200 dark:bg-navy-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${emp.skillScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {emp.coursesCompleted}
                    </span>{' '}
                    modules
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                        emp.learningStatus
                      )}`}
                    >
                      {emp.learningStatus}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEmployee(emp);
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:bg-slate-100 dark:hover:bg-navy-700 text-xs font-semibold text-blue-600 dark:text-cyan-400 transition-all inline-flex items-center gap-1 btn-command"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Drawer / Modal (Requirement #13) */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-cyan-500/30 overflow-hidden text-slate-900 dark:text-white p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 overflow-hidden shrink-0 border border-cyan-400/40">
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedEmployee.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {selectedEmployee.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {selectedEmployee.employeeId} • {selectedEmployee.designation}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-3 gap-3 text-xs text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Skill Score</span>
                <p className="font-bold text-cyan-500 text-lg mt-0.5 font-mono">
                  {selectedEmployee.skillScore}%
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Completed</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 text-lg mt-0.5 font-mono">
                  {selectedEmployee.coursesCompleted}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <span className="text-slate-400 text-[10px] uppercase font-mono">Status</span>
                <p className="font-bold text-xs mt-1">
                  <span className={`px-2 py-0.5 rounded-full border ${getStatusBadge(selectedEmployee.learningStatus)}`}>
                    {selectedEmployee.learningStatus}
                  </span>
                </p>
              </div>
            </div>

            {/* AI Diagnostics & Skill Gaps */}
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-navy-950/80 border border-blue-100 dark:border-navy-800 space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>AI Diagnostics & Remedial Path:</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Primary Knowledge Gap: <strong className="text-rose-500">{selectedEmployee.primarySkillGap}</strong>
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                Weekly commitment: <strong>{selectedEmployee.weeklyHours} hrs/week</strong> • Active streak: <strong>{selectedEmployee.streak} days</strong>
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1">
                Recommended Training: <strong>Cloud Computing Fundamentals (MeghRaj Architecture)</strong>
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedEmployee(null);
                  navigate('/manager/skills');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all btn-command"
              >
                Assign Remedial Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

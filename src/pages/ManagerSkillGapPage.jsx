import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { teamSkillGaps } from '../data/mockEmployees';
import {
  ShieldAlert,
  Sparkles,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Calendar,
  X,
  Target,
  Layers,
  Send,
  Building2,
} from 'lucide-react';

export const ManagerSkillGapPage = () => {
  const { addToast } = useApp();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(teamSkillGaps[0]);

  // Form State inside modal
  const [selectedCourse, setSelectedCourse] = useState('Cloud Computing Fundamentals');
  const [targetDept, setTargetDept] = useState('IT & Operations');
  const [deadlineDays, setDeadlineDays] = useState('30');
  const [isMandatory, setIsMandatory] = useState(true);

  const handleOpenAssign = (skill) => {
    setSelectedSkill(skill);
    if (skill.skill.includes('Cloud')) {
      setSelectedCourse('Cloud Computing Fundamentals');
    } else if (skill.skill.includes('Cyber')) {
      setSelectedCourse('Cybersecurity Essentials for Public Servants');
    } else if (skill.skill.includes('Data')) {
      setSelectedCourse('Data Analytics for Governance');
    } else {
      setSelectedCourse('AI Fundamentals for Public Administration');
    }
    setShowAssignModal(true);
  };

  const handleConfirmAssignment = (e) => {
    e.preventDefault();
    setShowAssignModal(false);
    addToast(
      `Training Path "${selectedCourse}" successfully assigned to ${selectedSkill.affectedCount} personnel in ${targetDept}! Dispatched via iGOT Karmayogi.`,
      'success',
      6000
    );
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Team Skill Gap Analysis
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Aggregated competency deficiencies across 48 employees and automated remedial assignments.
          </p>
        </div>

        <button
          onClick={() => handleOpenAssign(teamSkillGaps[0])}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Assign Training</span>
        </button>
      </div>

      {/* AI RECOMMENDATION CARD (Prominently Required) */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-br from-navy-900 via-blue-950 to-navy-900 text-white border border-cyan-500/40 shadow-cyan-glow overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                AI Executive Recommendation
              </span>
              <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Critical Priority
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              “Your team has the largest skill gap in <strong>Cloud Computing (42%)</strong>. Consider
              assigning the recommended Cloud Fundamentals learning path.”
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span>Impacted Personnel: <strong>20 Officers</strong></span>
              <span>•</span>
              <span>Department: <strong>IT & Operations</strong></span>
              <span>•</span>
              <span className="text-cyan-300">MeghRaj Architecture Standard</span>
            </div>
          </div>

          <button
            onClick={() => handleOpenAssign(teamSkillGaps[0])}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-cyan-glow transition-all flex items-center gap-2 shrink-0 group"
          >
            <span>Assign Training</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Most Common Skill Gaps Display (Strictly Required) */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Most Common Departmental Skill Gaps
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked by percentage gap and number of affected team members
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold">
            Total Gaps: 17
          </span>
        </div>

        <div className="space-y-5">
          {teamSkillGaps.map((gap) => (
            <div
              key={gap.skill}
              className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800/80 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {gap.skill}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        gap.priority === 'High'
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}
                    >
                      {gap.priority} Priority
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {gap.affectedCount} employees below proficiency benchmark
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-sm font-black text-rose-500 font-mono">
                      {gap.gapPercentage}% Gap
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      Avg: {gap.currentAvg}% / Benchmark: {gap.benchmark}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenAssign(gap)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1 shrink-0"
                  >
                    <span>Assign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-navy-900 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${gap.gapPercentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Training Interactive Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-cyan-500/40 overflow-hidden text-slate-900 dark:text-white">
            <div className="p-6 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Assign Mandatory Training Path
                  </h3>
                  <p className="text-xs text-slate-400">
                    Dispatched across iGOT Karmayogi & e-Office
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAssignModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAssignment} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Selected Course Module:
                </label>
                <input
                  type="text"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Target Department:
                  </label>
                  <select
                    value={targetDept}
                    onChange={(e) => setTargetDept(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <option>IT & Operations</option>
                    <option>Finance & Accounts</option>
                    <option>General Administration</option>
                    <option>All 48 Employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Completion Deadline:
                  </label>
                  <select
                    value={deadlineDays}
                    onChange={(e) => setDeadlineDays(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <option value="15">15 Days (Urgent)</option>
                    <option value="30">30 Days (Standard)</option>
                    <option value="60">60 Days (Quarterly)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-navy-950 border border-blue-100 dark:border-navy-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Mark as Statutory / Mandatory Requirement</span>
                <input
                  type="checkbox"
                  checked={isMandatory}
                  onChange={(e) => setIsMandatory(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-cyan-glow transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

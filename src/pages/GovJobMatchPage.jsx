import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockGovJobMatches } from '../data/mockGovJobs';
import { ExamAlertsSection } from '../components/government/ExamAlertsSection';
import { CareerRoadmap } from '../components/government/CareerRoadmap';
import { CoreUspWorkflowBanner } from '../components/government/CoreUspWorkflowBanner';
import {
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  Target,
  FileText,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const GovJobMatchPage = () => {
  const navigate = useNavigate();
  const { govCareerProfile, updateGovCareerProfile, addToast, t } = useApp();

  // Active view tab: 'matches' | 'alerts' | 'roadmap'
  const [activeTab, setActiveTab] = useState('matches');

  // Filter Form State prefilled from user profile
  const [formData, setFormData] = useState({
    education: govCareerProfile?.education || "Bachelor's Degree (B.E / B.Tech)",
    degreeBranch: govCareerProfile?.degreeBranch || 'Computer Science and Engineering (CSE)',
    age: govCareerProfile?.age || 24,
    state: govCareerProfile?.state || 'Tamil Nadu',
    category: govCareerProfile?.category || 'OBC (Non-Creamy Layer)',
    preferredDepartment: govCareerProfile?.preferredDepartment || 'Central Ministries (MeitY, Finance, Railways)',
    preferredJobType: govCareerProfile?.preferredJobType || 'Group B Gazetted & Non-Gazetted Posts',
    experience: govCareerProfile?.experience || '1 Year Software Dev / Fresher',
    salaryPreference: govCareerProfile?.salaryPreference || '₹45,000 - ₹1,42,400 (Level 7)',
    locationPreference: govCareerProfile?.locationPreference || 'Chennai / New Delhi / All-India',
  });

  const [isFiltering, setIsFiltering] = useState(false);
  const [matches, setMatches] = useState(mockGovJobMatches);

  const handleApplyFilter = (e) => {
    e.preventDefault();
    setIsFiltering(true);

    // Save to context profile
    updateGovCareerProfile(formData);

    setTimeout(() => {
      setIsFiltering(false);
      addToast('Government job matches recalculated based on your profile criteria', 'success');
    }, 600);
  };

  const handleSetTargetExam = (job) => {
    updateGovCareerProfile({ targetExam: job.title });
    addToast(`Target examination set to "${job.shortCode}"!`, 'success');
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Top Core USP Workflow Banner */}
      <CoreUspWorkflowBanner />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              {t('jobMatch', 'Government Job Match')}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              AI Powered
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalized civil services & public sector exam matching based on your degree, age, state, and competencies.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'matches'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Top Job Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'alerts'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Exam Alerts
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'roadmap'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Career Roadmap
          </button>
        </div>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-6 animate-fade-in">
          <ExamAlertsSection maxItems={9} showFilters={true} />
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="space-y-6 animate-fade-in">
          <CareerRoadmap />
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="space-y-7 animate-fade-in">
          {/* Collapsible Candidate Match Profile Form */}
          <div className="command-card rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-navy-800 shadow-md bg-white dark:bg-navy-900">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-navy-800">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                  Candidate Profile & Match Preferences
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">
                Auto-synced with your dossier profile
              </span>
            </div>

            <form onSubmit={handleApplyFilter}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Qualification:
                  </label>
                  <select
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Bachelor's Degree (B.E / B.Tech)</option>
                    <option>Bachelor of Science (B.Sc)</option>
                    <option>Bachelor of Commerce (B.Com)</option>
                    <option>Bachelor of Arts (B.A)</option>
                    <option>Post Graduate / Master's Degree</option>
                    <option>12th Standard / Higher Secondary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Degree / Branch:
                  </label>
                  <input
                    type="text"
                    value={formData.degreeBranch}
                    onChange={(e) => setFormData({ ...formData, degreeBranch: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Age & Category:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-20 px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option>General (UR)</option>
                      <option>OBC (Non-Creamy Layer)</option>
                      <option>EWS</option>
                      <option>SC</option>
                      <option>ST</option>
                      <option>PwBD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Domicile State:
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Kerala</option>
                    <option>Andhra Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Delhi NCR</option>
                    <option>Other / All India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Preferred Department:
                  </label>
                  <input
                    type="text"
                    value={formData.preferredDepartment}
                    onChange={(e) => setFormData({ ...formData, preferredDepartment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Preferred Job Cadre:
                  </label>
                  <select
                    value={formData.preferredJobType}
                    onChange={(e) => setFormData({ ...formData, preferredJobType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Group B Gazetted & Non-Gazetted Posts</option>
                    <option>Group A Central Services</option>
                    <option>Group C Clerical & Assistant Cadre</option>
                    <option>Specialist IT & Technical Cadre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    Salary Range:
                  </label>
                  <input
                    type="text"
                    value={formData.salaryPreference}
                    onChange={(e) => setFormData({ ...formData, salaryPreference: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isFiltering}
                    className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 btn-command"
                  >
                    {isFiltering ? (
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                    )}
                    <span>Recalibrate Matches</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Top Government Job Matches Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <span>Top Government Job Matches</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {matches.length} Examinations Matched
                </span>
              </h2>
              <span className="text-xs text-slate-400">
                Sorted by AI Compatibility Score
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {matches.map((job) => {
                const isTarget = govCareerProfile?.targetExam?.includes(job.shortCode);
                const isUrgent = job.daysRemaining <= 7;

                return (
                  <div
                    key={job.id}
                    className={`command-card rounded-2xl p-6 border transition-all flex flex-col justify-between group ${
                      isTarget
                        ? 'border-cyan-500 bg-gradient-to-br from-white via-cyan-500/5 to-white dark:from-navy-900 dark:via-cyan-950/30 dark:to-navy-900 shadow-cyan-glow'
                        : 'border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 hover:border-blue-500/40'
                    }`}
                  >
                    <div>
                      {/* Top Header Row: Match % Indicator + Urgency */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {/* Radial / Glow Match Badge */}
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-cyan-400 p-0.5 shadow-blue-glow flex items-center justify-center text-white shrink-0">
                            <div className="w-full h-full bg-navy-950 rounded-[14px] flex flex-col items-center justify-center">
                              <span className="text-xs font-black text-cyan-300 font-mono">
                                {job.matchPercentage}%
                              </span>
                              <span className="text-[8px] text-slate-300 font-bold uppercase tracking-tighter">
                                MATCH
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {job.title}
                              </h3>
                              {isTarget && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-cyan-500 text-navy-950 uppercase tracking-wide">
                                  Current Target
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {job.organization}
                            </p>
                          </div>
                        </div>

                        {/* Urgency or Status Tag */}
                        <div className="text-right shrink-0">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider inline-flex items-center gap-1 ${
                              isUrgent
                                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse'
                                : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {isUrgent && <AlertTriangle className="w-3 h-3" />}
                            {job.applicationStatus}
                          </span>
                        </div>
                      </div>

                      {/* Criteria Highlights Grid */}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
                          <span className="text-slate-400 text-[10px] block font-semibold">Eligibility Status:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px] mt-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            {job.eligibilityStatus}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
                          <span className="text-slate-400 text-[10px] block font-semibold">Approx. Salary:</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px] mt-0.5 truncate block">
                            {job.salaryRange.split('(')[0]}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
                          <span className="text-slate-400 text-[10px] block font-semibold">Age Limit:</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] mt-0.5">
                            {job.ageLimit.split('(')[0]}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
                          <span className="text-slate-400 text-[10px] block font-semibold">Exam Difficulty:</span>
                          <span className="font-bold text-blue-600 dark:text-cyan-400 text-[11px] mt-0.5">
                            {job.difficulty.split('(')[0]}
                          </span>
                        </div>
                      </div>

                      {/* AI Rationale / Reason for Recommendation */}
                      <div className="mt-3 p-3 rounded-xl bg-cyan-500/5 dark:bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-600 dark:text-slate-300">
                        <p className="leading-relaxed text-[11px]">
                          <strong className="text-cyan-600 dark:text-cyan-400">Recommendation Rationale:</strong>{' '}
                          {job.recommendationReason}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSetTargetExam(job)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isTarget
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <Target className="w-3.5 h-3.5" />
                          <span>{isTarget ? 'Primary Target' : 'Set as Target'}</span>
                        </button>

                        <button
                          onClick={() => navigate(`/analyzer?notice=${job.id}`)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Notification & Rules</span>
                        </button>
                      </div>

                      <button
                        onClick={() => navigate('/study-plan')}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1"
                      >
                        <span>Study Plan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

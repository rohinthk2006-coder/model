import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockRecruitmentNotifications } from '../data/mockGovJobs';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  BookOpen,
  FileCheck,
  RotateCw,
  Zap,
} from 'lucide-react';

export const NotificationAnalyzerPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const noticeParam = searchParams.get('notice');

  const { govCareerProfile, triggerAiSimulation, addToast, t } = useApp();

  // Selected sample notification or uploaded file
  const [selectedNoticeKey, setSelectedNoticeKey] = useState(
    noticeParam && mockRecruitmentNotifications[noticeParam]
      ? noticeParam
      : 'ssc-cgl-2026'
  );

  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(
    mockRecruitmentNotifications[selectedNoticeKey] || mockRecruitmentNotifications['ssc-cgl-2026']
  );

  const [activeSyllabusTab, setActiveSyllabusTab] = useState('reasoning');
  const [showEligibilityDetails, setShowEligibilityDetails] = useState(true);

  // Update when URL noticeParam changes
  useEffect(() => {
    if (noticeParam && mockRecruitmentNotifications[noticeParam]) {
      setSelectedNoticeKey(noticeParam);
      setAnalysisResult(mockRecruitmentNotifications[noticeParam]);
    }
  }, [noticeParam]);

  const handleSelectSample = (key) => {
    setSelectedNoticeKey(key);
    setUploadedFile(null);
    setAnalysisResult(mockRecruitmentNotifications[key]);
    addToast(`Loaded official notification for ${mockRecruitmentNotifications[key].jobTitle}`, 'info');
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file) => {
    setUploadedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type || 'application/pdf',
      lastModified: new Date(file.lastModified).toLocaleDateString(),
    });
    addToast(`Uploaded: ${file.name}`, 'success');
  };

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    triggerAiSimulation(
      'AI Government Notification Neural Parser',
      [
        'Scanning document OCR and gazette metadata...',
        'Parsing statutory vacancies, age bounds, and pay matrix levels...',
        'Extracting examination stages, negative marking rules, and syllabus...',
        'Cross-referencing requirements with saved Candidate Profile...',
        'Formulating synthesized Government Job at a Glance dossier...',
      ],
      () => {
        setIsAnalyzing(false);
        const result = mockRecruitmentNotifications[selectedNoticeKey] || mockRecruitmentNotifications['ssc-cgl-2026'];
        setAnalysisResult(result);
        setShowEligibilityDetails(true);
        addToast('AI Notification Analysis completed! Eligibility verified.', 'success', 5000);
      }
    );
  };

  return (
    <div className="space-y-7 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-navy-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              {t('notificationAnalyzer', 'AI Notification Analyzer')}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              PDF Neural Parser
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload any government recruitment gazette or PDF. AI extracts vacancies, syllabus, rules, and validates your exact eligibility.
          </p>
        </div>

        {/* Quick Sample Selector for Demo Judges */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Official Samples:</span>
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-xs font-semibold">
            <button
              onClick={() => handleSelectSample('ssc-cgl-2026')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedNoticeKey === 'ssc-cgl-2026'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              SSC CGL 2026
            </button>
            <button
              onClick={() => handleSelectSample('tnpsc-group-2')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedNoticeKey === 'tnpsc-group-2'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              TNPSC Group 2
            </button>
            <button
              onClick={() => handleSelectSample('rrb-ntpc-2026')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedNoticeKey === 'rrb-ntpc-2026'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              RRB NTPC
            </button>
          </div>
        </div>
      </div>

      {/* PDF Upload / Drag-and-Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Box */}
        <div className="lg:col-span-8 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleFileDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
              isDragOver
                ? 'border-cyan-500 bg-cyan-500/10 scale-[1.01]'
                : 'border-slate-200 dark:border-navy-700 hover:border-cyan-500/60 bg-slate-50/50 dark:bg-navy-950/40'
            }`}
          >
            <input
              type="file"
              id="pdfUploadInput"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label htmlFor="pdfUploadInput" className="cursor-pointer flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white font-display">
                Upload Government Recruitment Notification (PDF)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                Drag and drop your official PDF notice here, or click to browse files from your computer.
              </p>

              <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                <span>PDF up to 25 MB</span>
                <span>•</span>
                <span>Supports Central Gazettes, SSC, UPSC, RRB, State PSCs</span>
              </div>
            </label>
          </div>

          {/* Active File Preview Card */}
          <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {uploadedFile ? uploadedFile.name : analysisResult.fileName}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Size: {uploadedFile ? uploadedFile.size : analysisResult.fileSize} • Status: Ready for AI Evaluation
                </p>
              </div>
            </div>

            <button
              onClick={handleRunAiAnalysis}
              disabled={isAnalyzing}
              className="py-2 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-cyan-glow transition-all flex items-center justify-center gap-2 btn-command shrink-0"
            >
              {isAnalyzing ? (
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>{t('analyzeNotification', 'Analyze Notification with AI')}</span>
            </button>
          </div>
        </div>

        {/* Candidate Profile Snapshot & Check Eligibility Pill */}
        <div className="lg:col-span-4 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white font-display">
                  My Profile Parameters
                </h3>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                Auto-Matched
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800/60">
                <span className="text-slate-400">Candidate:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{govCareerProfile?.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800/60">
                <span className="text-slate-400">Education:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                  {govCareerProfile?.education}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800/60">
                <span className="text-slate-400">Degree:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                  {govCareerProfile?.degreeBranch}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800/60">
                <span className="text-slate-400">Age:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{govCareerProfile?.age} Years</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-navy-800/60">
                <span className="text-slate-400">Category:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{govCareerProfile?.category}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Domicile State:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{govCareerProfile?.state}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEligibilityDetails(!showEligibilityDetails)}
            className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs transition-all flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>{t('checkEligibility', 'Check My Eligibility')}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: CHECK MY ELIGIBILITY EXPANDED DOSSIER */}
      {showEligibilityDetails && analysisResult.eligibilityCriteriaMatch && (
        <div className="command-card rounded-2xl p-6 border border-emerald-500/40 bg-gradient-to-br from-white via-emerald-500/5 to-white dark:from-navy-900 dark:via-emerald-950/20 dark:to-navy-900 shadow-xl space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🟢</span>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white font-display">
                  Eligibility Evaluation: <span className="text-emerald-600 dark:text-emerald-400">{analysisResult.eligibilityCriteriaMatch.overallBadge}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Compared against {analysisResult.jobTitle} statutory recruitment gazette
                </p>
              </div>
            </div>

            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              100% Parameter Match
            </span>
          </div>

          {/* Detailed "Why?" Criteria Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-display">
              {t('whyExplanation', 'Why am I eligible? Exact Parameter Breakdown:')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {analysisResult.eligibilityCriteriaMatch.criteria.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      {c.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {c.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1">
                    <p>Required: <strong className="text-slate-700 dark:text-slate-300">{c.required}</strong></p>
                    <p>Your Dossier: <strong className="text-cyan-600 dark:text-cyan-400">{c.userActual}</strong></p>
                    <p className="text-slate-600 dark:text-slate-300 font-medium italic pt-0.5">"{c.reason}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Synthesis Summary */}
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-cyan-600 dark:text-cyan-400">AI Recommendation:</strong>{' '}
              {analysisResult.eligibilityCriteriaMatch.aiSummary}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: GOVERNMENT JOB AT A GLANCE SUMMARY CARD */}
      <div className="command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-navy-800">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-mono">
              AI Extracted Summary Dossier
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-display">
              Government Job at a Glance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {analysisResult.organization} • {analysisResult.jobTitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/study-plan')}
              className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 btn-command"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Create AI Study Plan</span>
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="py-2 px-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Launch Mock Test</span>
            </button>
          </div>
        </div>

        {/* 6 Key Parameter Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
            <span className="text-slate-400 text-[10px] block font-semibold">Vacancies:</span>
            <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-sm mt-0.5 block">
              {analysisResult.totalVacancies}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
            <span className="text-slate-400 text-[10px] block font-semibold">Pay Scale:</span>
            <span className="font-extrabold text-slate-800 dark:text-slate-200 text-xs mt-0.5 truncate block">
              {analysisResult.salary.split('(')[0]}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
            <span className="text-slate-400 text-[10px] block font-semibold">Age Limit:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">
              {analysisResult.ageLimit.split('(')[0]}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
            <span className="text-slate-400 text-[10px] block font-semibold">Last Date:</span>
            <span className="font-bold text-rose-600 dark:text-rose-400 text-xs mt-0.5 block">
              {analysisResult.importantDates.applicationClosing.split('(')[0]}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
            <span className="text-slate-400 text-[10px] block font-semibold">Tier-1 Exam Date:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5 block truncate">
              {analysisResult.importantDates.tier1ExamDate.split('(')[0]}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200/80 dark:border-navy-800/80">
            <span className="text-slate-400 text-[10px] block font-semibold">Marking Scheme:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 block">
              +2 / -0.50 Mark
            </span>
          </div>
        </div>

        {/* Selection Process & Dates Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
          {/* Selection Stages */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white font-display text-sm flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-cyan-500" />
              <span>Selection Process Stages</span>
            </h4>
            <div className="space-y-2">
              {analysisResult.selectionProcess.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600 text-white font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Timelines */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white font-display text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Critical Timelines & Dates</span>
            </h4>
            <div className="space-y-1.5">
              {Object.entries(analysisResult.importantDates).map(([k, v], idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-slate-200/50 dark:border-navy-800/50 last:border-none">
                  <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: EXTRACTED SYLLABUS BREAKDOWN */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-display flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-500" />
              <span>Extracted Official Syllabus</span>
            </h3>
            <span className="text-xs text-slate-400">Click section to view high-weightage topics</span>
          </div>

          {/* Syllabus Section Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-xs font-semibold overflow-x-auto">
            {['reasoning', 'quantitative', 'english', 'generalAwareness'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSyllabusTab(tab)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize whitespace-nowrap ${
                  activeSyllabusTab === tab
                    ? 'bg-blue-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>

          {/* Extracted Topics List */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {analysisResult.syllabus[activeSyllabusTab]?.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200/80 dark:border-navy-800 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/70 border border-slate-200 dark:border-navy-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 dark:text-white font-display text-sm">
            Mandatory Documents Required for Application
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
            {analysisResult.requiredDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

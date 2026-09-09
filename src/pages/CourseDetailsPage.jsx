import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  BookOpen,
  FileText,
  HelpCircle,
  Award,
  ArrowLeft,
  Share2,
  Download,
  AlertCircle,
} from 'lucide-react';

export const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, toggleModuleComplete, addToast } = useApp();

  const course = courses.find((c) => c.id === id) || courses[0];
  const [selectedModuleId, setSelectedModuleId] = useState(() => {
    // default to current module or first uncompleted module
    const current = course.modules.find((m) => !m.completed) || course.modules[0];
    return current ? current.id : 1;
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState('1.0x');
  const [userNote, setUserNote] = useState('');
  const [activeTab, setActiveTab] = useState('lecture'); // 'lecture', 'notes', 'resources'

  const activeModule =
    course.modules.find((m) => m.id === selectedModuleId) || course.modules[0];

  const handleToggleModule = (mId) => {
    toggleModuleComplete(course.id, mId);
    addToast(
      `Module ${mId} status toggled! Course progress updated to match.`,
      'success'
    );
  };

  const handleSaveNotes = () => {
    if (!userNote.trim()) return;
    addToast('Official learning notes saved to your Karmayogi e-Portfolio!', 'success');
  };

  const isModuleDone = activeModule.completed;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Breadcrumb Back Link */}
      <div className="flex items-center justify-between">
        <Link
          to="/learning"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Course Directory</span>
        </Link>

        {course.isAiRecommended && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            AI Recommended Learning Path
          </span>
        )}
      </div>

      {/* Course Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {course.category}
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-navy-950 text-slate-600 dark:text-slate-300">
                {course.level} Level
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {course.duration} Total
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>

            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3 pt-1">
              <span>Instructor: <strong className="text-slate-700 dark:text-slate-200">{course.instructor}</strong></span>
              <span>•</span>
              <span>Estimated remaining: <strong>{course.estimatedTimeLeft}</strong></span>
            </div>
          </div>

          {/* Overall Progress Widget */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 text-center shrink-0 w-full md:w-56 space-y-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Course Progress
            </div>
            <div className="text-3xl font-black text-blue-600 dark:text-cyan-400">
              {course.progress}%
            </div>
            <div className="w-full bg-slate-200 dark:bg-navy-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400">
              {course.modules.filter((m) => m.completed).length} of {course.modules.length} modules completed
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Player + Right Modules Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Simulated Video & Course Player (7 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Video Mockup Area */}
          <div className="rounded-2xl overflow-hidden bg-navy-950 border border-navy-800 shadow-xl text-white">
            {/* Simulated Video Canvas */}
            <div className="relative aspect-video bg-gradient-to-tr from-navy-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
              {/* Background HUD Graphics */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[11px] font-mono text-cyan-300 font-bold">
                  GOVLEARN INTERACTIVE PLAYER
                </span>
              </div>

              <div className="absolute top-4 right-4 text-[10px] text-slate-400 font-mono">
                1080p • MeghRaj Stream
              </div>

              {/* Center Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-2xl bg-blue-600/80 hover:bg-cyan-500 text-white flex items-center justify-center shadow-cyan-glow transition-all transform hover:scale-105 z-10"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7" />
                ) : (
                  <Play className="w-7 h-7 ml-1" />
                )}
              </button>

              <div className="mt-4 z-10 max-w-md">
                <p className="text-sm font-bold text-white tracking-wide">
                  {activeModule.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {isPlaying ? 'Playing interactive lecture telemetry...' : 'Click play to start simulated lecture'}
                </p>
              </div>

              {/* Timecode overlay */}
              <div className="absolute bottom-4 left-4 text-[11px] font-mono text-slate-300">
                {activeModule.videoTimestamp || '04:15 / 22:30'}
              </div>
            </div>

            {/* Simulated Player Controls Bar */}
            <div className="p-3 bg-navy-900 border-t border-navy-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg hover:bg-navy-800 text-cyan-400"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => addToast('Lecture rewound 10 seconds', 'info')}
                  className="p-1.5 rounded-lg hover:bg-navy-800 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-16 bg-navy-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-3/4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setVideoSpeed((prev) =>
                      prev === '1.0x' ? '1.25x' : prev === '1.25x' ? '1.5x' : '1.0x'
                    )
                  }
                  className="px-2 py-0.5 rounded bg-navy-800 hover:bg-navy-700 text-[11px] font-mono text-cyan-400 font-bold"
                >
                  {videoSpeed}
                </button>
                <button
                  onClick={() => addToast('Full screen preview mode toggled', 'info')}
                  className="p-1.5 rounded-lg hover:bg-navy-800 text-slate-400 hover:text-white"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Module Action & Mark Complete Banner */}
          <div className="p-4 rounded-xl glass-card border border-slate-200 dark:border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Active Module
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {activeModule.title}
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleToggleModule(activeModule.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isModuleDone
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isModuleDone ? 'Completed (Click to Reset)' : 'Mark Module Complete'}</span>
              </button>

              <Link
                to="/quiz"
                className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-cyan-500/30 transition-all flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Take AI Quiz</span>
              </Link>
            </div>
          </div>

          {/* Interactive Lecture / Notes / Resources Tabs */}
          <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-navy-800 pb-3 text-xs font-bold">
              <button
                onClick={() => setActiveTab('lecture')}
                className={`pb-1 transition-all ${
                  activeTab === 'lecture'
                    ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 font-extrabold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                Curriculum Brief
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-1 transition-all ${
                  activeTab === 'notes'
                    ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 font-extrabold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                My Learning Notes
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-1 transition-all ${
                  activeTab === 'resources'
                    ? 'text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500 font-extrabold'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                Gazettes & Guidelines (PDF)
              </button>
            </div>

            {activeTab === 'lecture' && (
              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-1">
                    {activeModule.summary}
                  </h4>
                  <p className="mt-2 text-slate-700 dark:text-slate-300">
                    {activeModule.content}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 space-y-2">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    Key Takeaways for Public Administration:
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
                    <li>Strict adherence to sovereign cloud guidelines and local storage protocols.</li>
                    <li>Ensure multi-tenant isolation for inter-ministerial application servers.</li>
                    <li>Incorporate automated audit trails mandated under Central Secretariat Manual.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-3">
                <textarea
                  rows={4}
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Type personal takeaways, circular references, or question points here..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSaveNotes}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Save Notes to Dossier
                </button>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span>MeghRaj GI Cloud Architecture Standard Manual.pdf</span>
                  </div>
                  <button
                    onClick={() => addToast('Simulated PDF Download initiated (MeghRaj Manual)', 'info')}
                    className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>CERT-In Direction 2022 Implementation Checklist.pdf</span>
                  </div>
                  <button
                    onClick={() => addToast('Simulated PDF Download initiated (CERT-In Checklist)', 'info')}
                    className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Modules Navigation Accordion & Objectives (5 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Modules List */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-800">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Course Modules
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">
                5 Modules
              </span>
            </div>

            <div className="space-y-2">
              {course.modules.map((mod) => {
                const isSelected = mod.id === selectedModuleId;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedModuleId(mod.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all flex items-start gap-3 border ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-navy-800/80 border-cyan-500/50 shadow-sm'
                        : 'bg-white dark:bg-navy-950/60 border-slate-200 dark:border-navy-800 hover:bg-slate-50 dark:hover:bg-navy-800/40'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {mod.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : isSelected ? (
                        <div className="w-4 h-4 rounded-full border-2 border-cyan-500 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-navy-700" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-bold leading-tight ${
                          isSelected
                            ? 'text-cyan-600 dark:text-cyan-300'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {mod.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span>{mod.duration}</span>
                        {mod.completed && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-500 font-semibold">Done</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Objectives Checklist */}
          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Learning Objectives
            </h3>
            <div className="space-y-2 text-xs">
              {course.learningObjectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

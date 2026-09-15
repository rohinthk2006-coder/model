import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Cpu,
  ShieldCheck,
  BookOpen,
  Calendar,
  HelpCircle,
  BrainCircuit,
  RotateCw,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const CoreUspWorkflowBanner = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(2); // 0-indexed, default at eligibility check

  const steps = [
    {
      title: 'Upload Notification',
      short: 'Upload PDF',
      desc: 'Upload official recruitment PDF directly',
      icon: UploadCloud,
      route: '/analyzer',
    },
    {
      title: 'AI Understands',
      short: 'AI Parsing',
      desc: 'Extracts age, vacancies, dates, pattern',
      icon: Cpu,
      route: '/analyzer',
    },
    {
      title: 'Checks Eligibility',
      short: 'Eligibility',
      desc: 'Matches with learner profile parameters',
      icon: ShieldCheck,
      route: '/analyzer',
    },
    {
      title: 'Extracts Syllabus',
      short: 'Syllabus',
      desc: 'Breaks down topic-wise marks & weightage',
      icon: BookOpen,
      route: '/analyzer',
    },
    {
      title: 'Creates Study Plan',
      short: 'Study Plan',
      desc: 'Tailors daily & weekly prep hours',
      icon: Calendar,
      route: '/study-plan',
    },
    {
      title: 'Generates Mock Test',
      short: 'Mock Test',
      desc: 'Simulates exam CBT with instant evaluation',
      icon: HelpCircle,
      route: '/quiz',
    },
    {
      title: 'Analyzes Weakness',
      short: 'Weakness',
      desc: 'Flags low-scoring subjects and topics',
      icon: BrainCircuit,
      route: '/study-plan',
    },
    {
      title: 'Updates Study Plan',
      short: 'Adaptive Shift',
      desc: 'Dynamically reallocates timetable slots',
      icon: RotateCw,
      route: '/study-plan',
    },
    {
      title: 'Calculates GovReady',
      short: 'GovReady',
      desc: 'Quantifies qualification benchmark score',
      icon: TrendingUp,
      route: '/progress',
    },
    {
      title: 'Tells Exam Ready',
      short: 'Exam Ready',
      desc: 'Alerts when candidate clears cutoffs',
      icon: Award,
      route: '/dashboard',
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-navy-900 via-blue-950 to-navy-900 border border-cyan-500/30 shadow-2xl text-white">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>GovLearn AI Differentiator</span>
            </span>
            <span className="text-[10px] text-cyan-200/70 font-mono">End-to-End Autonomous Pipeline</span>
          </div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-white mt-1 font-display">
            The Complete Autonomous Government Preparation Engine
          </h3>
        </div>

        <button
          onClick={() => navigate('/analyzer')}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-cyan-glow btn-command"
        >
          <span>Try Workflow Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Stepper Pipeline */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center min-w-[860px] justify-between relative py-2">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500/30 via-blue-500/40 to-cyan-500/30 -translate-y-2 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            const isPassed = idx <= activeStep;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="relative z-10 flex flex-col items-center cursor-pointer group px-1"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-navy-950 ring-4 ring-cyan-400/30 scale-110 shadow-lg'
                      : isPassed
                      ? 'bg-blue-600/80 text-white border border-cyan-400/40'
                      : 'bg-navy-800 text-slate-400 border border-navy-700 hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span
                  className={`text-[10px] font-bold mt-2 text-center whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'text-cyan-300 font-extrabold'
                      : isPassed
                      ? 'text-slate-200'
                      : 'text-slate-400'
                  }`}
                >
                  {step.short}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Explainer Card */}
      <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold font-mono flex items-center justify-center shrink-0">
            {activeStep + 1}
          </span>
          <div>
            <strong className="text-white font-bold">{steps[activeStep].title}:</strong>{' '}
            <span className="text-slate-300">{steps[activeStep].desc}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(steps[activeStep].route)}
          className="self-end sm:self-auto text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 shrink-0"
        >
          <span>Launch this Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Target,
  BrainCircuit,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
  Zap,
  Users,
  Compass,
  FileCheck,
  Server,
  Share2,
  BarChart3,
  HelpCircle,
  Activity,
} from 'lucide-react';
import { SIHBanner } from '../components/common/SIHBanner';
import { AICoreVisual } from '../components/common/AICoreVisual';
import { useInView } from '../hooks/useInView';

export const LandingPage = () => {
  const navigate = useNavigate();

  // Scroll Storytelling InView hooks
  const [section1Ref, section1InView] = useInView({ threshold: 0.25 });
  const [section2Ref, section2InView] = useInView({ threshold: 0.25 });
  const [section3Ref, section3InView] = useInView({ threshold: 0.25 });
  const [section4Ref, section4InView] = useInView({ threshold: 0.25 });
  const [section5Ref, section5InView] = useInView({ threshold: 0.25 });

  const steps = [
    {
      num: '01',
      title: 'Employee Skill Assessment',
      desc: 'Baseline diagnostic evaluating 6 core public-administration competencies aligned with National Civil Services standards.',
      icon: Target,
    },
    {
      num: '02',
      title: 'AI Identifies Skill Gaps',
      desc: 'Machine-learning engine compares performance against ministry benchmarks to pinpoint critical knowledge deficits.',
      icon: BrainCircuit,
    },
    {
      num: '03',
      title: 'Personalized Courses Recommended',
      desc: 'Tailored learning paths dynamically prioritized by gap urgency, duration, and departmental responsibilities.',
      icon: BookOpen,
    },
    {
      num: '04',
      title: 'AI Generates Quizzes',
      desc: 'Autonomous question synthesis generating scenario-based MCQs and compliance drills with instant remediation.',
      icon: Zap,
    },
    {
      num: '05',
      title: 'Progress & Performance Tracking',
      desc: 'Real-time telemetry feeds executive dashboards with competency growth, learning hours, and certified milestones.',
      icon: TrendingUp,
    },
  ];

  const features = [
    {
      title: 'AI Skill Gap Detection',
      desc: 'Deep multi-variable analysis detecting technical vulnerabilities, statutory compliance gaps, and role-based training requirements.',
      icon: Target,
      color: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'Personalized Training',
      desc: 'Curated curriculum adapted to each employee’s cadre, designation, and current performance curve for optimal time investment.',
      icon: BookOpen,
      color: 'from-cyan-500 to-emerald-500',
    },
    {
      title: 'Automatic Quiz Generation',
      desc: 'On-demand contextual evaluations created by neural algorithms based directly on active government policies and course modules.',
      icon: Cpu,
      color: 'from-indigo-600 to-blue-500',
    },
    {
      title: 'Learning Progress Tracking',
      desc: 'Comprehensive analytics with visual radar models, weekly velocity charts, and competency credit verification.',
      icon: TrendingUp,
      color: 'from-amber-500 to-rose-500',
    },
  ];

  const benefits = [
    {
      title: 'Better Employee Development',
      desc: 'Transforms arbitrary training into targeted mastery tailored to individual career progression and departmental demands.',
      metric: '4.2x',
      metricLabel: 'Faster skill acquisition',
    },
    {
      title: 'Faster Identification of Skill Gaps',
      desc: 'Pinpoints critical deficiencies in cybersecurity, data handling, and cloud architecture in real-time instead of yearly reviews.',
      metric: '88%',
      metricLabel: 'Early gap detection rate',
    },
    {
      title: 'Personalized Learning Journeys',
      desc: 'Eliminates one-size-fits-all training by recommending exactly what each civil servant needs for statutory and operational success.',
      metric: '100%',
      metricLabel: 'Role-aligned modules',
    },
    {
      title: 'Reduced Manual Quiz Creation',
      desc: 'Automates assessment synthesis for trainers and managers, producing high-fidelity scenario questions in seconds.',
      metric: '95%',
      metricLabel: 'Less administrative overhead',
    },
    {
      title: 'Better Manager Visibility',
      desc: 'Gives administrative directors and training cells macro-level clarity into team readiness and compliance milestones.',
      metric: '360°',
      metricLabel: 'Executive team oversight',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white transition-colors duration-200">
      <SIHBanner />

      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-30 bg-white/85 dark:bg-navy-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-navy-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 flex items-center justify-center shadow-blue-glow text-white font-black text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  GovLearn
                </span>
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                National Governance Learning Portal
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#story-experience" className="hover:text-cyan-500 transition-colors">
              Platform Journey
            </a>
            <a href="#why-govlearn" className="hover:text-cyan-500 transition-colors">
              Capabilities
            </a>
            <a href="#how-it-works" className="hover:text-cyan-500 transition-colors">
              Workflow
            </a>
            <a href="#karmayogi" className="hover:text-cyan-500 transition-colors">
              iGOT Integration
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-500 px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 btn-command"
            >
              <span>Explore Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Cinematic Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle animated background grid & ambient light lines */}
        <div className="absolute inset-0 opacity-20 dark:opacity-25 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-600/15 via-cyan-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Hero Content: Staggered Staged Reveal */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold shadow-sm animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>Smart India Hackathon 2026 • Problem Statement SIH26101</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12] animate-fade-in-up">
                AI-Powered Learning <br />
                <span className="ai-gradient-text">for Smarter Governance</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                Identify skill gaps. Personalize learning. Measure progress.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-blue-glow transition-all flex items-center gap-2 group btn-command"
                >
                  <span>Explore Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#story-experience"
                  className="px-6 py-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm transition-all btn-command"
                >
                  See How It Works
                </a>
              </div>

              <div className="pt-3 text-xs font-medium text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Role-Based Public Sector Upskilling
                </span>
                <span>•</span>
                <span>MeghRaj GI Cloud Standards</span>
                <span>•</span>
                <span>FRAC Aligned</span>
              </div>
            </div>

            {/* Right Hero Visual: Abstract Interactive AI Core Visual */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <AICoreVisual />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SCROLL-BASED STORYTELLING (5 Stages) */}
      <section id="story-experience" className="py-24 bg-white dark:bg-navy-900 border-y border-slate-200 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-mono">
              The Intelligent Cycle
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              Continuous Upskilling Workflow
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Watch how GovLearn AI progressively transforms public service capabilities from baseline diagnostic to verified mastery.
            </p>
          </div>

          {/* Story 1: Understand Your Skills */}
          <div
            ref={section1Ref}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${
              section1InView ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'
            }`}
          >
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                Step 1 • Diagnostics
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Understand Your Skills
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                GovLearn AI evaluates 6 fundamental governance domains against national civil service standards, charting your active profile with high-precision spider mapping.
              </p>
              <div className="pt-2">
                <Link
                  to="/skills"
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Inspect Radar Model <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-800 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Radar Competency Overview
                </span>
                <span className="text-emerald-500 font-bold">Overall Score: 78%</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <span className="text-slate-400 text-[10px]">Digital Governance</span>
                  <div className="font-bold text-emerald-500 text-lg mt-0.5">86%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <span className="text-slate-400 text-[10px]">Communication</span>
                  <div className="font-bold text-emerald-500 text-lg mt-0.5">82%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <span className="text-slate-400 text-[10px]">Data Analytics</span>
                  <div className="font-bold text-cyan-500 text-lg mt-0.5">72%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <span className="text-slate-400 text-[10px]">AI Fundamentals</span>
                  <div className="font-bold text-slate-300 text-lg mt-0.5">68%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <span className="text-slate-400 text-[10px]">Cybersecurity</span>
                  <div className="font-bold text-amber-500 text-lg mt-0.5">61%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <span className="text-slate-400 text-[10px]">Cloud Computing</span>
                  <div className="font-bold text-rose-500 text-lg mt-0.5">54%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2: Discover Your Gaps */}
          <div
            ref={section2Ref}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${
              section2InView ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'
            }`}
          >
            <div className="lg:col-span-7 order-2 lg:order-1 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-navy-800 font-bold">
                <span className="text-slate-800 dark:text-slate-200">Critical Skill Gaps Identified</span>
                <span className="text-rose-500">Action Required</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span>Cloud Computing (MeghRaj Architecture)</span>
                    <span className="text-rose-500 font-mono">54% (Gap: -21%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-navy-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: section2InView ? '54%' : '0%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span>Cybersecurity (CERT-In Compliance & Encryption)</span>
                    <span className="text-amber-500 font-mono">61% (Gap: -19%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-navy-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-1000 ease-out delay-150"
                      style={{ width: section2InView ? '61%' : '0%' }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span>AI Fundamentals (Responsible Public AI)</span>
                    <span className="text-cyan-500 font-mono">68% (Gap: -7%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-navy-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all duration-1000 ease-out delay-300"
                      style={{ width: section2InView ? '68%' : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Step 2 • Gap Detection
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Discover Your Gaps
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Rather than generic tests, the algorithm isolates specific statutory deficiencies like CERT-In notification mandates and cloud data sovereignty protocols.
              </p>
            </div>
          </div>

          {/* Story 3: Get Personalized Learning */}
          <div
            ref={section3Ref}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${
              section3InView ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'
            }`}
          >
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
                Step 3 • Intelligent Curriculum
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Get Personalized Learning
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Dynamically generated training routes prioritize the courses that yield the greatest capability lift for your ministerial role.
              </p>
              <div className="pt-2">
                <Link
                  to="/learning"
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Explore Course Catalog <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="command-card rounded-xl p-4 border border-cyan-500/30 shadow-sm space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  AI Recommended
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Cloud Computing Fundamentals
                </h4>
                <p className="text-[11px] text-slate-500">
                  Why this course? Closes your 21% gap in MeghRaj architecture.
                </p>
                <div className="pt-2 flex justify-between text-[10px] text-slate-400">
                  <span>Progress: 35%</span>
                  <span>6 Hours</span>
                </div>
              </div>

              <div className="command-card rounded-xl p-4 border border-blue-500/30 shadow-sm space-y-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  AI Recommended
                </span>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  Cybersecurity Essentials
                </h4>
                <p className="text-[11px] text-slate-500">
                  Why this course? Directly addresses CERT-In compliance gaps.
                </p>
                <div className="pt-2 flex justify-between text-[10px] text-slate-400">
                  <span>Progress: 20%</span>
                  <span>4 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story 4: Learn Through AI-Generated Assessments */}
          <div
            ref={section4Ref}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${
              section4InView ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'
            }`}
          >
            <div className="lg:col-span-7 order-2 lg:order-1 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800 space-y-4">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-navy-800">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">
                  Interactive AI Question Generator
                </span>
                <span className="font-mono text-slate-400">5 Questions Ready</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-800 space-y-2.5 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">
                  "What is the primary purpose of encryption?"
                </p>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-300">
                    A. Data compression
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-50 dark:bg-navy-800 border border-cyan-500 text-slate-900 dark:text-white font-semibold">
                    B. Data protection ✓
                  </div>
                  <div className="p-2 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-300">
                    C. Data deletion
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                Step 4 • Auto Assessments
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Learn Through AI Assessments
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Generate real scenario-based practice questions derived directly from public policy circulars and course materials.
              </p>
              <div className="pt-2">
                <Link
                  to="/quiz"
                  className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline inline-flex items-center gap-1"
                >
                  Try AI Assessment Generator <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Story 5: Track Your Growth */}
          <div
            ref={section5Ref}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-700 ${
              section5InView ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-8'
            }`}
          >
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Step 5 • Verification
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Track Your Growth
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Monitor learning velocity, weekly study hours, and certified badges automatically synced with your official iGOT civil service dossier.
              </p>
              <div className="pt-2">
                <Link
                  to="/progress"
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  View Analytics View <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 command-card rounded-2xl p-6 border border-slate-200 dark:border-navy-800">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-display">78%</div>
                  <span className="text-[11px] text-slate-400">Current Score</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <div className="text-2xl font-black text-cyan-500 font-display">34.5h</div>
                  <span className="text-[11px] text-slate-400">Hours Logged</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                  <div className="text-2xl font-black text-amber-500 font-display">7 Days</div>
                  <span className="text-[11px] text-slate-400">Active Streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: Why GovLearn AI? (4 Feature Cards) */}
      <section id="why-govlearn" className="py-20 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-mono">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              Why GovLearn AI?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Purpose-built for the unique demands, hierarchies, and security protocols of the Indian public sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="command-card command-card-hover rounded-2xl p-6 border border-slate-200 dark:border-navy-800 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${f.color} flex items-center justify-center text-white mb-5 shadow-sm`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-navy-800/60">
                    <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                      Explore Capability <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section B: How It Works (5 Steps) */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-navy-900 border-y border-slate-200 dark:border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 font-mono">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              How GovLearn AI Operates
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              A continuous, automated cycle of assessment, diagnostics, remediation, and verifiable growth.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/40 to-blue-500/20 -translate-y-8 pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="command-card rounded-2xl p-5 border border-slate-200 dark:border-navy-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-2xl font-black text-cyan-600 dark:text-cyan-400 opacity-60">
                          {step.num}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-500/20">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 text-[10px] text-slate-400 font-semibold">
                      Phase {idx + 1} of 5
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Platform Benefits */}
      <section id="benefits" className="py-20 bg-slate-50 dark:bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-mono">
              Measurable Governance Impact
            </span>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
              Engineered for Real Administrative Impact
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Solving the bottlenecks of traditional civil service training with smart automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                      {b.metric}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-950">
                      {b.metricLabel}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800/80 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Validated in SIH 2026 Simulation</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: iGOT Karmayogi Integration Showcase */}
      <section id="karmayogi" className="py-20 bg-gradient-to-b from-slate-50 to-blue-50/50 dark:from-navy-950 dark:to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-navy-950 via-blue-950 to-navy-900 text-white border border-cyan-500/30 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold font-mono">
                  <Server className="w-3.5 h-3.5 text-cyan-400" />
                  <span>National Civil Services Integration Architecture</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Designed to Connect with the{' '}
                  <span className="text-cyan-400">iGOT Karmayogi</span> Ecosystem
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  GovLearn AI is envisioned as a smart automation layer that complements the Mission
                  Karmayogi digital repository. By synthesizing diagnostic telemetry and automated
                  curriculum routing, it augments the Capacity Building Commission (CBC) mandate.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bi-directional Competency Sync:</strong> Automatically imports employee cadre role dictionaries and exports completed AI module credits.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>MeghRaj Compliance:</strong> Sovereign hosting architecture compliant with CERT-In security baseline and DPDP Act 2023 regulations.
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>FRAC Alignment:</strong> Fully mapped to Framework for Roles, Activities, and Competencies used by civil services departments.
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-block text-[11px] text-cyan-300/80 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20 font-mono">
                    *Visual Prototype Showcase • Mock Integration
                  </span>
                </div>
              </div>

              {/* Graphical Integration Bridge Diagram */}
              <div className="p-6 rounded-2xl bg-navy-950/80 border border-cyan-500/30 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-navy-800 text-xs font-bold text-slate-300">
                  <span>Architecture Bridge Diagram</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Gateway Ready
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-blue-900/40 border border-blue-500/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-cyan-300">GovLearn AI Core</div>
                      <div className="text-[10px] text-slate-400">
                        Gap Analysis • Quiz Generator • Micro-Interactions
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-200">
                      Module Engine
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 py-1 text-slate-400 text-[11px]">
                    <Share2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>REST / GraphQL Sovereign API Bus</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-900/40 border border-indigo-500/40 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-indigo-200">iGOT Karmayogi Platform</div>
                      <div className="text-[10px] text-slate-400">
                        National Civil Services Registry • SPARROW & PFMS Linkages
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200">
                      DoPT Ecosystem
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-900/90 border border-navy-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Latency: &lt; 24ms</span>
                  <span>Encryption: AES-256 / TLS 1.3</span>
                  <span>Protocol: MeghRaj API Spec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 border-t border-navy-800 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs">
                  GL
                </div>
                <span>GovLearn AI</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Smarter Learning. Stronger Skills. Better Governance. AI-enabled continuous upskilling prototype for Indian public administration.
              </p>
              <p className="text-[11px] text-slate-500">
                Team BOCT • Smart Automation Theme
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                    Employee Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/skills" className="hover:text-cyan-400 transition-colors">
                    AI Skill Gap Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/learning" className="hover:text-cyan-400 transition-colors">
                    Personalized Courses
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="hover:text-cyan-400 transition-colors">
                    AI Quiz Generator
                  </Link>
                </li>
                <li>
                  <Link to="/manager" className="hover:text-cyan-400 transition-colors">
                    Manager Overview
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
                Smart India Hackathon 2026
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>Problem Statement: SIH26101</li>
                <li>Theme: Smart Automation</li>
                <li>Team: BOCT</li>
                <li>Category: Software Edition</li>
                <li>Alignment: Capacity Building Commission</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
                Compliance & Standards
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>MeghRaj GI Cloud Standards</li>
                <li>DPDP Act 2023 Principles</li>
                <li>CERT-In Security Framework</li>
                <li>GIGW 3.0 Accessibility Guidelines</li>
                <li>W3C Web Standards Compliant</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-navy-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 GovLearn AI — Smart India Hackathon Prototype. Developed by Team BOCT.
            </div>
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-slate-300">About</a>
              <span>•</span>
              <a href="#contact" className="hover:text-slate-300">Contact</a>
              <span>•</span>
              <a href="#privacy" className="hover:text-slate-300">Privacy & Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

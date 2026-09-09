import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, RefreshCw, Zap, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIInsightCard = ({
  buttonText = 'View AI Analysis',
  buttonLink = '/skills',
}) => {
  const navigate = useNavigate();
  const { triggerAiSimulation, addToast } = useApp();

  const [insightStage, setInsightStage] = useState(1);
  const [displayedText, setDisplayedText] = useState('');

  const stageMessages = {
    1: 'Analyzing your learning activity...',
    2: 'Your strongest area is Digital Governance (86% proficiency).',
    3: 'Cloud Computing and Cybersecurity require additional focus this week.',
  };

  useEffect(() => {
    // Stage 1 -> Stage 2 after 700ms
    const t1 = setTimeout(() => {
      setInsightStage(2);
    }, 700);

    // Stage 2 -> Stage 3 after 2400ms
    const t2 = setTimeout(() => {
      setInsightStage(3);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Typewriter effect for current stage message
  useEffect(() => {
    const fullText = stageMessages[insightStage];
    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.substring(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [insightStage]);

  const handleRefreshAnalysis = () => {
    setInsightStage(1);
    triggerAiSimulation(
      'Live AI Competency Re-evaluation',
      [
        'Aggregating recent quiz performance telemetry...',
        'Computing dynamic delta across 6 competency domains...',
        'Synthesizing remedial curriculum recommendations...',
        'Calibrating against MeitY departmental standard...',
      ],
      () => {
        setInsightStage(3);
        addToast('AI Competency Model refreshed with latest telemetry', 'success');
      }
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-navy-950 via-navy-900 to-blue-950 text-white border border-cyan-500/30 shadow-cyan-glow">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-600/15 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-3 max-w-2xl">
          {/* Header with Small Animated AI Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-xs font-bold tracking-wider uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              AI LEARNING INSIGHT
            </span>

            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Confidence: 94.8%
            </span>
          </div>

          {/* Sequential Typewriter Message Area */}
          <div className="min-h-[48px] flex items-center">
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed font-sans">
              {displayedText}
              <span className="inline-block w-1.5 h-4 bg-cyan-400 ml-1 translate-y-0.5 animate-typewriter-blink" />
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Predicted Competency Lift: +12% upon completing remedial paths
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              CERT-In Baseline Verified
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefreshAnalysis}
            className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5"
            title="Re-run AI Analysis"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Re-analyze</span>
          </button>

          <button
            onClick={() => navigate(buttonLink)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-cyan-glow transition-all flex items-center gap-2 group"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

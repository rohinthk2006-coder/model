import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { quizQuestionBank } from '../data/mockQuizzes';
import {
  Sparkles,
  HelpCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  BrainCircuit,
  Sliders,
  Award,
  AlertCircle,
  Zap,
  BookOpen,
  Cpu,
  Check,
} from 'lucide-react';

export const AIQuizGeneratorPage = () => {
  const navigate = useNavigate();
  const {
    activeQuizConfig,
    setActiveQuizConfig,
    setQuizResult,
    addToast,
  } = useApp();

  // Configuration Form State
  const [topic, setTopic] = useState(activeQuizConfig.topic || 'Cybersecurity');
  const [difficulty, setDifficulty] = useState(activeQuizConfig.difficulty || 'Medium');
  const [questionCount, setQuestionCount] = useState(activeQuizConfig.questionCount || 5);
  const [questionType, setQuestionType] = useState(activeQuizConfig.questionType || 'MCQ');

  // Quiz Execution State
  const [quizState, setQuizState] = useState('config'); // 'config' | 'generating' | 'active'
  const [generationPhase, setGenerationPhase] = useState(0); // 0 to 4

  const generationStages = [
    { label: 'Learning Material', sub: 'Scanning curriculum & gazettes' },
    { label: 'AI Analysis', sub: 'Extracting statutory competencies' },
    { label: 'Question Generation', sub: 'Synthesizing scenario distractor options' },
    { label: 'Difficulty Optimization', sub: 'Calibrating against CERT-In standards' },
    { label: 'Quiz Ready', sub: 'Formulating assessment session' },
  ];

  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showImmediateFeedback, setShowImmediateFeedback] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300);

  const topicsList = [
    'Cybersecurity',
    'Cloud Computing',
    'Data Analytics',
    'AI Fundamentals',
    'Digital Governance',
  ];

  // Keyboard friendly shortcuts (A, B, C, D or 1, 2, 3, 4)
  useEffect(() => {
    if (quizState !== 'active') return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (['A', '1'].includes(key)) handleSelectAnswer(0);
      else if (['B', '2'].includes(key)) handleSelectAnswer(1);
      else if (['C', '3'].includes(key)) handleSelectAnswer(2);
      else if (['D', '4'].includes(key)) handleSelectAnswer(3);
      else if (e.key === 'ArrowRight') {
        if (currentQuestionIndex < activeQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quizState, currentQuestionIndex, activeQuestions.length]);

  const handleGenerateQuiz = () => {
    setQuizState('generating');
    setGenerationPhase(0);

    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase < generationStages.length) {
        setGenerationPhase(phase);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const topicBank = quizQuestionBank[topic] || quizQuestionBank.Cybersecurity;
          const questionsList = topicBank[questionType] || topicBank.MCQ;
          const selected = questionsList.slice(0, Number(questionCount));

          setActiveQuestions(selected);
          setCurrentQuestionIndex(0);
          setUserAnswers({});
          setTimerSeconds(Number(questionCount) * 60);
          setQuizState('active');
          setActiveQuizConfig({ topic, difficulty, questionCount, questionType });
          addToast(`AI Quiz generated successfully (${selected.length} questions)!`, 'success');
        }, 500);
      }
    }, 450);
  };

  const handleSelectAnswer = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
    setShowImmediateFeedback(true);
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    activeQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const total = activeQuestions.length;
    const calculatedScore = Math.round((correct / total) * 100);

    const timeSpentSeconds = Number(questionCount) * 60 - timerSeconds;
    const mins = Math.floor(timeSpentSeconds / 60);
    const secs = timeSpentSeconds % 60;
    const timeSpentStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    setQuizResult({
      score: calculatedScore,
      correctCount: correct,
      totalCount: total,
      timeSpent: timeSpentStr,
      topic,
      difficulty,
      questions: activeQuestions,
      userAnswers,
    });

    addToast(`Assessment complete! Score: ${calculatedScore}%`, 'info');
    navigate('/quiz/result');
  };

  const currentQ = activeQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === activeQuestions.length - 1;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2 pb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AUTONOMOUS EVALUATION ENGINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
          AI-Powered Assessment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Generate practice questions based on your learning materials.
        </p>
      </div>

      {/* STATE 1: CONFIGURATION PANEL */}
      {quizState === 'config' && (
        <div className="command-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-navy-800">
            <Sliders className="w-4 h-4 text-cyan-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              Assessment Configuration Parameters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Topic Selector */}
            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Select Competency Topic:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {topicsList.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`p-3 rounded-xl text-xs font-bold text-center transition-all border btn-command ${
                      topic === t
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                        : 'bg-white dark:bg-navy-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Difficulty Level:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all border btn-command ${
                      difficulty === d
                        ? 'bg-cyan-500 text-navy-950 font-bold border-cyan-500 shadow-sm'
                        : 'bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Number of Questions:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-center transition-all border btn-command ${
                      questionCount === count
                        ? 'bg-cyan-500 text-navy-950 font-bold border-cyan-500 shadow-sm'
                        : 'bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-800 hover:bg-slate-50'
                    }`}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Question Type */}
            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Question Format:
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {['MCQ', 'True/False'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setQuestionType(type)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold text-center transition-all border btn-command ${
                      questionType === type
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white dark:bg-navy-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-navy-800'
                    }`}
                  >
                    {type === 'MCQ' ? 'Multiple Choice (MCQ)' : 'True / False Statements'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-navy-800">
            <button
              onClick={handleGenerateQuiz}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-cyan-glow transition-all flex items-center justify-center gap-2 btn-command"
            >
              <BrainCircuit className="w-5 h-5" />
              <span>Generate AI Quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* STATE 2: FULL-WIDTH AI PROCESSING PANEL (Requirement #10) */}
      {quizState === 'generating' && (
        <div className="command-card rounded-2xl p-8 sm:p-12 border border-cyan-500/40 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              SYNTHESIZING CURRICULUM ASSESSMENT
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Evaluation Synthesis in Progress
            </h3>
            <p className="text-xs text-slate-400">
              Domain: <strong className="text-cyan-500">{topic}</strong> • Difficulty: <strong>{difficulty}</strong>
            </p>
          </div>

          {/* 5-Stage Horizontal Workflow Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {generationStages.map((stage, idx) => {
              const isPast = idx < generationPhase;
              const isCurrent = idx === generationPhase;

              return (
                <div
                  key={stage.label}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${
                    isCurrent
                      ? 'bg-cyan-500/10 border-cyan-400 text-cyan-700 dark:text-cyan-300 shadow-sm scale-102'
                      : isPast
                      ? 'bg-slate-50 dark:bg-navy-950 border-emerald-500/40 text-slate-700 dark:text-slate-300'
                      : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-navy-800 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold">0{idx + 1}</span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 text-cyan-500 animate-spin" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-navy-800" />
                    )}
                  </div>
                  <h4 className="font-bold text-xs leading-tight mb-0.5">{stage.label}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">
                    {stage.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-navy-950 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${((generationPhase + 1) / generationStages.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STATE 3: ACTIVE QUESTIONS DISPLAY */}
      {quizState === 'active' && currentQ && (
        <div className="space-y-6">
          {/* Status bar */}
          <div className="command-card rounded-xl p-4 border border-slate-200 dark:border-navy-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold text-slate-900 dark:text-white">
                Question {currentQuestionIndex + 1} / {activeQuestions.length}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{topic}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Shortcuts: [1-4] or [A-D]
              </span>
              <span className="text-slate-400">
                ({answeredCount}/{activeQuestions.length} answered)
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="command-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-navy-800 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-mono">
                QUESTION {currentQuestionIndex + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentQuestionIndex] === oIdx;
                const letter = String.fromCharCode(65 + oIdx);

                return (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelectAnswer(oIdx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 border btn-command ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-navy-800/90 border-emerald-500 text-slate-900 dark:text-white ring-2 ring-emerald-500/20'
                        : 'bg-white dark:bg-navy-950 border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 font-mono ${
                        isSelected
                          ? 'bg-cyan-500 text-navy-950'
                          : 'bg-slate-100 dark:bg-navy-800 text-slate-500'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="flex-1 leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation & Submit Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-navy-700 bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-800 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 btn-command"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {!isLastQuestion ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 btn-command"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 btn-command"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

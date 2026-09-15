import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiApi } from '../../services/api';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Loader2,
  Bot,
  User,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Minimize2,
  Maximize2,
  Briefcase,
  FileText,
  Calendar,
  Zap,
} from 'lucide-react';

export const AICopilotDrawer = () => {
  const navigate = useNavigate();
  const { govCareerProfile } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `**Namaste! I am your GovLearn AI Career & Exam Mentor.**\n\nI can assist you with:\n• **Government Job Match** (SSC CGL 94%, RRB NTPC 89%, TNPSC Gr 2 84%)\n• **Notification Analysis & PDF Parsing** (14,850 vacancies in SSC CGL)\n• **Checking Exact Eligibility** (B.E CSE, Age 24, Tamil Nadu, OBC)\n• **Adaptive AI Study Plans & Timetables** (72% complete)\n• **Targeting Weak Subjects** (General Awareness 48%, Quant 71%)\n• **Civil Services Guidelines** (GFR 2017, GeM, CERT-In, RTI Act)\n\nClick any quick prompt below or type your question!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Find jobs I'm eligible for",
    'Analyze this notification',
    'Create my study plan',
    'Why am I not eligible?',
    'Show my weak subjects',
    'How can I improve my GovReady Score?',
    'What government exams should I target?',
    'Explain GFR Rule 149 on GeM',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    // Fast local intelligence responses for government career actions
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("jobs i'm eligible") || lowerQuery.includes("jobs eligible") || lowerQuery.includes("target")) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `Based on your candidate dossier (**${govCareerProfile?.degreeBranch}, Age ${govCareerProfile?.age}, ${govCareerProfile?.state}, ${govCareerProfile?.category}**):\n\n1. **SSC CGL 2026** — **94% Match** (🟢 Fully Eligible) • **Closing in 4 days!**\n2. **RRB NTPC CEN 03/2026** — **89% Match** (🟢 Eligible) • Closing in 11 days\n3. **TNPSC Group 2 & 2A** — **84% Match** (🟢 Eligible) • Upcoming state notification\n4. **IBPS PO / Specialist IT Officer** — **77% Match** (🟢 Eligible for IT Officer Scale-I)\n\nYour primary recommended target is **SSC CGL 2026** for Assistant Section Officer / Inspector cadres.`,
            actionLink: '/jobs',
            actionText: 'Open Government Job Match',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (lowerQuery.includes('weak') || lowerQuery.includes('weakness') || lowerQuery.includes('subjects')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `**AI Weakness Diagnostic Summary:**\n\n• **Reasoning:** 82% (Strongest Competency)\n• **Quantitative Aptitude:** 71% (Good)\n• **English Comprehension:** 63% (Average)\n• **General Awareness:** **48% (🚨 Highest Priority Improvement Area!)**\n\n**High-Yield Weak Topics to Target:**\n1. Indian Constitution & Polity Articles (Fundamental Rights)\n2. Modern Indian History Timeline (1857-1947)\n3. Algebraic Identities and Factorization\n\nYour study plan has already dynamically inserted 2 extra practice slots for these subjects.`,
            actionLink: '/quiz',
            actionText: 'Launch Weakness Practice Drill',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (lowerQuery.includes('govready') || lowerQuery.includes('improve')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `Your current **GovReady Score is ${govCareerProfile?.govReadyScore} / 100**.\n\nThis benchmark places you **above the probable 2025 Tier-1 OBC Cutoff (71.5)**.\n\n**Action Plan to reach 85+ (Safe Merit Zone):**\n1. Complete 3 consecutive **General Awareness speed drills**.\n2. Complete remaining 28% of your weekly study plan.\n3. Take a full-length **Saturday Tier-1 CBT Mock Test**.\n\nCompleting these will add **+8 to +10 points** to your GovReady score within 14 days.`,
            actionLink: '/study-plan',
            actionText: 'View Adaptive Study Plan',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (lowerQuery.includes('study plan') || lowerQuery.includes('create my study plan')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `Your **Adaptive AI Study Plan** is currently active for **${govCareerProfile?.targetExam}**.\n\n• **Weekly Progress:** 72% Completed\n• **Today's Focus:** Quantitative Aptitude (Algebraic Identities - AI Adjusted) + General Awareness (Union Budget & Current Affairs)\n• **Study Allocation:** 80 mins scheduled for today\n\nYou can click below to check off tasks or recalibrate the schedule at any time!`,
            actionLink: '/study-plan',
            actionText: 'Open Study Plan Timetable',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (lowerQuery.includes('analyze') || lowerQuery.includes('notification')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `You can upload any official PDF notice in our **Notification Analyzer**!\n\nCurrently, **SSC CGL 2026** (14,850 vacancies) and **TNPSC Group 2** notices are parsed and ready for one-click eligibility verification.`,
            actionLink: '/analyzer?notice=ssc-cgl-2026',
            actionText: 'Inspect Notification Analyzer',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    if (lowerQuery.includes('why am i not eligible') || lowerQuery.includes('not eligible')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: `Good news! In all major graduate-level central and state examinations (**SSC CGL, RRB NTPC, TNPSC Group 2**), you are **🟢 FULLY ELIGIBLE**.\n\n**Reasons why you might be ineligible for specific other exams:**\n• UPSC Civil Services (IAS/IPS): Upper age limit for General category is 32, but requires 21 minimum.\n• Technical Engineering Service (ESE): Requires core mechanical/electrical/civil degree for some branches.\n• SSC CHSL: You are overqualified (degree holder), but still permitted to write.`,
            actionLink: '/analyzer',
            actionText: 'Check Detailed Rules in Analyzer',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const res = await aiApi.chat(query);
      const aiReply = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.reply || 'GovLearn AI assistant processed your query.',
        topic: res.topic,
        relatedCourseId: res.relatedCourseId,
        timestamp: res.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Unable to connect to the AI engine at this moment. Please check server status.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    return text.split('\n').map((line, idx) => {
      // Bold text replacement
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span
          key={idx}
          className="block mb-1"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white shadow-xl shadow-cyan-500/25 border border-cyan-400/30 flex items-center gap-2.5 transition-all duration-300 transform hover:scale-105 group btn-command"
          aria-label="Open GovLearn AI Mentor"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-extrabold tracking-wide font-display">
            GovLearn AI Mentor
          </span>
        </button>
      )}

      {/* Floating Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[90vh] glass-card rounded-2xl border border-slate-200 dark:border-navy-700 shadow-2xl flex flex-col overflow-hidden bg-white dark:bg-navy-900 animate-fade-in-up">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-slate-200 dark:border-navy-800 bg-gradient-to-r from-blue-900/90 to-navy-900/90 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                  <span>GovLearn AI Copilot</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 font-mono">v2.4</span>
                </h3>
                <p className="text-[10px] text-cyan-200/80">
                  SIH 2026 Civil Services AI Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-slate-50/50 dark:bg-navy-950/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white dark:bg-navy-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-navy-700 rounded-bl-none'
                  }`}
                >
                  <div className="leading-relaxed text-[11px] sm:text-xs">
                    {renderFormattedText(m.text)}
                  </div>

                  {m.relatedCourseId && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(`/learning/${m.relatedCourseId}`);
                      }}
                      className="mt-2 w-full px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-between gap-1 text-[11px] font-bold transition-all"
                    >
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Open Recommended Course</span>
                      </span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}

                  {m.actionLink && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(m.actionLink);
                      }}
                      className="mt-2 w-full px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 flex items-center justify-between gap-1 text-[11px] font-bold transition-all"
                    >
                      <span>{m.actionText || 'Open Portal'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}

                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-navy-800 border border-slate-200 dark:border-navy-700 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-500" />
                  <span>Synthesizing governance knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 border-t border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 overflow-x-auto whitespace-nowrap flex gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 border border-slate-200 dark:border-navy-700 transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-200 dark:border-navy-800 bg-slate-50 dark:bg-navy-950 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about GFR, GeM, CERT-In, RTI..."
              className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white shadow-md transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

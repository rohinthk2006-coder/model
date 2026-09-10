import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cloud, Database, Cpu, FileText, MessageSquare, Sparkles } from 'lucide-react';

export const AICoreVisual = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 1, name: 'Digital Governance', score: '86%', angle: 0, icon: FileText, color: '#10B981' },
    { id: 2, name: 'Cybersecurity', score: '61%', angle: 60, icon: Shield, color: '#F59E0B' },
    { id: 3, name: 'Data Analytics', score: '72%', angle: 120, icon: Database, color: '#06B6D4' },
    { id: 4, name: 'Cloud Computing', score: '54%', angle: 180, icon: Cloud, color: '#3B82F6' },
    { id: 5, name: 'Communication', score: '82%', angle: 240, icon: MessageSquare, color: '#10B981' },
    { id: 6, name: 'AI Fundamentals', score: '68%', angle: 300, icon: Cpu, color: '#8B5CF6' },
  ];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setActiveNode(null);
  };

  const radius = 150; // Orbit distance from center

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] sm:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute w-56 h-56 rounded-full bg-teal-600/15 dark:bg-teal-600/20 blur-2xl pointer-events-none" />

      {/* SVG Layer for Orbits, Scanning Sweep, and Neural Vectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 400"
      >
        <defs>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#1D4ED8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0B132B" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Static Calibration Ring with Ticks */}
        <circle
          cx="200"
          cy="200"
          r="185"
          fill="none"
          stroke="currentColor"
          className="text-slate-300/40 dark:text-navy-700/60"
          strokeWidth="1"
          strokeDasharray="2 6"
        />

        {/* Rotating Outer Ring */}
        <circle
          cx="200"
          cy="200"
          r="165"
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth="1.5"
          strokeDasharray="14 10"
          style={{
            transformOrigin: '200px 200px',
            transform: `rotate(${mousePos.x * 12}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="animate-orbit-slow"
        />

        {/* Counter-Rotating Middle Ring */}
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="currentColor"
          className="text-cyan-500/30"
          strokeWidth="1"
          strokeDasharray="6 8"
          style={{
            transformOrigin: '200px 200px',
            transform: `rotate(${-mousePos.y * 15}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="animate-orbit-reverse"
        />

        {/* Inner Scanning Sweep Wave */}
        <g
          style={{
            transformOrigin: '200px 200px',
          }}
          className="animate-radar-sweep"
        >
          <path
            d="M 200 200 L 350 200 A 150 150 0 0 0 306 94 Z"
            fill="url(#sweepGrad)"
          />
        </g>

        {/* Connecting Vector Lines from Center to Each Skill Node */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const nodeX = 200 + radius * Math.cos(rad) + mousePos.x * 8;
          const nodeY = 200 + radius * Math.sin(rad) + mousePos.y * 8;
          const isHovered = activeNode === node.id;

          return (
            <g key={node.id}>
              <line
                x1={200 + mousePos.x * 4}
                y1={200 + mousePos.y * 4}
                x2={nodeX}
                y2={nodeY}
                stroke={isHovered ? '#06B6D4' : 'currentColor'}
                className={isHovered ? 'text-cyan-400' : 'text-slate-400/25 dark:text-navy-700/80'}
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray={isHovered ? 'none' : '3 3'}
              />
              {/* Data packet along line */}
              <circle
                cx={(200 + nodeX) / 2}
                cy={(200 + nodeY) / 2}
                r="1.5"
                fill="#06B6D4"
                className="animate-ping"
                style={{ animationDuration: '3s' }}
              />
            </g>
          );
        })}
      </svg>

      {/* Central Glowing AI Core */}
      <div
        style={{
          transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-navy-950 via-blue-950 to-navy-900 dark:from-navy-900 dark:via-blue-900/60 dark:to-navy-950 border border-cyan-400/40 shadow-cyan-glow flex flex-col items-center justify-center p-3 text-center cursor-pointer group"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
            <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-navy-900 animate-pulse" />
        </div>

        <div className="mt-1.5">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-extrabold uppercase">
            GovLearn AI
          </span>
          <span className="block text-[8px] font-mono text-slate-400 tracking-wider">
            CORE ACTIVE
          </span>
        </div>
      </div>

      {/* Orbiting Skill Nodes (Interactive on Hover) */}
      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        // Position relative to 50%
        const leftPercent = 50 + ((radius * Math.cos(rad) + mousePos.x * 10) / 200) * 50;
        const topPercent = 50 + ((radius * Math.sin(rad) + mousePos.y * 10) / 200) * 50;
        const Icon = node.icon;
        const isHovered = activeNode === node.id;

        return (
          <div
            key={node.id}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="absolute z-20 group cursor-pointer"
          >
            <div
              className={`flex items-center gap-2 p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${
                isHovered
                  ? 'bg-white dark:bg-navy-800 border-cyan-400 shadow-cyan-glow scale-105'
                  : 'bg-white/90 dark:bg-navy-900/90 border-slate-200 dark:border-navy-700/80 hover:border-cyan-500/50'
              } border shadow-sm backdrop-blur-md`}
            >
              <div
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${node.color}15`, color: node.color }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              <div className="hidden sm:block text-left pr-1">
                <p className="text-[10px] font-bold text-slate-800 dark:text-slate-100 leading-none whitespace-nowrap">
                  {node.name}
                </p>
                <span
                  className="text-[9px] font-mono font-bold mt-0.5 inline-block"
                  style={{ color: node.color }}
                >
                  {node.score}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

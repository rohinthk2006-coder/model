import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Lock,
  Mail,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Sun,
  Moon,
} from 'lucide-react';
import { SIHBanner } from '../components/common/SIHBanner';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserRole, addToast, theme, toggleTheme } = useApp();

  const [identifier, setIdentifier] = useState('rajesh.verma@meity.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUserRole('employee');
      addToast('Authenticated successfully as Rajesh Verma (Senior Section Officer)', 'success');
      navigate('/dashboard');
    }, 600);
  };

  const handleDemoEmployee = () => {
    setUserRole('employee');
    addToast('Logged in as Demo Employee (Rajesh Verma, MeitY)', 'info');
    navigate('/dashboard');
  };

  const handleDemoManager = () => {
    setUserRole('manager');
    addToast('Logged in as Demo Manager (Dr. Sunita Rao, Director)', 'info');
    navigate('/manager');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <SIHBanner />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-3 flex justify-end">
        <button
          onClick={toggleTheme}
          className="p-2 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-navy-800 border border-slate-200/80 dark:border-navy-700 transition-all flex items-center gap-1.5 text-xs font-semibold bg-white/80 dark:bg-navy-900/80 backdrop-blur-sm shadow-sm"
          title={`Switch to ${theme === 'dark' ? 'Bright (White with Blue)' : 'Dark (Black with Green)'} theme`}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Bright Theme</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-600 dark:text-emerald-600" />
              <span>Dark Theme</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Portal Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 dark:from-emerald-700 dark:via-emerald-600 dark:to-teal-400 flex items-center justify-center shadow-blue-glow dark:shadow-green-glow text-white font-black text-xl">
                G
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                    GovLearn
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-emerald-500 dark:to-teal-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold tracking-wider uppercase">
                  Government of India
                </p>
              </div>
            </Link>

            <h1 className="text-xl font-bold text-slate-900 dark:text-white pt-2">
              National Employee Learning Portal
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Sign in with your official departmental credentials or test via 1-click demo personas.
            </p>
          </div>

          {/* Quick Demo Personas (SIH Hackathon Presentation Helpers) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 via-blue-100/40 to-blue-50/80 dark:from-navy-900 dark:via-emerald-950/40 dark:to-navy-900 border border-blue-200 dark:border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Instant Demo Access (No Password)
              </span>
              <span className="text-[10px] font-mono text-slate-400">SIH 2026 Mode</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDemoEmployee}
                className="p-3 rounded-xl bg-white dark:bg-navy-800 hover:bg-blue-50 dark:hover:bg-navy-700 border border-blue-200 dark:border-navy-600 text-left transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 dark:text-emerald-400">
                    Demo Employee
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 mt-1">
                  Rajesh Verma
                </p>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Section Officer (MeitY)
                </p>
              </button>

              <button
                type="button"
                onClick={handleDemoManager}
                className="p-3 rounded-xl bg-white dark:bg-navy-800 hover:bg-blue-50 dark:hover:bg-navy-700 border border-blue-200 dark:border-navy-600 text-left transition-all shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 dark:text-cyan-400">
                    Demo Manager
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] font-medium text-slate-800 dark:text-slate-200 mt-1">
                  Dr. Sunita Rao
                </p>
                <p className="text-[10px] text-slate-600 dark:text-slate-300">
                  Director (Capacity Building)
                </p>
              </button>
            </div>
          </div>

          {/* Regular Login Card */}
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-navy-800 shadow-xl">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address or Employee ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    placeholder="e.g. rajesh.verma@gov.in or GOV-IT-8921"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Password / e-Pramaan Token
                  </label>
                  <a
                    href="#reset"
                    onClick={(e) => {
                      e.preventDefault();
                      addToast('Self-service password reset simulation triggered via NIC-Mail', 'info');
                    }}
                    className="text-[11px] text-blue-600 dark:text-cyan-400 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter official password"
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-600 dark:text-slate-400">Remember this device</span>
                </label>
                <span className="text-[11px] text-slate-400">e-Sign / MFA Enabled</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 btn-command"
              >
                {isLoading ? (
                  <span>Authenticating with Central Registry...</span>
                ) : (
                  <>
                    <span>Log In to GovLearn AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-navy-800 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-emerald-500" />
                <span>Protected by CERT-In Security Baselines & MeghRaj</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-navy-800">
        GovLearn AI • Smart India Hackathon 2026 • Frontend Prototype Demo
      </footer>
    </div>
  );
};

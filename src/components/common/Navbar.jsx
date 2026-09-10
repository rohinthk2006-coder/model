import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Sun,
  Moon,
  Search,
  Menu,
  Sparkles,
  ChevronDown,
  User,
  Shield,
  LogOut,
  ExternalLink,
  CheckCheck,
  Award,
  BookOpen,
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const {
    currentUser,
    userRole,
    setUserRole,
    theme,
    toggleTheme,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addToast,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (newRole) => {
    setUserRole(newRole);
    addToast(`Switched to ${newRole === 'manager' ? 'Manager (Dr. Sunita Rao)' : 'Employee (Rajesh Verma)'} profile`, 'info');
    if (newRole === 'manager') {
      navigate('/manager');
    } else {
      navigate('/dashboard');
    }
    setShowProfileMenu(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/learning?q=${encodeURIComponent(searchQuery)}`);
    setShowSearchSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border-b border-slate-200 dark:border-navy-800 transition-colors duration-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-400 flex items-center justify-center shadow-green-glow text-white font-black text-lg tracking-wider">
              <span className="relative z-10">G</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  GovLearn
                </span>
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 font-medium tracking-tight">
                Government of India • SIH 2026
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Quick Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block" ref={searchRef}>
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                placeholder="Search courses, skills, guidelines (e.g. DPDP, Cloud, CERT-In)..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-navy-950/80 border border-slate-200 dark:border-navy-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              />
            </div>
          </form>

          {/* Quick Search Suggestions */}
          {showSearchSuggestions && searchQuery.length > 0 && (
            <div className="absolute top-full mt-1.5 left-0 w-full bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-slate-200 dark:border-navy-700 p-2 z-50 animate-fade-in">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                Suggested Resources
              </div>
              <button
                onClick={() => {
                  navigate('/learning/cloud-fundamentals');
                  setShowSearchSuggestions(false);
                }}
                className="w-full text-left flex items-center gap-2 px-2 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-800 dark:text-slate-200"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
                <span>Cloud Computing Fundamentals (MeghRaj Architecture)</span>
              </button>
              <button
                onClick={() => {
                  navigate('/learning/cybersecurity-essentials');
                  setShowSearchSuggestions(false);
                }}
                className="w-full text-left flex items-center gap-2 px-2 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-800 dark:text-slate-200"
              >
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                <span>Cybersecurity Essentials for Public Servants</span>
              </button>
              <button
                onClick={() => {
                  navigate('/skills');
                  setShowSearchSuggestions(false);
                }}
                className="w-full text-left flex items-center gap-2 px-2 py-2 text-xs rounded-lg hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-800 dark:text-slate-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>AI Skill Gap Diagnostic Center</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Role Switcher Pill */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 text-xs font-medium">
            <button
              onClick={() => handleRoleSwitch('employee')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'employee'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Employee
            </button>
            <button
              onClick={() => handleRoleSwitch('manager')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'manager'
                  ? 'bg-teal-600 text-white font-semibold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Manager
            </button>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent hover:border-slate-200 dark:hover:border-navy-700 transition-all"
            title={`Switch to ${theme === 'dark' ? 'Bright (White with Blue)' : 'Dark (Black with Green)'} theme`}
            aria-label="Toggle Bright / Dark theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent hover:border-slate-200 dark:hover:border-navy-700 transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-navy-900 animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 overflow-hidden z-50 animate-fade-in">
                <div className="p-4 border-b border-slate-100 dark:border-navy-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-navy-800">
                  {notifications.map((notif) => {
                    const getNotifIcon = () => {
                      switch (notif.category) {
                        case 'ai':
                          return <Sparkles className="w-4 h-4 text-cyan-500" />;
                        case 'course':
                          return <BookOpen className="w-4 h-4 text-blue-500" />;
                        case 'quiz':
                          return <Award className="w-4 h-4 text-emerald-500" />;
                        case 'karmayogi':
                          return <Shield className="w-4 h-4 text-amber-500" />;
                        default:
                          return <Bell className="w-4 h-4 text-slate-400" />;
                      }
                    };

                    return (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          setShowNotifications(false);
                          navigate(notif.link);
                        }}
                        className={`p-3.5 hover:bg-slate-50 dark:hover:bg-navy-800/60 transition-colors cursor-pointer text-left flex items-start gap-3 ${
                          notif.unread ? 'bg-cyan-500/5 dark:bg-cyan-500/10' : ''
                        }`}
                      >
                        <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 shrink-0">
                          {getNotifIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                              {notif.title}
                            </p>
                            <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                              {notif.timestamp}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2.5 text-center bg-slate-50 dark:bg-navy-950/60 border-t border-slate-100 dark:border-navy-800">
                  <span className="text-[11px] text-slate-400">
                    Synced with iGOT Karmayogi Notification Service
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent hover:border-slate-200 dark:hover:border-navy-700 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-emerald-600 border border-emerald-400/40 shrink-0">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] text-slate-600 dark:text-slate-300 truncate max-w-[120px]">
                  {currentUser.designation.split('(')[0]}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-navy-700 py-2 z-50 animate-fade-in text-left">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-navy-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                    {currentUser.cadre}
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    ID: {currentUser.employeeId}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Official Profile & Badges</span>
                  </Link>
                  <Link
                    to="/skills"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                    <span>My AI Skill Gap Analysis</span>
                  </Link>
                  <Link
                    to="/progress"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Learning Hours & Milestones</span>
                  </Link>
                </div>

                <div className="border-t border-slate-100 dark:border-navy-800 pt-1 pb-1">
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => handleRoleSwitch(userRole === 'employee' ? 'manager' : 'employee')}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs text-cyan-600 dark:text-cyan-400 hover:bg-slate-50 dark:hover:bg-navy-800 font-semibold"
                  >
                    <span>Switch to {userRole === 'employee' ? 'Manager View' : 'Employee View'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-navy-800 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out (Return to Login)</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

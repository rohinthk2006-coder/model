import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  HelpCircle,
  TrendingUp,
  User,
  Users,
  ShieldCheck,
  Building2,
  ChevronRight,
  Flame,
  X,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Briefcase,
  FileSearch,
  CalendarCheck,
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { userRole, currentUser, sidebarCollapsed, toggleSidebarCollapsed, t } = useApp();
  const navigate = useNavigate();
  const isCollapsed = sidebarCollapsed;

  const employeeNavItems = [
    { to: '/dashboard', label: t('dashboard', 'Dashboard'), icon: LayoutDashboard },
    { to: '/jobs', label: t('governmentJobs', 'Government Jobs'), icon: Briefcase, badge: 'NEW' },
    { to: '/analyzer', label: t('notificationAnalyzer', 'Notification Analyzer'), icon: FileSearch, badge: 'AI' },
    { to: '/study-plan', label: t('studyPlan', 'AI Study Plan'), icon: CalendarCheck },
    { to: '/learning', label: t('myLearning', 'My Learning'), icon: BookOpen },
    { to: '/skills', label: 'Skill Analysis', icon: Sparkles, badge: 'AI' },
    { to: '/quiz', label: t('aiQuiz', 'AI Mock Tests'), icon: HelpCircle },
    { to: '/progress', label: t('progress', 'Progress & GovReady'), icon: TrendingUp },
    { to: '/profile', label: t('profile', 'Profile'), icon: User },
  ];

  const managerNavItems = [
    { to: '/manager', label: 'Team Overview', icon: Users },
    { to: '/manager/skills', label: 'Team Skill Gaps', icon: ShieldCheck, badge: 'Alert' },
    { to: '/learning', label: 'Curriculum Catalog', icon: BookOpen },
    { to: '/progress', label: 'Analytics', icon: TrendingUp },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const navItems = userRole === 'manager' ? managerNavItems : employeeNavItems;


  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-navy-800 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-4 border-b border-slate-200 dark:border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 flex items-center justify-center shadow-blue-glow text-white font-bold text-sm shrink-0">
              GL
            </div>
            {!isCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white truncate block">
                  GovLearn AI
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold truncate">
                  {userRole === 'manager' ? 'Executive Portal' : 'Employee Workspace'}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse / Expand Toggle */}
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronsRight className="w-4 h-4" />
            ) : (
              <ChevronsLeft className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card Snapshot */}
        <div className={`mx-3 my-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-navy-800/80 transition-all ${
          isCollapsed ? 'p-2 flex flex-col items-center' : 'p-3.5'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-blue-600 border border-cyan-500/30 shrink-0">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.department.split('(')[0]}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && userRole === 'employee' && (
            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Flame className="w-3 h-3 fill-amber-500" />
                <span>{currentUser.streak || 7}d Streak</span>
              </div>
              <div className="text-cyan-600 dark:text-cyan-400 font-bold">
                Score: {currentUser.skillScore}%
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto">
          {!isCollapsed && (
            <div className="px-2.5 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {userRole === 'manager' ? 'Administrative Navigation' : 'Personal Learning'}
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/dashboard' || item.to === '/manager'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center ${
                    isCollapsed ? 'justify-center py-2.5' : 'justify-between px-3 py-2.5'
                  } rounded-xl text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-cyan-500'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip on collapsed desktop view */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 bg-navy-950 text-white text-[11px] rounded-lg shadow-lg border border-cyan-500/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Quick Cross-Portal Switcher */}
          <div className="pt-3 mt-3 border-t border-slate-200 dark:border-navy-800">
            {!isCollapsed && (
              <div className="px-2.5 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Switch Portal
              </div>
            )}

            {userRole === 'employee' ? (
              <button
                onClick={() => {
                  navigate('/manager');
                  onClose();
                }}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                } rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 text-left`}
                title="Switch to Manager View"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {!isCollapsed && <span>Manager View</span>}
                </div>
                {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/dashboard');
                  onClose();
                }}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                } rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 text-left`}
                title="Switch to Employee View"
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {!isCollapsed && <span>Employee View</span>}
                </div>
                {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
              </button>
            )}
          </div>
        </nav>

        {/* Karmayogi Integration Indicator */}
        {!isCollapsed ? (
          <div className="p-3 m-3 rounded-xl bg-gradient-to-r from-blue-900/20 to-cyan-900/15 border border-blue-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              iGOT Karmayogi Synced
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              NPCSCB Framework v3.2
            </p>
          </div>
        ) : (
          <div className="p-2 mb-3 mx-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 block animate-pulse" title="iGOT Synced" />
          </div>
        )}
      </aside>
    </>
  );
};

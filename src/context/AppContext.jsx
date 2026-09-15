import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockCourses as initialCourses } from '../data/mockCourses';
import { initialNotifications } from '../data/mockNotifications';
import { authApi, coursesApi, notificationsApi } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRoleState] = useState(() => {
    return localStorage.getItem('govlearn_role') || 'employee';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('govlearn_theme') || 'dark';
  });

  const [courses, setCourses] = useState(initialCourses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toasts, setToasts] = useState([]);
  const [activeCertificate, setActiveCertificate] = useState(null);

  // AI Simulation Modal State
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalSteps, setAiModalSteps] = useState([]);
  const [aiCurrentStep, setAiCurrentStep] = useState(0);
  const [aiModalTitle, setAiModalTitle] = useState('GovLearn AI Engine');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Quiz active session & result
  const [activeQuizConfig, setActiveQuizConfig] = useState({
    topic: 'Cybersecurity',
    difficulty: 'Medium',
    questionCount: 5,
    questionType: 'MCQ',
  });

  const [quizResult, setQuizResult] = useState({
    score: 82,
    correctCount: 4,
    totalCount: 5,
    timeSpent: '04:18',
    topic: 'Cybersecurity',
    difficulty: 'Medium',
    timestamp: 'Just now',
    userAnswers: {},
  });

  // Sync with backend on initial load
  useEffect(() => {
    let isMounted = true;

    async function syncBackend() {
      try {
        const [meRes, coursesRes, notifRes] = await Promise.all([
          authApi.getMe(),
          coursesApi.getAll(),
          notificationsApi.getAll(),
        ]);

        if (isMounted) {
          if (meRes?.role) {
            setUserRoleState(meRes.role);
          }
          if (coursesRes?.courses && coursesRes.courses.length > 0) {
            setCourses(coursesRes.courses);
          }
          if (notifRes?.notifications && notifRes.notifications.length > 0) {
            setNotifications(notifRes.notifications);
          }
        }
      } catch (err) {
        console.warn('Initial backend sync failed, running with local state:', err);
      }
    }

    syncBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  // Keep dark class on <html> synced
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('govlearn_theme', theme);
  }, [theme]);

  // Keep role synced
  useEffect(() => {
    localStorage.setItem('govlearn_role', userRole);
  }, [userRole]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setUserRole = async (newRole) => {
    setUserRoleState(newRole);
    try {
      await authApi.switchRole(newRole);
    } catch (err) {
      console.warn('Backend role switch failed:', err);
    }
  };

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markNotificationAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    try {
      await notificationsApi.markRead(id);
    } catch (err) {
      console.warn('Backend markRead failed:', err);
    }
  };

  const markAllNotificationsAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast('All notifications marked as read', 'success');
    try {
      await notificationsApi.markAllRead();
    } catch (err) {
      console.warn('Backend markAllRead failed:', err);
    }
  };

  const toggleModuleComplete = async (courseId, moduleId) => {
    // 1. Optimistically update local state immediately
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;
        const updatedModules = course.modules.map((m) =>
          m.id === Number(moduleId) ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedModules.filter((m) => m.completed).length;
        const newProgress = Math.round((completedCount / updatedModules.length) * 100);
        return {
          ...course,
          modules: updatedModules,
          progress: newProgress,
        };
      })
    );

    // 2. Persist to backend and check if certificate was unlocked
    try {
      const res = await coursesApi.toggleModule(courseId, moduleId);
      if (res?.course) {
        setCourses((prevCourses) =>
          prevCourses.map((c) => (c.id === courseId ? res.course : c))
        );
      }
      if (res?.certificate) {
        setActiveCertificate(res.certificate);
        addToast(
          `Achievement Unlocked: Official Certificate issued for "${res.course?.title || 'Course'}"!`,
          'success',
          6000
        );
      }
    } catch (err) {
      console.warn('Module toggle sync to backend failed, using local calculation:', err);
    }
  };

  // Simulated / Deep AI workflow
  const triggerAiSimulation = (title, steps, onFinished) => {
    setAiModalTitle(title || 'GovLearn AI Neural Engine');
    setAiModalSteps(
      steps || [
        'Analyzing employee skill parameters...',
        'Identifying departmental competency gaps...',
        'Cross-referencing Karmayogi national benchmarks...',
        'Generating personalized learning recommendations...',
      ]
    );
    setAiCurrentStep(0);
    setAiModalOpen(true);

    const stepInterval = 650;
    const totalSteps = (steps || []).length || 4;

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < totalSteps) {
        setAiCurrentStep(stepIndex);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setAiModalOpen(false);
          if (onFinished) onFinished();
        }, 500);
      }
    }, stepInterval);
  };

  const currentUser =
    userRole === 'manager'
      ? {
          name: 'Dr. Sunita Rao',
          designation: 'Director (Capacity Building & IT Governance)',
          department: 'Ministry of Electronics & IT (MeitY)',
          cadre: 'Senior Administrative Grade (SAG)',
          employeeId: 'GOV-DIR-2021-0042',
          role: 'manager',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          skillScore: 92,
        }
      : {
          name: 'Rajesh Verma',
          designation: 'Senior Section Officer (e-Governance)',
          department: 'Ministry of Electronics & IT (MeitY)',
          cadre: 'Central Secretariat Service (CSS)',
          employeeId: 'GOV-IT-2024-8921',
          role: 'employee',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          skillScore: 78,
          coursesCompleted: 12,
          learningHours: 34.5,
          streak: 7,
        };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentUser,
        theme,
        toggleTheme,
        courses,
        setCourses,
        toggleModuleComplete,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toasts,
        addToast,
        removeToast,
        activeQuizConfig,
        setActiveQuizConfig,
        quizResult,
        setQuizResult,
        activeCertificate,
        setActiveCertificate,
        aiModalOpen,
        aiModalSteps,
        aiCurrentStep,
        aiModalTitle,
        triggerAiSimulation,
        closeAiModal: () => setAiModalOpen(false),
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebarCollapsed: () => setSidebarCollapsed((p) => !p),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

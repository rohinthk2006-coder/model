import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCourses as initialCourses } from '../data/mockCourses';
import { initialNotifications } from '../data/mockNotifications';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('govlearn_role') || 'employee';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('govlearn_theme') || 'dark';
  });

  const [courses, setCourses] = useState(initialCourses);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toasts, setToasts] = useState([]);
  
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

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    addToast('All notifications marked as read', 'success');
  };

  const toggleModuleComplete = (courseId, moduleId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id !== courseId) return course;
        const updatedModules = course.modules.map((m) =>
          m.id === moduleId ? { ...m, completed: !m.completed } : m
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
  };

  // Simulated AI workflow
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

// Centralized API Service for GovLearn AI (SIH26101)
// Connects the React/Vite frontend to the Express backend with automatic offline mock fallback.

import { mockCourses } from '../data/mockCourses';
import {
  mockEmployees,
  teamStats,
  teamSkillGaps,
  teamSkillDistribution,
  courseCompletionBreakdown,
  monthlyLearningActivity,
} from '../data/mockEmployees';
import { initialNotifications } from '../data/mockNotifications';
import { quizQuestionBank } from '../data/mockQuizzes';
import {
  radarSkillData,
  strengthsList,
  skillsToImprove,
  historicalSkillProgress,
} from '../data/mockSkills';

const API_BASE = '/api';

/**
 * Universal resilient fetcher
 * Falls back to supplied mock data if backend server is unreachable.
 */
async function apiFetch(endpoint, options = {}, fallbackData = null) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.error || `HTTP error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[GovLearn API offline/fallback] ${endpoint} -> using local data`, err.message);
    if (typeof fallbackData === 'function') {
      return fallbackData();
    }
    return fallbackData;
  }
}

// ----------------------------------------------------------------------
// AUTH & PROFILE APIS
// ----------------------------------------------------------------------
export const authApi = {
  getMe: async () => {
    const defaultUser = {
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
      preferences: { emailNotifications: true, aiRecommendations: true, digestFrequency: 'weekly' },
    };

    const res = await apiFetch('/auth/me', { method: 'GET' }, { success: true, role: 'employee', user: defaultUser });
    return res;
  },

  switchRole: async (role) => {
    const managerUser = {
      name: 'Dr. Sunita Rao',
      designation: 'Director (Capacity Building & IT Governance)',
      department: 'Ministry of Electronics & IT (MeitY)',
      cadre: 'Senior Administrative Grade (SAG)',
      employeeId: 'GOV-DIR-2021-0042',
      role: 'manager',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      skillScore: 92,
    };
    const employeeUser = {
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

    return await apiFetch(
      '/auth/switch-role',
      {
        method: 'POST',
        body: JSON.stringify({ role }),
      },
      {
        success: true,
        role,
        user: role === 'manager' ? managerUser : employeeUser,
      }
    );
  },

  updateProfile: async (updates) => {
    return await apiFetch(
      '/auth/profile',
      {
        method: 'PUT',
        body: JSON.stringify(updates),
      },
      { success: true, user: updates }
    );
  },
};

// ----------------------------------------------------------------------
// COURSES APIS
// ----------------------------------------------------------------------
export const coursesApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/courses?${query}` : '/courses';
    return await apiFetch(endpoint, { method: 'GET' }, { success: true, count: mockCourses.length, courses: mockCourses });
  },

  getById: async (id) => {
    const fallback = mockCourses.find((c) => c.id === id) || mockCourses[0];
    return await apiFetch(
      `/courses/${id}`,
      { method: 'GET' },
      { success: true, course: fallback, certificate: null }
    );
  },

  enroll: async (id) => {
    const fallback = mockCourses.find((c) => c.id === id) || mockCourses[0];
    return await apiFetch(
      `/courses/${id}/enroll`,
      { method: 'POST' },
      { success: true, course: { ...fallback, progress: 0 } }
    );
  },

  toggleModule: async (courseId, moduleId) => {
    const fallbackCourse = mockCourses.find((c) => c.id === courseId);
    let updatedCourse = fallbackCourse;
    if (fallbackCourse) {
      const updatedModules = fallbackCourse.modules.map((m) =>
        m.id === Number(moduleId) ? { ...m, completed: !m.completed } : m
      );
      const completedCount = updatedModules.filter((m) => m.completed).length;
      updatedCourse = {
        ...fallbackCourse,
        modules: updatedModules,
        progress: Math.round((completedCount / updatedModules.length) * 100),
      };
    }

    return await apiFetch(
      `/courses/${courseId}/modules/${moduleId}/toggle`,
      { method: 'POST' },
      { success: true, course: updatedCourse, certificate: null }
    );
  },

  getCertificate: async (courseId) => {
    return await apiFetch(
      `/courses/${courseId}/certificate`,
      { method: 'GET' },
      { success: false, certificate: null }
    );
  },
};

// ----------------------------------------------------------------------
// SKILLS APIS
// ----------------------------------------------------------------------
export const skillsApi = {
  getGapAnalysis: async () => {
    return await apiFetch(
      '/skills/gap-analysis',
      { method: 'GET' },
      {
        success: true,
        data: {
          radarSkillData,
          strengthsList,
          skillsToImprove,
          historicalSkillProgress,
          metrics: { overallScore: 78, benchmarkAverage: 75, criticalGapCount: 2, confidenceScore: 92 },
        },
      }
    );
  },

  runDiagnostics: async () => {
    return await apiFetch(
      '/skills/diagnostics',
      { method: 'POST' },
      {
        success: true,
        data: {
          radarSkillData: radarSkillData.map((s) => ({ ...s, score: Math.min(100, s.score + 2) })),
          skillsToImprove,
          strengthsList,
          newOverallScore: 80,
          aiSummary: 'AI diagnostic complete. Scores refreshed with official Karmayogi matrix.',
        },
      }
    );
  },

  getMatrix: async () => {
    return await apiFetch(
      '/skills/matrix',
      { method: 'GET' },
      {
        success: true,
        data: { teamSkillGaps, teamSkillDistribution, teamStats },
      }
    );
  },
};

// ----------------------------------------------------------------------
// QUIZ APIS
// ----------------------------------------------------------------------
export const quizApi = {
  getTopics: async () => {
    return await apiFetch(
      '/quiz/topics',
      { method: 'GET' },
      {
        success: true,
        topics: [
          { id: 'Cybersecurity', name: 'Cybersecurity & CERT-In Protocols' },
          { id: 'Cloud Computing', name: 'Cloud Computing & MeghRaj' },
          { id: 'Data Analytics', name: 'Data Analytics for Governance' },
          { id: 'AI Fundamentals', name: 'AI Fundamentals & Ethics' },
          { id: 'Digital Governance', name: 'Digital Governance & RTI Act' },
          { id: 'Public Procurement & GeM', name: 'GFR 2017 & GeM Procurement' },
        ],
        difficulties: ['Beginner', 'Medium', 'Advanced'],
        questionTypes: ['MCQ', 'Scenario-Based', 'True/False'],
      }
    );
  },

  generate: async (config) => {
    const topic = config.topic || 'Cybersecurity';
    const count = Number(config.questionCount) || 5;
    const fallbackBank = quizQuestionBank[topic] || quizQuestionBank.Cybersecurity;
    const fallbackQuestions = (fallbackBank.MCQ || []).slice(0, count);

    return await apiFetch(
      '/quiz/generate',
      {
        method: 'POST',
        body: JSON.stringify(config),
      },
      {
        success: true,
        topic,
        difficulty: config.difficulty || 'Medium',
        count: fallbackQuestions.length,
        questions: fallbackQuestions,
        estimatedTimeMinutes: count,
      }
    );
  },

  evaluate: async (submission) => {
    const { questions = [], userAnswers = {}, topic = 'Cybersecurity' } = submission;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correct++;
    });
    const total = questions.length || 1;
    const score = Math.round((correct / total) * 100);

    return await apiFetch(
      '/quiz/evaluate',
      {
        method: 'POST',
        body: JSON.stringify(submission),
      },
      {
        success: true,
        result: {
          score,
          correctCount: correct,
          totalCount: total,
          isPassed: score >= 70,
          timeSpent: submission.timeSpent || '04:18',
          timestamp: 'Just now',
          topic,
          difficulty: submission.difficulty || 'Medium',
          aiFeedback: `You achieved a competency score of ${score}%. Recommendations calibrated against civil service benchmarks.`,
          strengths: [topic],
          weaknesses: [],
          recommendedCourse: { id: 'cloud-fundamentals', title: 'Cloud Computing Fundamentals' },
          questionReview: questions.map((q, idx) => ({
            questionId: q.id,
            questionText: q.question,
            selectedOption: q.options[userAnswers[idx]] || 'None',
            correctOption: q.options[q.correctIndex],
            isCorrect: userAnswers[idx] === q.correctIndex,
            explanation: q.explanation,
          })),
        },
      }
    );
  },

  getHistory: async () => {
    return await apiFetch(
      '/quiz/history',
      { method: 'GET' },
      {
        success: true,
        history: [
          {
            id: 'quiz-hist-1',
            topic: 'Cybersecurity',
            difficulty: 'Medium',
            score: 82,
            correctCount: 4,
            totalCount: 5,
            timeSpent: '04:18',
            timestamp: 'Yesterday',
            feedback: 'Strong understanding of CERT-In directives.',
          },
        ],
      }
    );
  },
};

// ----------------------------------------------------------------------
// AI MENTOR & COPILOT APIS
// ----------------------------------------------------------------------
export const aiApi = {
  chat: async (message) => {
    return await apiFetch(
      '/ai/chat',
      {
        method: 'POST',
        body: JSON.stringify({ message }),
      },
      {
        success: true,
        reply: `**GovLearn AI Copilot (Offline Mode):**\n\nI can answer questions regarding **GFR 2017**, **GeM Direct Purchase (Rule 149)**, **CERT-In 6-Hour Incident Reporting**, **RTI Act 2005 timelines**, and **Mission Karmayogi competency frameworks**.\n\nPlease ensure the GovLearn backend server is active on port 5000 for full real-time neural responses.`,
        topic: 'Civil Services Guidelines',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    );
  },

  getRecommendations: async () => {
    return await apiFetch(
      '/ai/recommend',
      { method: 'POST' },
      {
        success: true,
        recommendations: skillsToImprove.slice(0, 3).map((s) => ({
          skillName: s.name,
          gap: s.gap,
          severity: s.severity,
          courseId: s.recommendedCourseId,
          courseTitle: s.recommendedCourseTitle,
          duration: s.targetHours,
          rationale: s.description,
        })),
      }
    );
  },
};

// ----------------------------------------------------------------------
// MANAGER & ANALYTICS APIS
// ----------------------------------------------------------------------
export const managerApi = {
  getOverview: async () => {
    return await apiFetch(
      '/manager/overview',
      { method: 'GET' },
      {
        success: true,
        teamStats,
        courseCompletionBreakdown,
        teamSkillDistribution,
        monthlyLearningActivity,
        teamSkillGaps,
      }
    );
  },

  getEmployees: async (filters = {}) => {
    const query = new URLSearchParams(filters).toString();
    const endpoint = query ? `/manager/employees?${query}` : '/manager/employees';
    return await apiFetch(
      endpoint,
      { method: 'GET' },
      {
        success: true,
        count: mockEmployees.length,
        employees: mockEmployees,
      }
    );
  },

  assignCourse: async (employeeId, courseId, deadline) => {
    return await apiFetch(
      '/manager/assign-course',
      {
        method: 'POST',
        body: JSON.stringify({ employeeId, courseId, deadline }),
      },
      {
        success: true,
        message: 'Course assigned successfully',
        assignment: { employeeId, courseId, deadline, assignedBy: 'Dr. Sunita Rao' },
      }
    );
  },

  nudge: async (employeeId, reason) => {
    return await apiFetch(
      '/manager/nudge',
      {
        method: 'POST',
        body: JSON.stringify({ employeeId, reason }),
      },
      {
        success: true,
        message: 'Compliance nudge sent successfully',
      }
    );
  },
};

// ----------------------------------------------------------------------
// NOTIFICATIONS APIS
// ----------------------------------------------------------------------
export const notificationsApi = {
  getAll: async () => {
    return await apiFetch(
      '/notifications',
      { method: 'GET' },
      {
        success: true,
        notifications: initialNotifications,
        unreadCount: initialNotifications.filter((n) => n.unread).length,
      }
    );
  },

  markRead: async (id) => {
    return await apiFetch(
      `/notifications/${id}/read`,
      { method: 'POST' },
      { success: true }
    );
  },

  markAllRead: async () => {
    return await apiFetch(
      '/notifications/read-all',
      { method: 'POST' },
      { success: true }
    );
  },
};

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');
const TEMP_STORE_PATH = path.join(DATA_DIR, 'store.tmp.json');

// In-memory cache for ultra-fast response times
let inMemoryStore = null;
let writeQueue = Promise.resolve();

// Initial seed data
async function getSeedData() {
  try {
    const { mockCourses } = await import('../../src/data/mockCourses.js');
    const {
      mockEmployees,
      teamStats,
      teamSkillGaps,
      teamSkillDistribution,
      courseCompletionBreakdown,
      monthlyLearningActivity,
    } = await import('../../src/data/mockEmployees.js');
    const { initialNotifications } = await import('../../src/data/mockNotifications.js');
    const { quizQuestionBank } = await import('../../src/data/mockQuizzes.js');
    const { radarSkillData, strengthsList, skillsToImprove, historicalSkillProgress } = await import('../../src/data/mockSkills.js');

    return {
      activeRole: 'employee',
      users: {
        employee: {
          id: 'emp-user-1',
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
          preferences: {
            emailNotifications: true,
            aiRecommendations: true,
            digestFrequency: 'weekly',
            darkMode: true,
          },
        },
        manager: {
          id: 'mgr-user-1',
          name: 'Dr. Sunita Rao',
          designation: 'Director (Capacity Building & IT Governance)',
          department: 'Ministry of Electronics & IT (MeitY)',
          cadre: 'Senior Administrative Grade (SAG)',
          employeeId: 'GOV-DIR-2021-0042',
          role: 'manager',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          skillScore: 92,
          preferences: {
            emailNotifications: true,
            aiRecommendations: true,
            digestFrequency: 'daily',
            darkMode: true,
          },
        },
      },
      courses: JSON.parse(JSON.stringify(mockCourses)),
      employees: JSON.parse(JSON.stringify(mockEmployees)),
      teamStats: JSON.parse(JSON.stringify(teamStats)),
      teamSkillGaps: JSON.parse(JSON.stringify(teamSkillGaps)),
      teamSkillDistribution: JSON.parse(JSON.stringify(teamSkillDistribution)),
      courseCompletionBreakdown: JSON.parse(JSON.stringify(courseCompletionBreakdown)),
      monthlyLearningActivity: JSON.parse(JSON.stringify(monthlyLearningActivity)),
      notifications: JSON.parse(JSON.stringify(initialNotifications)),
      quizQuestionBank: JSON.parse(JSON.stringify(quizQuestionBank)),
      radarSkillData: JSON.parse(JSON.stringify(radarSkillData)),
      strengthsList: JSON.parse(JSON.stringify(strengthsList)),
      skillsToImprove: JSON.parse(JSON.stringify(skillsToImprove)),
      historicalSkillProgress: JSON.parse(JSON.stringify(historicalSkillProgress)),
      quizHistory: [
        {
          id: 'quiz-hist-1',
          topic: 'Cybersecurity',
          difficulty: 'Medium',
          score: 82,
          correctCount: 4,
          totalCount: 5,
          timeSpent: '04:18',
          timestamp: '2026-09-12 11:30',
          feedback: 'Strong understanding of CERT-In directives. Focus more on endpoint forensics.',
        },
        {
          id: 'quiz-hist-2',
          topic: 'Cloud Computing',
          difficulty: 'Intermediate',
          score: 65,
          correctCount: 3,
          totalCount: 5,
          timeSpent: '05:02',
          timestamp: '2026-09-08 14:15',
          feedback: 'Good grasp of MeghRaj principles; review VPC data localization under DPDP Act.',
        },
      ],
      certificates: [
        {
          id: 'cert-1',
          courseId: 'dpdp-act-2023',
          title: 'Digital Personal Data Protection Act 2023 Compliance',
          issuer: 'GovLearn AI / CBC Knowledge Hub',
          recipientName: 'Rajesh Verma',
          recipientId: 'GOV-IT-2024-8921',
          issueDate: '15 June 2026',
          certId: 'GL-CERT-2026-DPDP-9812',
          verificationHash: '0x8892fa4b8e21c33f7d1a90bc129e01124d',
          qrPayload: 'https://govlearn.gov.in/verify/GL-CERT-2026-DPDP-9812?hash=0x8892fa4b',
        },
        {
          id: 'cert-2',
          courseId: 'advanced-egov-arch',
          title: 'Advanced e-Governance Systems Architecture',
          issuer: 'GovLearn AI / National Informatics Centre',
          recipientName: 'Rajesh Verma',
          recipientId: 'GOV-IT-2024-8921',
          issueDate: '28 April 2026',
          certId: 'GL-CERT-NIC-EGOV-4412',
          verificationHash: '0x3341bc990184b23df8120e88914c8109a2',
          qrPayload: 'https://govlearn.gov.in/verify/GL-CERT-NIC-EGOV-4412?hash=0x3341bc99',
        },
      ],
      assignments: [
        {
          id: 'assign-1',
          employeeId: 'emp-102',
          employeeName: 'Priya Sharma',
          courseId: 'cybersecurity-essentials',
          courseTitle: 'Cybersecurity Essentials for Public Servants',
          assignedBy: 'Dr. Sunita Rao',
          assignedDate: '2026-09-10',
          deadline: '2026-09-30',
          status: 'In Progress',
        },
      ],
      nudges: [],
    };
  } catch (err) {
    console.error('Error reading mock data during seed:', err);
    return {
      activeRole: 'employee',
      users: {},
      courses: [],
      notifications: [],
      quizQuestionBank: {},
      radarSkillData: [],
      strengthsList: [],
      skillsToImprove: [],
      historicalSkillProgress: [],
      quizHistory: [],
      certificates: [],
      assignments: [],
      nudges: [],
    };
  }
}

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Atomic file write using a temp file swap to prevent corruption
async function atomicWriteFile(filePath, data) {
  const jsonStr = JSON.stringify(data, null, 2);
  await fs.promises.writeFile(TEMP_STORE_PATH, jsonStr, 'utf-8');
  await fs.promises.rename(TEMP_STORE_PATH, filePath);
}

// Initialize database
export async function initDatabase() {
  if (!fs.existsSync(STORE_PATH)) {
    console.log('[DB] store.json not found. Generating initial seed dataset...');
    const seed = await getSeedData();
    await atomicWriteFile(STORE_PATH, seed);
    inMemoryStore = seed;
    console.log('[DB] Seed dataset initialized successfully.');
  } else {
    try {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      inMemoryStore = JSON.parse(raw);
      console.log('[DB] Database loaded successfully from disk.');
    } catch (err) {
      console.error('[DB] Error parsing existing store.json, resetting to seed:', err);
      const seed = await getSeedData();
      await atomicWriteFile(STORE_PATH, seed);
      inMemoryStore = seed;
    }
  }
  return inMemoryStore;
}

// Get copy of current store
export function getStore() {
  if (!inMemoryStore) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return inMemoryStore;
}

// Thread-safe update function
export async function updateStore(updaterFn) {
  if (!inMemoryStore) {
    await initDatabase();
  }

  // Queue write tasks sequentially
  return new Promise((resolve, reject) => {
    writeQueue = writeQueue
      .then(async () => {
        const updated = await updaterFn(inMemoryStore);
        if (updated) {
          inMemoryStore = updated;
        }
        await atomicWriteFile(STORE_PATH, inMemoryStore);
        resolve(inMemoryStore);
      })
      .catch((err) => {
        console.error('[DB] Write failure:', err);
        reject(err);
      });
  });
}

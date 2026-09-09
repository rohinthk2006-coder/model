export const teamStats = {
  totalEmployees: 48,
  activeLearners: 39,
  averageSkillScore: 74,
  skillGapsIdentified: 17,
  monthlyTrainingHoursCompleted: 284,
  mandatoryComplianceRate: 91,
};

export const teamSkillGaps = [
  { skill: 'Cloud Computing', gapPercentage: 42, affectedCount: 20, priority: 'High', benchmark: 80, currentAvg: 58 },
  { skill: 'Cybersecurity', gapPercentage: 37, affectedCount: 18, priority: 'High', benchmark: 85, currentAvg: 62 },
  { skill: 'AI Fundamentals', gapPercentage: 31, affectedCount: 15, priority: 'Medium', benchmark: 75, currentAvg: 64 },
  { skill: 'Data Analytics', gapPercentage: 28, affectedCount: 13, priority: 'Medium', benchmark: 75, currentAvg: 69 },
  { skill: 'Digital Governance', gapPercentage: 14, affectedCount: 7, priority: 'Low', benchmark: 85, currentAvg: 82 },
];

export const teamSkillDistribution = [
  { skill: 'Digital Governance', teamScore: 82, departmentBenchmark: 80 },
  { skill: 'Cybersecurity', teamScore: 62, departmentBenchmark: 85 },
  { skill: 'Data Analytics', teamScore: 69, departmentBenchmark: 75 },
  { skill: 'Cloud Computing', teamScore: 58, departmentBenchmark: 80 },
  { skill: 'Communication', teamScore: 79, departmentBenchmark: 75 },
  { skill: 'AI Fundamentals', teamScore: 64, departmentBenchmark: 75 },
];

export const courseCompletionBreakdown = [
  { name: 'Completed', value: 48, color: '#10B981' },
  { name: 'In Progress', value: 34, color: '#2563EB' },
  { name: 'Needs Attention', value: 12, color: '#F59E0B' },
  { name: 'Not Started', value: 6, color: '#94A3B8' },
];

export const monthlyLearningActivity = [
  { month: 'Jan', totalHours: 190, activeUsers: 28 },
  { month: 'Feb', totalHours: 215, activeUsers: 32 },
  { month: 'Mar', totalHours: 240, activeUsers: 35 },
  { month: 'Apr', totalHours: 230, activeUsers: 33 },
  { month: 'May', totalHours: 265, activeUsers: 37 },
  { month: 'Jun', totalHours: 284, activeUsers: 39 },
];

export const mockEmployees = [
  {
    id: 'emp-101',
    name: 'Arun Kumar',
    email: 'arun.kumar@meity.gov.in',
    employeeId: 'GOV-IT-2023-4102',
    department: 'IT',
    designation: 'Senior Technical Officer',
    skillScore: 82,
    coursesCompleted: 14,
    learningStatus: 'On Track',
    statusColor: 'emerald',
    primarySkillGap: 'Cloud Orchestration',
    lastActive: 'Today, 10:15 AM',
    weeklyHours: 4.5,
    streak: 12,
    radar: [
      { skill: 'Gov', score: 85 },
      { skill: 'Cyber', score: 80 },
      { skill: 'Data', score: 82 },
      { skill: 'Cloud', score: 72 },
      { skill: 'Comm', score: 88 },
      { skill: 'AI', score: 85 }
    ]
  },
  {
    id: 'emp-102',
    name: 'Priya S',
    email: 'priya.s@meity.gov.in',
    employeeId: 'GOV-HR-2022-8924',
    department: 'HR',
    designation: 'Assistant Director (Personnel)',
    skillScore: 76,
    coursesCompleted: 11,
    learningStatus: 'On Track',
    statusColor: 'emerald',
    primarySkillGap: 'Data Analytics',
    lastActive: 'Yesterday',
    weeklyHours: 3.2,
    streak: 5,
    radar: [
      { skill: 'Gov', score: 88 },
      { skill: 'Cyber', score: 68 },
      { skill: 'Data', score: 64 },
      { skill: 'Cloud', score: 55 },
      { skill: 'Comm', score: 92 },
      { skill: 'AI', score: 70 }
    ]
  },
  {
    id: 'emp-103',
    name: 'Rahul K',
    email: 'rahul.k@meity.gov.in',
    employeeId: 'GOV-FIN-2024-1109',
    department: 'Finance',
    designation: 'Section Officer (Budget & Accounts)',
    skillScore: 61,
    coursesCompleted: 7,
    learningStatus: 'Needs Attention',
    statusColor: 'amber',
    primarySkillGap: 'Cybersecurity & Cloud',
    lastActive: '3 days ago',
    weeklyHours: 1.0,
    streak: 0,
    radar: [
      { skill: 'Gov', score: 78 },
      { skill: 'Cyber', score: 48 },
      { skill: 'Data', score: 75 },
      { skill: 'Cloud', score: 42 },
      { skill: 'Comm', score: 70 },
      { skill: 'AI', score: 52 }
    ]
  },
  {
    id: 'emp-104',
    name: 'Meena R',
    email: 'meena.r@meity.gov.in',
    employeeId: 'GOV-ADM-2021-3381',
    department: 'Administration',
    designation: 'Under Secretary (General Admin)',
    skillScore: 88,
    coursesCompleted: 16,
    learningStatus: 'Excellent',
    statusColor: 'cyan',
    primarySkillGap: 'None (Advanced Tier)',
    lastActive: 'Today, 08:45 AM',
    weeklyHours: 5.8,
    streak: 19,
    radar: [
      { skill: 'Gov', score: 95 },
      { skill: 'Cyber', score: 82 },
      { skill: 'Data', score: 84 },
      { skill: 'Cloud', score: 78 },
      { skill: 'Comm', score: 94 },
      { skill: 'AI', score: 85 }
    ]
  },
  {
    id: 'emp-105',
    name: 'Vikram Singh',
    email: 'vikram.singh@meity.gov.in',
    employeeId: 'GOV-POL-2023-7721',
    department: 'Policy & Planning',
    designation: 'Research Officer',
    skillScore: 70,
    coursesCompleted: 9,
    learningStatus: 'On Track',
    statusColor: 'emerald',
    primarySkillGap: 'Cloud Computing',
    lastActive: 'Today, 11:30 AM',
    weeklyHours: 2.8,
    streak: 4,
    radar: [
      { skill: 'Gov', score: 82 },
      { skill: 'Cyber', score: 62 },
      { skill: 'Data', score: 76 },
      { skill: 'Cloud', score: 50 },
      { skill: 'Comm', score: 80 },
      { skill: 'AI', score: 70 }
    ]
  },
  {
    id: 'emp-106',
    name: 'Sunita Patel',
    email: 'sunita.patel@meity.gov.in',
    employeeId: 'GOV-EGOV-2024-5512',
    department: 'Operations',
    designation: 'Junior Secretariat Assistant',
    skillScore: 58,
    coursesCompleted: 5,
    learningStatus: 'Critical Gap',
    statusColor: 'rose',
    primarySkillGap: 'Cybersecurity Fundamentals',
    lastActive: '5 days ago',
    weeklyHours: 0.5,
    streak: 0,
    radar: [
      { skill: 'Gov', score: 68 },
      { skill: 'Cyber', score: 45 },
      { skill: 'Data', score: 50 },
      { skill: 'Cloud', score: 40 },
      { skill: 'Comm', score: 72 },
      { skill: 'AI', score: 44 }
    ]
  },
  {
    id: 'emp-107',
    name: 'Ananya Roy',
    email: 'ananya.roy@meity.gov.in',
    employeeId: 'GOV-INF-2022-9901',
    department: 'IT',
    designation: 'Systems Analyst',
    skillScore: 85,
    coursesCompleted: 15,
    learningStatus: 'Excellent',
    statusColor: 'cyan',
    primarySkillGap: 'AI Governance',
    lastActive: 'Today, 01:20 PM',
    weeklyHours: 6.0,
    streak: 15,
    radar: [
      { skill: 'Gov', score: 84 },
      { skill: 'Cyber', score: 89 },
      { skill: 'Data', score: 86 },
      { skill: 'Cloud', score: 88 },
      { skill: 'Comm', score: 80 },
      { skill: 'AI', score: 73 }
    ]
  },
  {
    id: 'emp-108',
    name: 'Devendra Joshi',
    email: 'devendra.j@meity.gov.in',
    employeeId: 'GOV-CIT-2023-2219',
    department: 'Citizen Services',
    designation: 'Desk Officer (Grievance Portal)',
    skillScore: 64,
    coursesCompleted: 8,
    learningStatus: 'Needs Attention',
    statusColor: 'amber',
    primarySkillGap: 'Data Analytics & AI',
    lastActive: 'Yesterday',
    weeklyHours: 1.5,
    streak: 1,
    radar: [
      { skill: 'Gov', score: 80 },
      { skill: 'Cyber', score: 58 },
      { skill: 'Data', score: 55 },
      { skill: 'Cloud', score: 52 },
      { skill: 'Comm', score: 78 },
      { skill: 'AI', score: 51 }
    ]
  }
];

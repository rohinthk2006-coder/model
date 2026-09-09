export const radarSkillData = [
  { skill: 'Digital Governance', score: 86, benchmark: 75, fullMark: 100 },
  { skill: 'Cybersecurity', score: 61, benchmark: 80, fullMark: 100 },
  { skill: 'Data Analytics', score: 72, benchmark: 70, fullMark: 100 },
  { skill: 'Cloud Computing', score: 54, benchmark: 75, fullMark: 100 },
  { skill: 'Communication', score: 82, benchmark: 70, fullMark: 100 },
  { skill: 'AI Fundamentals', score: 68, benchmark: 75, fullMark: 100 },
];

export const strengthsList = [
  {
    name: 'Digital Governance',
    score: 86,
    badge: 'Mastery',
    color: 'emerald',
    description: 'Expertise in government workflows, e-Office compliance, citizen service delivery protocols, and RTI digital compliance.',
    recentMilestone: 'Completed Advanced e-Governance Architecture assessment (94%)',
  },
  {
    name: 'Communication',
    score: 82,
    badge: 'Proficient',
    color: 'emerald',
    description: 'Strong inter-departmental memo drafting, parliamentary question response framing, and public stakeholder communication.',
    recentMilestone: 'Certified in Official Communication & Briefing Standards',
  },
];

export const skillsToImprove = [
  {
    name: 'Cloud Computing',
    score: 54,
    benchmark: 75,
    gap: -21,
    severity: 'High Priority',
    color: 'rose',
    description: 'Knowledge gap in GovCloud (MeghRaj), cloud security policies, multi-tenant public sector architectures, and SaaS procurement.',
    recommendedCourseId: 'cloud-fundamentals',
    recommendedCourseTitle: 'Cloud Computing Fundamentals',
    targetHours: '6 hours',
  },
  {
    name: 'Cybersecurity',
    score: 61,
    benchmark: 80,
    gap: -19,
    severity: 'Moderate Priority',
    color: 'amber',
    description: 'Needs reinforcement in CERT-In security guidelines, cyber incident reporting protocols, phishing defenses, and data encryption.',
    recommendedCourseId: 'cybersecurity-essentials',
    recommendedCourseTitle: 'Cybersecurity Essentials',
    targetHours: '4 hours',
  },
  {
    name: 'AI Fundamentals',
    score: 68,
    benchmark: 75,
    gap: -7,
    severity: 'Moderate Priority',
    color: 'cyan',
    description: 'Developing familiarity with generative AI ethics, automated citizen service chatbots, and AI decision-support governance.',
    recommendedCourseId: 'ai-fundamentals',
    recommendedCourseTitle: 'AI Fundamentals',
    targetHours: '5 hours',
  },
];

export const historicalSkillProgress = [
  { month: 'Jan', overall: 65, technical: 58, governance: 78 },
  { month: 'Feb', overall: 68, technical: 60, governance: 80 },
  { month: 'Mar', overall: 70, technical: 62, governance: 82 },
  { month: 'Apr', overall: 73, technical: 64, governance: 84 },
  { month: 'May', overall: 75, technical: 67, governance: 85 },
  { month: 'Jun', overall: 78, technical: 71, governance: 86 },
];

import express from 'express';
import { getStore, updateStore } from '../db/database.js';

const router = express.Router();

const DEMO_TOPIC_EXTENSIONS = {
  'Public Procurement & GeM': [
    {
      id: 'gem-q1',
      question: 'Under GFR 2017 Rule 149, up to what monetary threshold can a government buyer purchase directly from any available GeM supplier meeting required quality?',
      scenario: 'A section officer requires emergency stationary and printer peripherals valued at ₹18,500 for an upcoming parliamentary committee session.',
      options: ['₹10,000', '₹25,000', '₹50,000', '₹1,00,000'],
      correctIndex: 1,
      explanation: 'Under GFR 2017 Rule 149(i), direct purchase on GeM without comparison is permitted up to ₹25,000 through any of the available suppliers meeting quality criteria.',
      competencyTag: 'GFR 2017 & Public Procurement',
      difficulty: 'Medium',
    },
    {
      id: 'gem-q2',
      question: 'For procurement valued between ₹25,000 and ₹5,00,000 on the GeM portal, what procedure is mandatory under GFR Rule 149(ii)?',
      scenario: 'The IT division plans to acquire 15 dual-monitor desktop stands with an estimated aggregate procurement cost of ₹3,40,000.',
      options: [
        'Mandatory offline open newspaper advertisement',
        'Direct purchase from the manufacturer OEM only',
        'Comparison of at least 3 different manufacturers meeting specifications and selecting L1',
        'Single source quotation with joint secretary approval',
      ],
      correctIndex: 2,
      explanation: 'Under GFR 149(ii), purchases between ₹25,000 and ₹5,00,000 require comparison of products of at least 3 different manufacturers meeting specifications and selecting lowest (L1).',
      competencyTag: 'GeM L1 Procurement Protocols',
      difficulty: 'Medium',
    },
    {
      id: 'gem-q3',
      question: 'What is the statutory requirement regarding Earnest Money Deposit (EMD) exemptions for Micro and Small Enterprises (MSEs) on GeM?',
      scenario: 'An MSE vendor submits a bid for cloud data backup storage services without submitting a bank guarantee.',
      options: [
        'MSEs must deposit 50% of the standard EMD',
        'MSEs registered with Udyam are 100% exempt from paying EMD',
        'EMD is mandatory for all vendors without exception',
        'Exemptions apply only if the contract value is under ₹10,000',
      ],
      correctIndex: 1,
      explanation: 'Under the Public Procurement Policy for MSEs Order 2012 and GFR Rule 170, MSEs registered with Udyam or specified bodies are completely exempt from bid security/EMD.',
      competencyTag: 'Public Procurement Policy & MSEs',
      difficulty: 'Intermediate',
    },
  ],
  'Mission Karmayogi': [
    {
      id: 'karmayogi-q1',
      question: 'Which framework forms the bedrock of competency modeling in Mission Karmayogi (iGOT)?',
      scenario: 'A departmental capacity building officer is structuring the annual training calendar for ministerial staff.',
      options: [
        'Central Pay Commission Grade Matrix',
        'Framework for Roles, Activities and Competencies (FRAC)',
        'Seniority-cum-Merit Evaluation Table',
        'General Financial Procedures Schedule',
      ],
      correctIndex: 1,
      explanation: 'Mission Karmayogi adopts the FRAC (Framework for Roles, Activities and Competencies) model to transition from rules-based to roles-based civil services human resource management.',
      competencyTag: 'Karmayogi FRAC Competencies',
      difficulty: 'Beginner',
    },
    {
      id: 'karmayogi-q2',
      question: 'What is the national target benchmark for civil servants in annual certified learning hours under Mission Karmayogi?',
      scenario: 'An administrative officer is reviewing quarterly training compliance for their section.',
      options: ['10 hours per year', '40 hours per year', '100 hours per year', '15 hours per month'],
      correctIndex: 1,
      explanation: 'Under Mission Karmayogi guidelines, civil servants are encouraged to complete a minimum target of 40 hours of continuous professional development per year.',
      competencyTag: 'Civil Services Capacity Standards',
      difficulty: 'Beginner',
    },
  ],
};

// GET /api/quiz/topics - Available topics and metadata
router.get('/topics', (req, res) => {
  try {
    const topics = [
      { id: 'Cybersecurity', name: 'Cybersecurity & CERT-In Protocols', questionCount: 15, tag: 'High Priority' },
      { id: 'Cloud Computing', name: 'Cloud Computing & MeghRaj', questionCount: 15, tag: 'High Priority' },
      { id: 'Data Analytics', name: 'Data Analytics for Governance', questionCount: 15, tag: 'Standard' },
      { id: 'AI Fundamentals', name: 'AI Fundamentals & Ethics', questionCount: 15, tag: 'Emerging' },
      { id: 'Digital Governance', name: 'Digital Governance & RTI Act', questionCount: 15, tag: 'Core' },
      { id: 'Public Procurement & GeM', name: 'GFR 2017 & GeM Procurement', questionCount: 10, tag: 'Statutory' },
      { id: 'Mission Karmayogi', name: 'Mission Karmayogi & FRAC', questionCount: 10, tag: 'Capacity' },
    ];

    return res.json({
      success: true,
      topics,
      difficulties: ['Beginner', 'Medium', 'Advanced'],
      questionTypes: ['MCQ', 'Scenario-Based', 'True/False'],
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/generate - Dynamic AI quiz generation
router.post('/generate', (req, res) => {
  try {
    const { topic = 'Cybersecurity', difficulty = 'Medium', questionCount = 5, questionType = 'MCQ' } = req.body;
    const count = Math.max(1, Math.min(15, Number(questionCount) || 5));
    const store = getStore();

    let pool = [];

    // Check store bank
    if (store.quizQuestionBank && store.quizQuestionBank[topic]) {
      const topicBank = store.quizQuestionBank[topic];
      pool = topicBank[questionType] || topicBank.MCQ || [];
    }

    // Check custom extensions
    if (DEMO_TOPIC_EXTENSIONS[topic]) {
      pool = [...pool, ...DEMO_TOPIC_EXTENSIONS[topic]];
    }

    // If pool is still small or generic topic requested, synthesize contextual questions
    if (pool.length < count) {
      const fallbackQuestions = [
        {
          id: `gen-q-${Date.now()}-1`,
          question: `Which primary regulation governs public records retention and digital audit trails in ${topic}?`,
          scenario: `A ministry audit committee is reviewing operational compliance in ${topic}.`,
          options: [
            'Public Records Act & IT Act 2000',
            'Civil Aviation Protocols',
            'State Police Manual Section 4',
            'Consumer Protection Rules 2019',
          ],
          correctIndex: 0,
          explanation: `In the context of ${topic}, official compliance relies on the IT Act 2000 and Public Records Act for statutory record retention and evidentiary audit trails.`,
          competencyTag: `${topic} Regulatory Standards`,
          difficulty,
        },
        {
          id: `gen-q-${Date.now()}-2`,
          question: `When handling confidential ministerial dispatches related to ${topic}, which communication channel is mandated?`,
          scenario: `Officers are drafting inter-departmental advisory notes containing preliminary policy drafts.`,
          options: [
            'Public commercial instant messaging apps',
            'Government Secure Network (NIC-Mail / Sandes with Kavach 2FA)',
            'Personal cloud drive public links',
            'Unencrypted third-party email providers',
          ],
          correctIndex: 1,
          explanation: 'Cabinet Secretariat guidelines strictly mandate the use of official government communication infrastructure (Sandes, NIC mail with Kavach MFA) for all official correspondence.',
          competencyTag: 'Secure Communications Protocol',
          difficulty,
        },
      ];
      pool = [...pool, ...fallbackQuestions];
    }

    // Shuffle and pick requested count
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, count).map((q, idx) => ({
      ...q,
      orderIndex: idx,
    }));

    return res.json({
      success: true,
      topic,
      difficulty,
      questionType,
      count: selectedQuestions.length,
      questions: selectedQuestions,
      estimatedTimeMinutes: count,
      aiModel: 'GovLearn Local Intelligence Engine v2.4 (SIH26101)',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/quiz/evaluate - Evaluate quiz answers, calculate score, generate AI feedback
router.post('/evaluate', async (req, res) => {
  try {
    const { topic = 'Cybersecurity', difficulty = 'Medium', questions = [], userAnswers = {}, timeSpent = '04:00' } = req.body;

    let correctCount = 0;
    const questionReview = [];
    const strengths = new Set();
    const weaknesses = new Set();

    questions.forEach((q, idx) => {
      const selectedIndex = userAnswers[idx];
      const isCorrect = selectedIndex === q.correctIndex;

      if (isCorrect) {
        correctCount++;
        if (q.competencyTag) strengths.add(q.competencyTag);
      } else {
        if (q.competencyTag) weaknesses.add(q.competencyTag);
      }

      questionReview.push({
        questionId: q.id,
        questionText: q.question,
        selectedOption: selectedIndex !== undefined ? q.options[selectedIndex] : 'No Answer',
        correctOption: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation,
        competencyTag: q.competencyTag || topic,
      });
    });

    const totalCount = questions.length || 1;
    const calculatedScore = Math.round((correctCount / totalCount) * 100);
    const isPassed = calculatedScore >= 70;

    // AI feedback synthesis
    let aiFeedbackSummary = '';
    let recommendedCourse = null;

    if (calculatedScore >= 80) {
      aiFeedbackSummary = `Commendable performance! You demonstrated exceptional domain mastery in ${topic}. Key strengths observed in ${Array.from(strengths).join(', ') || topic}. Ready for advanced capstone assignments.`;
    } else if (calculatedScore >= 60) {
      aiFeedbackSummary = `Satisfactory foundation in ${topic}. You showed solid knowledge, but specific knowledge gaps were detected in: ${Array.from(weaknesses).join(', ') || 'core principles'}. Recommended targeted revision.`;
    } else {
      aiFeedbackSummary = `Critical gaps identified in ${topic} (${calculatedScore}%). Remedial modules recommended to satisfy civil service benchmark compliance (75%).`;
    }

    if (topic.includes('Cloud')) {
      recommendedCourse = { id: 'cloud-fundamentals', title: 'Cloud Computing Fundamentals' };
    } else if (topic.includes('Cyber') || topic.includes('Security')) {
      recommendedCourse = { id: 'cybersecurity-essentials', title: 'Cybersecurity Essentials for Public Servants' };
    } else {
      recommendedCourse = { id: 'data-analytics-governance', title: 'Data Analytics for Governance' };
    }

    const evaluationResult = {
      id: `eval-${Date.now()}`,
      topic,
      difficulty,
      score: calculatedScore,
      correctCount,
      totalCount,
      isPassed,
      timeSpent,
      timestamp: new Date().toLocaleString('en-GB'),
      aiFeedback: aiFeedbackSummary,
      strengths: Array.from(strengths),
      weaknesses: Array.from(weaknesses),
      recommendedCourse,
      questionReview,
    };

    // Save to store history
    await updateStore((store) => {
      if (!store.quizHistory) store.quizHistory = [];
      store.quizHistory.unshift({
        id: evaluationResult.id,
        topic,
        difficulty,
        score: calculatedScore,
        correctCount,
        totalCount,
        timeSpent,
        timestamp: 'Just now',
        feedback: aiFeedbackSummary,
      });

      // Update officer streak if passed
      if (store.users?.employee && isPassed) {
        store.users.employee.streak = (store.users.employee.streak || 7) + 1;
      }

      return store;
    });

    return res.json({
      success: true,
      result: evaluationResult,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/quiz/history - Retrieve quiz attempt records
router.get('/history', (req, res) => {
  try {
    const store = getStore();
    return res.json({
      success: true,
      history: store.quizHistory || [],
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

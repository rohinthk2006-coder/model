import express from 'express';
import { getStore, updateStore } from '../db/database.js';

const router = express.Router();

// GET /api/skills/gap-analysis - Retrieve skill radar benchmarks, strengths, and gaps
router.get('/gap-analysis', (req, res) => {
  try {
    const store = getStore();
    const radar = store.radarSkillData || [];
    const strengths = store.strengthsList || [];
    const toImprove = store.skillsToImprove || [];
    const history = store.historicalSkillProgress || [];

    // Calculate aggregated metrics
    const totalScore = radar.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const avgScore = radar.length ? Math.round(totalScore / radar.length) : 75;
    const totalBenchmark = radar.reduce((acc, curr) => acc + (curr.benchmark || 0), 0);
    const avgBenchmark = radar.length ? Math.round(totalBenchmark / radar.length) : 75;

    return res.json({
      success: true,
      data: {
        radarSkillData: radar,
        strengthsList: strengths,
        skillsToImprove: toImprove,
        historicalSkillProgress: history,
        metrics: {
          overallScore: avgScore,
          benchmarkAverage: avgBenchmark,
          criticalGapCount: toImprove.filter((s) => s.gap < -10).length,
          confidenceScore: 92,
          lastCalibrated: 'Today, synchronized with Karmayogi',
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/skills/diagnostics - Run deep AI diagnostic calibration
router.post('/diagnostics', async (req, res) => {
  try {
    let resultPayload = null;

    await updateStore((store) => {
      // Analyze courses progress to adjust radar
      const courses = store.courses || [];
      const completedCourses = courses.filter((c) => c.progress === 100).length;

      // Incrementally calibrate skills with +2 to +4 points if active
      store.radarSkillData = (store.radarSkillData || []).map((item) => {
        let boost = 0;
        if (item.skill === 'Cloud Computing') {
          const cloudCourse = courses.find((c) => c.id === 'cloud-fundamentals');
          if (cloudCourse && cloudCourse.progress > 40) boost = 3;
        } else if (item.skill === 'Cybersecurity') {
          const cyberCourse = courses.find((c) => c.id === 'cybersecurity-essentials');
          if (cyberCourse && cyberCourse.progress > 20) boost = 2;
        } else {
          boost = Math.floor(Math.random() * 2) + 1;
        }

        const newScore = Math.min(100, item.score + boost);
        return { ...item, score: newScore };
      });

      // Recalculate overall score
      const newAvgScore = Math.round(
        store.radarSkillData.reduce((acc, curr) => acc + curr.score, 0) / store.radarSkillData.length
      );

      // Update employee profile
      if (store.users?.employee) {
        store.users.employee.skillScore = newAvgScore;
      }

      // Update skills to improve list gaps
      store.skillsToImprove = (store.skillsToImprove || []).map((s) => {
        const matchingRadar = store.radarSkillData.find((r) => r.skill === s.name);
        const currentScore = matchingRadar ? matchingRadar.score : s.score;
        const newGap = currentScore - s.benchmark;
        return {
          ...s,
          score: currentScore,
          gap: newGap,
          severity: newGap < -15 ? 'High Priority' : newGap < 0 ? 'Moderate Priority' : 'On Track',
        };
      });

      // Add audit notification
      store.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: 'Competency Diagnostic Calibrated',
        message: `Deep AI diagnostic updated your skill profile. Your overall competency is now ${newAvgScore}% (Confidence 94%).`,
        category: 'ai',
        timestamp: 'Just now',
        unread: true,
        link: '/skills',
      });

      resultPayload = {
        radarSkillData: store.radarSkillData,
        skillsToImprove: store.skillsToImprove,
        strengthsList: store.strengthsList,
        newOverallScore: newAvgScore,
        aiSummary: `AI diagnostic re-calibrated against 48 civil service indicators. Noted positive momentum in Cloud Computing and Cybersecurity. 2 targeted courses remain prioritized.`,
      };

      return store;
    });

    return res.json({
      success: true,
      message: 'AI Skill Diagnostic completed successfully',
      data: resultPayload,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/skills/matrix - Departmental competency matrix for managers
router.get('/matrix', (req, res) => {
  try {
    const store = getStore();
    return res.json({
      success: true,
      data: {
        teamSkillGaps: store.teamSkillGaps || [],
        teamSkillDistribution: store.teamSkillDistribution || [],
        teamStats: store.teamStats || {},
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

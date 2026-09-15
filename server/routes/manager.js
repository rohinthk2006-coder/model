import express from 'express';
import { getStore, updateStore } from '../db/database.js';

const router = express.Router();

// GET /api/manager/overview - Team statistics, charts, and metrics
router.get('/overview', (req, res) => {
  try {
    const store = getStore();
    return res.json({
      success: true,
      teamStats: store.teamStats || {},
      courseCompletionBreakdown: store.courseCompletionBreakdown || [],
      teamSkillDistribution: store.teamSkillDistribution || [],
      monthlyLearningActivity: store.monthlyLearningActivity || [],
      teamSkillGaps: store.teamSkillGaps || [],
      recentAssignments: store.assignments?.slice(0, 5) || [],
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/manager/employees - Filterable employee directory
router.get('/employees', (req, res) => {
  try {
    const store = getStore();
    let employees = store.employees || [];
    const { search, department, status, score } = req.query;

    if (search) {
      const q = search.toLowerCase();
      employees = employees.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(q) ||
          emp.employeeId?.toLowerCase().includes(q) ||
          emp.primarySkillGap?.toLowerCase().includes(q)
      );
    }

    if (department && department !== 'All') {
      employees = employees.filter(
        (emp) => emp.department?.toLowerCase() === department.toLowerCase()
      );
    }

    if (status && status !== 'All') {
      employees = employees.filter((emp) => emp.learningStatus === status);
    }

    if (score && score !== 'All') {
      if (score === '>80%') {
        employees = employees.filter((emp) => emp.skillScore >= 80);
      } else if (score === '60-80%') {
        employees = employees.filter((emp) => emp.skillScore >= 60 && emp.skillScore < 80);
      } else if (score === '<60%') {
        employees = employees.filter((emp) => emp.skillScore < 60);
      }
    }

    return res.json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/manager/assign-course - Manager assigns a course to an employee
router.post('/assign-course', async (req, res) => {
  try {
    const { employeeId, courseId, deadline } = req.body;

    if (!employeeId || !courseId) {
      return res.status(400).json({
        success: false,
        error: 'Both employeeId and courseId are required.',
      });
    }

    let createdAssignment = null;

    await updateStore((store) => {
      const employee = store.employees?.find((e) => e.id === employeeId || e.employeeId === employeeId);
      const course = store.courses?.find((c) => c.id === courseId);

      if (!course) {
        throw new Error(`Course with ID "${courseId}" not found`);
      }

      const empName = employee ? employee.name : 'Officer';
      const targetDeadline = deadline || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      createdAssignment = {
        id: `assign-${Date.now()}`,
        employeeId,
        employeeName: empName,
        courseId: course.id,
        courseTitle: course.title,
        assignedBy: 'Dr. Sunita Rao (Director)',
        assignedDate: new Date().toISOString().split('T')[0],
        deadline: targetDeadline,
        status: 'Assigned',
      };

      if (!store.assignments) store.assignments = [];
      store.assignments.unshift(createdAssignment);

      // Create high-priority notification in recipient's inbox
      if (!store.notifications) store.notifications = [];
      store.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: 'New Training Mandate Assigned',
        message: `Director Dr. Sunita Rao assigned you "${course.title}". Completion deadline: ${targetDeadline}.`,
        category: 'course',
        timestamp: 'Just now',
        unread: true,
        link: `/learning/${course.id}`,
      });

      return store;
    });

    return res.json({
      success: true,
      message: `Assigned "${createdAssignment.courseTitle}" successfully`,
      assignment: createdAssignment,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/manager/nudge - Manager sends compliance nudge
router.post('/nudge', async (req, res) => {
  try {
    const { employeeId, reason = 'Complete your pending compliance training' } = req.body;

    if (!employeeId) {
      return res.status(400).json({ success: false, error: 'employeeId is required.' });
    }

    let createdNudge = null;

    await updateStore((store) => {
      const employee = store.employees?.find((e) => e.id === employeeId || e.employeeId === employeeId);
      const empName = employee ? employee.name : 'Officer';

      createdNudge = {
        id: `nudge-${Date.now()}`,
        employeeId,
        employeeName: empName,
        sentBy: 'Dr. Sunita Rao',
        timestamp: new Date().toISOString(),
        reason,
      };

      if (!store.nudges) store.nudges = [];
      store.nudges.unshift(createdNudge);

      // Dispatch alert notification
      if (!store.notifications) store.notifications = [];
      store.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: 'Executive Capacity Nudge',
        message: `Reminder from Directorate: ${reason}. Please update your learning log to preserve departmental compliance.`,
        category: 'system',
        timestamp: 'Just now',
        unread: true,
        link: '/learning',
      });

      return store;
    });

    return res.json({
      success: true,
      message: 'Compliance nudge sent successfully',
      nudge: createdNudge,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

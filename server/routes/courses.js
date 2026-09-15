import express from 'express';
import crypto from 'node:crypto';
import { getStore, updateStore } from '../db/database.js';

const router = express.Router();

// GET /api/courses - List courses with filtering and search
router.get('/', (req, res) => {
  try {
    const store = getStore();
    let courses = store.courses || [];
    const { category, level, q, recommended } = req.query;

    if (category && category !== 'All') {
      courses = courses.filter(
        (c) => c.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (level && level !== 'All') {
      courses = courses.filter(
        (c) => c.level?.toLowerCase() === level.toLowerCase()
      );
    }

    if (recommended === 'true') {
      courses = courses.filter((c) => c.isAiRecommended);
    }

    if (q) {
      const query = q.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.category?.toLowerCase().includes(query) ||
          c.instructor?.toLowerCase().includes(query)
      );
    }

    return res.json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/courses/:id - Course details
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const store = getStore();
    const course = store.courses?.find((c) => c.id === id);

    if (!course) {
      return res.status(404).json({ success: false, error: `Course "${id}" not found` });
    }

    // Check if certificate exists for this course
    const certificate = store.certificates?.find((cert) => cert.courseId === id) || null;

    return res.json({
      success: true,
      course,
      certificate,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/courses/:id/enroll - Course enrollment
router.post('/:id/enroll', async (req, res) => {
  try {
    const { id } = req.params;
    let enrolledCourse = null;

    await updateStore((store) => {
      const course = store.courses?.find((c) => c.id === id);
      if (!course) return store;

      if (course.progress === undefined || course.progress === null) {
        course.progress = 0;
        course.enrolledDate = new Date().toISOString().split('T')[0];
      }

      enrolledCourse = course;
      return store;
    });

    if (!enrolledCourse) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    return res.json({
      success: true,
      message: `Enrolled in "${enrolledCourse.title}" successfully`,
      course: enrolledCourse,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/courses/:id/modules/:moduleId/toggle - Toggle module completion and update progress
router.post('/:id/modules/:moduleId/toggle', async (req, res) => {
  try {
    const { id, moduleId } = req.params;
    const modIdNumber = Number(moduleId);
    let updatedCourse = null;
    let newCertificate = null;

    await updateStore((store) => {
      const courseIndex = store.courses?.findIndex((c) => c.id === id);
      if (courseIndex === -1) return store;

      const course = store.courses[courseIndex];
      const updatedModules = (course.modules || []).map((m) => {
        if (m.id === modIdNumber) {
          return { ...m, completed: !m.completed };
        }
        return m;
      });

      const completedCount = updatedModules.filter((m) => m.completed).length;
      const totalCount = updatedModules.length || 1;
      const newProgress = Math.round((completedCount / totalCount) * 100);

      course.modules = updatedModules;
      course.progress = newProgress;

      const role = store.activeRole || 'employee';
      const currentUser = store.users[role] || store.users.employee;

      // If course is newly 100% complete, generate a verifiable GovLearn AI course-completion certificate
      if (newProgress === 100) {
        const existingCert = store.certificates?.find((cert) => cert.courseId === id);
        if (!existingCert) {
          const categoryPrefix = (course.category || 'GOV').slice(0, 4).toUpperCase();
          const certRand = Math.floor(1000 + Math.random() * 9000);
          const certId = `GL-CERT-2026-${categoryPrefix}-${certRand}`;
          const hashInput = `${certId}:${currentUser.employeeId || 'GOV-USER'}:${course.id}:${Date.now()}`;
          const verificationHash = '0x' + crypto.createHash('sha256').update(hashInput).digest('hex');
          const qrPayload = `https://govlearn.gov.in/verify/${certId}?hash=${verificationHash.slice(0, 10)}`;

          newCertificate = {
            id: `cert-${Date.now()}`,
            courseId: course.id,
            title: course.title,
            issuer: 'GovLearn AI / CBC Knowledge Hub',
            recipientName: currentUser.name || 'Civil Service Officer',
            recipientId: currentUser.employeeId || 'GOV-USER-8921',
            issueDate: new Date().toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            certId,
            verificationHash,
            qrPayload,
          };

          if (!store.certificates) store.certificates = [];
          store.certificates.push(newCertificate);

          // Update user stats
          if (currentUser.coursesCompleted !== undefined) {
            currentUser.coursesCompleted += 1;
          }

          // Add certificate notification
          store.notifications.unshift({
            id: `notif-${Date.now()}`,
            title: 'Course Completed & Certificate Issued',
            message: `Congratulations! You completed "${course.title}". Your verifiable GovLearn AI Certificate (${certId}) is now available in your profile.`,
            category: 'course',
            timestamp: 'Just now',
            unread: true,
            link: '/profile',
          });
        }
      }

      updatedCourse = course;
      return store;
    });

    if (!updatedCourse) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    return res.json({
      success: true,
      course: updatedCourse,
      certificate: newCertificate,
      message: `Module ${modIdNumber} updated. Course progress is now ${updatedCourse.progress}%.`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/courses/:id/certificate - Retrieve course certificate
router.get('/:id/certificate', (req, res) => {
  try {
    const { id } = req.params;
    const store = getStore();
    const cert = store.certificates?.find((c) => c.courseId === id);

    if (!cert) {
      return res.status(404).json({
        success: false,
        certificate: null,
        message: 'No certificate found for this course. Complete all modules to earn your certificate.',
      });
    }

    return res.json({
      success: true,
      certificate: cert,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

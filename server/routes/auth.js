import express from 'express';
import { getStore, updateStore } from '../db/database.js';

const router = express.Router();

// GET /api/auth/me - Get current user profile and preferences
router.get('/me', (req, res) => {
  try {
    const store = getStore();
    const role = store.activeRole || 'employee';
    const user = store.users[role] || store.users.employee;
    return res.json({
      success: true,
      role,
      user,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/auth/switch-role - Switch between 'employee' and 'manager'
router.post('/switch-role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['employee', 'manager'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role. Must be "employee" or "manager".' });
    }

    const updated = await updateStore((store) => {
      store.activeRole = role;
      return store;
    });

    const user = updated.users[role];
    return res.json({
      success: true,
      role,
      user,
      message: `Switched to ${role === 'manager' ? 'Manager (Dr. Sunita Rao)' : 'Employee (Rajesh Verma)'}`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/auth/profile - Update user profile and notification preferences
router.put('/profile', async (req, res) => {
  try {
    const updates = req.body;
    const store = getStore();
    const role = store.activeRole || 'employee';

    const updated = await updateStore((s) => {
      if (s.users[role]) {
        s.users[role] = {
          ...s.users[role],
          ...updates,
          preferences: {
            ...s.users[role].preferences,
            ...(updates.preferences || {}),
          },
        };
      }
      return s;
    });

    return res.json({
      success: true,
      user: updated.users[role],
      message: 'Profile updated successfully',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

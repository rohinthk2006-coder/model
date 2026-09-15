import express from 'express';
import { getStore, updateStore } from '../db/database.js';

const router = express.Router();

// GET /api/notifications - List all notifications
router.get('/', (req, res) => {
  try {
    const store = getStore();
    return res.json({
      success: true,
      notifications: store.notifications || [],
      unreadCount: (store.notifications || []).filter((n) => n.unread).length,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notifications/:id/read - Mark single notification as read
router.post('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;

    await updateStore((store) => {
      store.notifications = (store.notifications || []).map((n) =>
        n.id === id ? { ...n, unread: false } : n
      );
      return store;
    });

    return res.json({
      success: true,
      message: `Notification ${id} marked as read`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notifications/read-all - Mark all notifications as read
router.post('/read-all', async (req, res) => {
  try {
    await updateStore((store) => {
      store.notifications = (store.notifications || []).map((n) => ({
        ...n,
        unread: false,
      }));
      return store;
    });

    return res.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notifications - Create notification
router.post('/', async (req, res) => {
  try {
    const { title, message, category = 'system', link = '/dashboard' } = req.body;

    if (!title || !message) {
      return res.status(400).json({ success: false, error: 'Title and message are required.' });
    }

    let createdNotif = null;

    await updateStore((store) => {
      createdNotif = {
        id: `notif-${Date.now()}`,
        title,
        message,
        category,
        timestamp: 'Just now',
        unread: true,
        link,
      };

      if (!store.notifications) store.notifications = [];
      store.notifications.unshift(createdNotif);
      return store;
    });

    return res.json({
      success: true,
      notification: createdNotif,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

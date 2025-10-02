const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new task
router.post(
  '/',
  authenticateJWT,
  body('title').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check for duplicate task title for the user
      const existingTask = await Task.findOne({
        where: { title: req.body.title, userId: req.user.id }
      });
      if (existingTask) {
        return res.status(400).json({ message: 'Task with this title already exists' });
      }

      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'pending',
        userId: req.user.id,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Server error
 */

// Get all tasks for the logged-in user
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

// Get a specific task by ID
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task by ID
router.put(
  '/:id',
  authenticateJWT,
  body('title').optional().notEmpty(),
  body('status').optional().isIn(['pending', 'in_progress', 'completed']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await task.update(req.body);
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */

// Delete a task by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

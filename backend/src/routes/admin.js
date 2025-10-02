/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only endpoints
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: user1
 *                   role:
 *                     type: string
 *                     example: user
 *       403:
 *         description: Forbidden - Admins only
 *       500:
 *         description: Server error
 */

const express = require('express');
const User = require('../models/User');
const { authenticateJWT, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only route to get all users
router.get('/users', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

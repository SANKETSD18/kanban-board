// routes/user.js
import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Token verified, welcome!',
    userId: req.user.id,
  });
});

export default router;

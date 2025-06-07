import express from 'express';
import { registerUser, loginUser, getProfile } from '../controllers/User.controller.js';
import { verifyUser } from '../middleware/Auth.midddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:id', verifyUser, getProfile);

export default router;
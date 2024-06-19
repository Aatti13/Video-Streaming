import express from 'express';
import { authTest, signup, signin } from '../controllers/auth.js';

const router = express.Router();

router.get('/test', authTest);

// CREATE USER
router.post('/signup', signup);
// SIGN-IN
router.post('/signin', signin);
// GOOGLE
// router.post('/google');

export default router;
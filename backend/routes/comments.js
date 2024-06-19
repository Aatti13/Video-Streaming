import express from 'express';
import { commentTest } from '../controllers/comment.js';

const router = express.Router();

router.get('/test', commentTest);

export default router;
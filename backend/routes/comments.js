import express from 'express';
import { addComment, commentTest, deleteComment, getComments } from '../controllers/comment.js';
import { verification } from '../verification.js';

const router = express.Router();

router.get('/test', commentTest);

router.post('/', verification, addComment);

router.get('/:videoId', getComments);

router.delete('/:id', deleteComment);

export default router;
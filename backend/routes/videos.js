// ----------------------------------------------
// IMPORTS
import express from 'express';
import { videoTest } from '../controllers/video.js';

// Router init for '/api/videos
const router = express.Router();

// ----------------------------------------------
// TEST FUNCTION
router.get('/test', videoTest);

// ==============================================
// CRUD Operations


export default router;
// ----------------------------------------------
// IMPORTS
import express from 'express';
import { videoTest, uploadVideo, getVideo, deleteVideo, trendingVideos } from '../controllers/video.js';
import { verification } from '../verification.js';

// Router init for '/api/videos
const router = express.Router();

// ----------------------------------------------
// TEST FUNCTION
router.get('/test', videoTest);

// ==============================================
// CRUD Operations

// CREATE a video
router.post('/', verification, uploadVideo);

// READ a video (GET a video)
router.get('/find/:id', verification, getVideo);

// OTHERS
router.delete('/:id', verification, deleteVideo);

// Viewing a Video
router.put('/view/:id', verification);

router.get('/trending', trendingVideos);

router.get('/random', verification);
router.get('/recommended', verification);
router.get('/subscribed', verification);

export default router;
// ----------------------------------------------
// IMPORTS
import express from 'express';
import { videoTest, uploadVideo, getVideo, deleteVideo, trendingVideosSection, subscribedVideoSection, randomVideosSection, getByTag } from '../controllers/video.js';
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

router.get('/trending', trendingVideosSection);

router.get('/random', verification, randomVideosSection);
router.get('/recommended', verification);
router.get('/subscribed', verification, subscribedVideoSection);

router.get('/tags', getByTag);
router.get('/search');

export default router;
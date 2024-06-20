// ----------------------------------------------
// IMPORTS

import express from 'express';
import { deleteUser, dislikeUser, getUser, likeUser, subscribeUser, test, unsubscribeUser, updateUser } from '../controllers/user.js';
import { verification } from '../verification.js';

// ----------------------------------------------
// Init the express router for '/api/users'
const router = express.Router();

// ----------------------------------------------
// Test Function
router.get('/test', test);

// ==============================================
// CRUD Operations

// Read User
router.get('/find/:id', getUser);

// Update a User
router.put('/:id', verification, updateUser);

// Delete User
router.delete('/:id', verification, deleteUser);

// Subscribe
router.put('/sub/:id', verification, subscribeUser);

// Unsubscribe
router.put('/unsub/:id', verification, unsubscribeUser);

// Like
router.put('/like/:videoId', verification, likeUser);

// Dislike
router.put('/dislike/:videoId', verification, dislikeUser);

// ==============================================
export default router;
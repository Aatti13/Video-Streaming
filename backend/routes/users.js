import express from 'express';
import { deleteUser, dislikeUser, getUser, likeUser, subscribeUser, test, unsubscribeUser, updateUser } from '../controllers/user.js';
import { verification } from '../verification.js';


const router = express.Router();

// Test Function
router.get('/test', test);

// CRUD Operations

// Read User
router.get('/find/:id', getUser);

// Update a User
router.put('/:id', verification, updateUser);

// Delete User
router.delete('/:id', deleteUser);

// Subscribe
router.put('/sub/:id', subscribeUser);

// Unsubscribe
router.put('/unsub/:id', unsubscribeUser);

// Like
router.put('/like/:videoId', likeUser);

// Dislike
router.put('/dislike/:videoId', dislikeUser);

export default router;
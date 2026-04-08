import express from "express";
import { createComment, getCommentsByEvent, deleteComment } from "./../controllers/commentController.js";
const router = express.Router();

import { authMiddleware } from "./../middleware/authMiddleware.js";

// Get all comments for an event
router.get("/events/:eventId", getCommentsByEvent);

// Create comment or reply
router.post("/events/:eventId", authMiddleware, createComment);

// Delete
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
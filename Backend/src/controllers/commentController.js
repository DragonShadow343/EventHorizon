import Comment from "../models/Comment.js";
import mongoose from "mongoose";
import mongoSanitize from "mongo-sanitize";


// Create comment
export async function createComment(req, res) {
  const sanitizedBody = mongoSanitize(req.body);
  const sanitizedParams = mongoSanitize(req.params);
  try {
    const { text, parentId } = sanitizedBody;
    const { eventId } = sanitizedParams;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    if (parentId && !mongoose.Types.ObjectId.isValid(parentId)) {
      return res.status(400).json({ message: "Invalid parent ID" });
    }

    const comment = await Comment.create({
      eventId,
      userId: req.user.id,
      text,
      parentId: parentId || null,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get comments for an event
export async function getCommentsByEvent (req, res) {
  const sanitizedParams = mongoSanitize(req.params);
  const { eventId } = sanitizedParams;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }
  try {
    const comments = await Comment.find({
      eventId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete comment (optional but good for marks)
export async function deleteComment(req, res){
  const sanitizedParams = mongoSanitize(req.params);
  const { commentId } = sanitizedParams;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: "Invalid comment ID" });
  }
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Not found" });

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await comment.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
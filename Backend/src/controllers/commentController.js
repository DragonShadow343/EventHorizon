import Comment from "../models/Comment.js";

// Create comment
export async function createComment(req, res) {
  try {
    const { text, parentId } = req.body;

    const comment = await Comment.create({
      eventId: req.params.eventId,
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
  try {
    const comments = await Comment.find({
      eventId: req.params.eventId,
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
  try {
    const comment = await Comment.findById(req.params.commentId);

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
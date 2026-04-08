import { useEffect, useState } from "react";
import {
  fetchComments,
  createComment,
} from "./../api/comment.js";

const Discussion = ({ eventId, user, token }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const loadComments = async () => {
    const res = await fetchComments(eventId);
    setComments(Array.isArray(res) ? res : []);
  };

  useEffect(() => {
    loadComments();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await createComment(eventId, { text }, token);
    setText("");
    loadComments();
  };

  const handleReply = async (parentId, replyText) => {
    await createComment(eventId, { text: replyText, parentId }, token);
    loadComments();
  };

  const topLevel = (comments || []).filter((c) => !c.parentId);
  const replies = (comments || []).filter((c) => c.parentId);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Discussion</h3>

      {/* New Comment Box */}
      <div className="mb-6">
        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {topLevel.map((comment) => (
          <div key={comment._id} className="border rounded-lg p-4 bg-gray-50">
            <div className="text-sm text-gray-600 mb-1">
              {comment.userId?.name || "User"}
            </div>
            <p className="mb-2">{comment.text}</p>

            {/* Replies */}
            <div className="ml-6 border-l pl-4 space-y-2">
              {replies
                .filter(
                  (r) =>
                    r.parentId &&
                    r.parentId.toString() === comment._id
                )
                .map((reply) => (
                  <div key={reply._id} className="bg-white p-2 rounded">
                    <div className="text-sm text-gray-600">
                      {reply.userId?.name || "User"}
                    </div>
                    <p>{reply.text}</p>
                  </div>
                ))}
            </div>

            {/* Reply Box */}
            <div className="mt-2">
              <ReplyBox onReply={(text) => handleReply(comment._id, text)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReplyBox = ({ onReply }) => {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2 mt-2">
      <input
        className="flex-1 border rounded px-2 py-1"
        placeholder="Reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => {
          if (!text.trim()) return;
          onReply(text);
          setText("");
        }}
      >
        Reply
      </button>
    </div>
  );
}

export default Discussion;
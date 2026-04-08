import { useEffect, useState } from "react";
import {
  fetchComments,
  createComment,
} from "./../api/comment.js";

const Discussion = ({ eventId, user, token }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [collapsedComments, setCollapsedComments] = useState({});

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
      {user && (<div className="mb-6">
        <textarea
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>)}

      {/* Comments */}
      <div className="">
        {topLevel.map((comment) => (
            <div key={comment._id} className="border-b border-b-gray-200 p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-600">
                  {comment.userId?.name || "User"}
                </div>
                <button
                  className="text-sm text-blue-500"
                  onClick={() => {
                    setCollapsedComments(prev => ({
                      ...prev,
                      [comment._id]: !prev[comment._id]
                    }));
                  }}
                >
                  {collapsedComments[comment._id] ? "Expand" : "Collapse"}
                </button>
              </div>

              <p className="mb-2">{comment.text}</p>

              {!collapsedComments[comment._id] && (
                <div className="ml-1 pl-4 space-y-2">
                  {replies
                    .filter(
                      (r) =>
                        r.parentId &&
                        r.parentId.toString() === comment._id
                    )
                    .map((reply) => (
                      <div key={reply._id} className="bg-white border-l border-gray-200 p-2">
                        <div className="text-sm text-gray-600">
                          {reply.userId?.name || "User"}
                        </div>
                        <p>{reply.text}</p>
                      </div>
                    ))}

                  {/* Reply Box */}
                  {user && (
                    <div className="mt-2">
                      <ReplyBox onReply={(text) => handleReply(comment._id, text)} />
                    </div>
                  )}
                </div>
              )}
            </div>
        ))}
      </div>
    </div>
  );
};

const ReplyBox = ({ onReply }) => {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-4 mt-2">
      <input
        className="flex-1 border-b border-gray-200 duration-150 px-2 py-1 focus:outline-0 focus:border-b-gray-800"
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
import React, { useState } from "react";

// CommentsModal komponenti
const CommentsModal = ({ isOpen, onClose, existingComments, addComment }) => {
  const [newComment, setNewComment] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-3">Comments</h3>

        {/* Existing Comments */}
        <div className="mb-3 overflow-y-auto max-h-40 border p-2 rounded">
          {existingComments.length > 0 ? (
            existingComments.map((comment, index) => (
              <div key={index} className="mb-2 border-b pb-1">
                <p className="text-gray-800 text-sm">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>

        {/* New Comment Input */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border rounded p-2 mb-3 text-sm"
          placeholder="Add your comment..."
          rows="3"
        ></textarea>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              if (newComment) addComment(newComment);
              setNewComment("");
            }}
            className="bg-blue-500 text-white text-sm px-4 py-1 rounded"
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 text-sm px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;

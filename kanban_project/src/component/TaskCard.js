import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Card.css";

const TaskModal = ({
  isOpen,
  onRequestClose,
  onSave,
  initialTitle,
  initialDescription,
  initialComments,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setTitle(initialTitle || "");
    setDescription(initialDescription || "");
    setComments(initialComments || []);
  }, [initialTitle, initialDescription, initialComments]);

  const handleSave = () => {
    onSave(title, description, comments);
    onRequestClose();
  };

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ height: "fit-content" }}
    >
      <h2>{initialTitle ? "Edit Task" : "Create Task"}</h2>
      <div className="card-content">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="comment-card">
        <h3>Comments</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={addComment}>Add Comment</button>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default TaskModal;

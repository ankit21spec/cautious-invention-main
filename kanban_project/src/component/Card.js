import React, { useState } from "react";
import { useDrag } from "react-dnd";
import "../styles/Card.css";
import TaskModal from "./TaskCard";

const Card = ({ task, index, moveCard, updateTask }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSave = (title, description, comments) => {
    updateTask(task.id, title, description, comments);
    closeModal();
  };

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div onClick={openModal}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
      </div>
      <TaskModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        onSave={handleSave}
        initialTitle={task.title}
        initialDescription={task.description}
        initialComments={task.comments}
      />
    </div>
  );
};

export default Card;

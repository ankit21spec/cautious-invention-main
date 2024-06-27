import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import "./List.css";
import TaskModal from "./TaskCard";

const List = ({ list, addTask, moveCard, updateTask }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setError("");
  };

  const handleAddTask = (title, description) => {
    if (title.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      status: list.title,
      comments: [],
    };
    addTask(list.id, newTask);
    closeModal();
  };

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => {
      moveCard(item.id, list.id, list.title);
    },
  });

  return (
    <div ref={drop} className="list">
      <h3>{list.title}</h3>
      <div className="cards">
        {list.tasks.map((task, index) => (
          <Card
            key={task.id}
            task={task}
            index={index}
            moveCard={moveCard}
            updateTask={updateTask}
          />
        ))}
      </div>
      {list.title === "To Do" && (
        <>
          <button onClick={openModal}>Create Task</button>
          <TaskModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            onSave={handleAddTask}
          />
          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default List;

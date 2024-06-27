// Board.js
import React, { useState } from "react";
import List from "./List";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Board.css";

const Board = () => {
  const [lists, setLists] = useState([
    { id: 1, title: "To Do", tasks: [] },
    { id: 2, title: "In Progress", tasks: [] },
    { id: 3, title: "Done", tasks: [] },
  ]);

  const addTask = (listId, task) => {
    const newLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, tasks: [...list.tasks, task] };
      }
      return list;
    });
    setLists(newLists);
  };

  const moveCard = (taskId, targetListId, targetListTitle) => {
    let sourceListId;
    let taskToMove;
    const newLists = lists.map((list) => {
      const taskIndex = list.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        sourceListId = list.id;
        [taskToMove] = list.tasks.splice(taskIndex, 1);
      }
      return list;
    });

    if (sourceListId !== targetListId && taskToMove) {
      const targetList = newLists.find((list) => list.id === targetListId);
      taskToMove.status = targetListTitle;
      targetList.tasks.push(taskToMove);
    }

    setLists(newLists);
  };

  const updateTask = (taskId, newTitle, newDescription) => {
    const newLists = lists.map((list) => {
      const tasks = list.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTitle, description: newDescription };
        }
        return task;
      });
      return { ...list, tasks };
    });
    setLists(newLists);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            addTask={addTask}
            moveCard={moveCard}
            updateTask={updateTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;

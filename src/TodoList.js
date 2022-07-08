import React from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useGlobalContext } from "./context";

const TodoList = () => {
  const { todoList, removeTask, editTask } = useGlobalContext();
  return (
    <section className="task-container">
      <div className="tasks">
        {/* Single Task  */}
        {todoList.map((todos) => {
          const { id, todoTitle } = todos;
          return (
            <div key={id} className="single-task">
              <h5>
                <i className="fas fa-check-circle"></i>
                {todoTitle}
              </h5>
              <div className="task-links">
                {/* Edit */}
                <button
                  type="submit"
                  className="edit-btn"
                  onClick={() => editTask(id)}
                >
                  <FaPencilAlt />
                </button>
                {/* Delete  */}
                <button
                  type="submit"
                  className="delete-btn"
                  onClick={() => removeTask(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TodoList;

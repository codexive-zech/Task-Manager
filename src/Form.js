import React from "react";
import TodoList from "./TodoList";
import { useGlobalContext } from "./context";
import Alert from "./Alert";

const Form = () => {
  const { todoValue, setTodoValue, handleTaskSubmit, alert, isEditing } =
    useGlobalContext();
  return (
    <div>
      <form className="form task-form" onSubmit={handleTaskSubmit}>
        <h4>Task Manger</h4>
        <div className="form-control">
          <input
            value={todoValue}
            className="form-input task-input"
            placeholder="e.g. wash dishes"
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button className="btn submit-btn" type="button">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
        {alert.show && <Alert {...alert} />}
        {/* <small className="alert alert-success">something went wrong</small> */}
      </form>
      <TodoList />
    </div>
  );
};

export default Form;

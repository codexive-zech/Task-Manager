import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const getLocalStorageGroceryList = () => {
  const todoList = localStorage.getItem("todoList");
  if (todoList) {
    return JSON.parse(todoList);
  } else {
    return [];
  }
};
const AppProvider = ({ children }) => {
  const [todoValue, setTodoValue] = useState("");
  const [todoList, setTodoList] = useState(getLocalStorageGroceryList());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", classType: "" });

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!todoValue) {
      showAlert(true, "Please Enter a Task", "danger");
    } else if (todoValue && isEditing) {
      showAlert(true, "Task Updated Successfully", "success");
      const newTaskEdit = todoList.map((todo) => {
        if (todo.id === editID) {
          return { ...todoList, todoTitle: todoValue };
        }
        return todo;
      });
      setTodoList(newTaskEdit);
      setEditID(null);
      setIsEditing(false);
      setTodoValue("");
    } else {
      const createdTask = {
        id: new Date().getTime().toString(),
        todoTitle: todoValue,
      };
      setTodoList([...todoList, createdTask]);
      setTodoValue("");
      showAlert(true, "Task Added Successfully", "success");
    }
  };

  const showAlert = (show = false, msg = "", classType = "") => {
    setAlert({ show, msg, classType });
  };

  const removeTask = (id) => {
    const newRemovedTask = todoList.filter((todos) => todos.id !== id);
    setTodoList(newRemovedTask);
    showAlert(true, "Task Removed", "danger");
  };

  const editTask = (id) => {
    const newEditTask = todoList.find((todo) => todo.id === id);
    setEditID(id);
    setIsEditing(true);
    setTodoValue(newEditTask.todoTitle);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <AppContext.Provider
      value={{
        todoValue,
        todoList,
        isEditing,
        editID,
        alert,
        setTodoValue,
        handleTaskSubmit,
        showAlert,
        removeTask,
        editTask,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };

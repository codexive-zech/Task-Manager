import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

const Alert = ({ msg, classType }) => {
  const { todoList, showAlert } = useGlobalContext();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      return showAlert();
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [todoList]);
  return (
    <div>
      <small className={`alert alert-${classType}`}>{msg}</small>
    </div>
  );
};

export default Alert;
